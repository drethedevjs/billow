"use server";

import { POST as transferPostHandler } from "@/app/api/plaid/existing-account/route";
import { POST as transferCreateHandler } from "@/app/api/plaid/transfers/route";
import { BillowResponse } from "@/interfaces/BillowResponse";
import AuthorizeTransferCreateRequest from "@/interfaces/requests/AuthorizeTransferCreateRequest";
import InitiateTransferRequest from "@/interfaces/requests/InitiateTransferRequest";
import { getAccessToken } from "@/lib/accessTokens";
import { getAccountId } from "@/lib/accounts";
import { BillowRequest } from "@/utils/billowHelper";
import { AxiosError } from "axios";
import { TransferAuthorizationDecision, TransferCreateResponse } from "plaid";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const beginFundsTransfer = async (
  legalName: string,
  userId: string,
  amount: string
): Promise<BillowResponse<null>> => {
  const accessToken = getAccessToken(userId);
  const accountId = getAccountId(userId);

  if (!accessToken) throw new Error("User doesn't have access token.");
  if (!accountId) throw new Error("User doesn't have an account linked.");

  try {
    console.log("creating transfer authorization");
    const authorizationResponse = await createTransferAuthorization(
      legalName,
      userId,
      amount,
      accessToken,
      accountId
    );

    const authorizationId = authorizationResponse.data;

    console.log("transfer authorization created successfully");
    console.log("initiating transfer");

    await initiateTransfer(authorizationId, accessToken, accountId, amount);

    console.log("transfer initiated successfully");

    return {
      data: null,
      message: "Transfer initiated successfully",
      isSuccess: true
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      data: null,
      message: axiosError.message,
      isSuccess: false
    };
  }
};

const createTransferAuthorization = async (
  legalName: string,
  userId: string,
  amount: string,
  accessToken: string,
  accountId: string
): Promise<BillowResponse<string>> => {
  const request = BillowRequest<AuthorizeTransferCreateRequest>(
    `${baseUrl}/api/plaid/existing-account`,
    "POST",
    {
      legalName,
      userId,
      amount,
      accessToken,
      accountId
    }
  );
  const response = await transferPostHandler(request);

  const { decision, id: authorizationId } = response.data.authorization;
  if (decision === TransferAuthorizationDecision.Declined)
    throw new Error("Authorization was declined!");

  if (decision !== TransferAuthorizationDecision.UserActionRequired)
    throw new Error(
      `Your financial institution says that further action is required. Please use the old payment system and report this to your utility company.`
    );

  // TODO: Need a workflow for decision being approved but for the decision_rationale to not be null.
  // The video in the Plaid docs said to handle on a case by case basis.
  // see: https://plaid.com/docs/transfer/creating-transfers/#authorizing-a-transfer

  return {
    data: authorizationId,
    message: "Transfer authorization created successfully",
    isSuccess: true
  };
};

// Calls transfer/create
const initiateTransfer = async (
  authorizationId: string,
  accessToken: string,
  accountId: string,
  amount: string
): Promise<BillowResponse<TransferCreateResponse | null>> => {
  const request = BillowRequest<InitiateTransferRequest>(
    `${baseUrl}/api/plaid/transfers`,
    "POST",
    {
      authorizationId,
      accessToken,
      accountId,
      amount
    }
  );

  const response = await transferCreateHandler(request);

  console.log("Transfer response", response);
  return {
    data: response.data,
    message: "Transfer initiated successfully",
    isSuccess: true
  };
};
