"use server";

import { POST as transferPostHandler } from "@/app/api/plaid/create-transfer/route";
import { POST as transferCreateHandler } from "@/app/api/plaid/initiate-transfer/route";
import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import AuthorizeTransferCreateRequest from "@/interfaces/requests/AuthorizeTransferCreateRequest";
import CreateAndStoreAccessTokenRequest from "@/interfaces/requests/CreateAndStoreAccessTokenRequest";
import InitiateTransferRequest from "@/interfaces/requests/InitiateTransferRequest";
import GetAccessTokenResponse from "@/interfaces/responses/GetAccessTokenResponse";
import { getAccountId } from "@/lib/accounts";
import { billowGet, billowPost } from "@/utils/axiosHelper";
import { BillowRequest } from "@/utils/billowHelper";
import { MONGO_ROUTE_URL } from "@/utils/constants/databaseConstants";
import { PLAID_EXCHANGE_URL } from "@/utils/constants/plaidConstants";
import { handleError } from "@/utils/errorHelper";
import { baseUrl } from "@/utils/globalHelper";
import { AxiosError } from "axios";
import { TransferAuthorizationDecision, TransferCreateResponse } from "plaid";

export const createAccessToken = async (
  userId: string,
  accountId: string,
  publicToken: string,
  mask: string
): Promise<BillowResponse<string>> => {
  const response = await billowPost<CreateAndStoreAccessTokenRequest, string>(
    `${baseUrl}/${PLAID_EXCHANGE_URL}`,
    {
      userId,
      publicToken,
      accountId,
      accountMask: mask
    }
  );

  return {
    data: response.data,
    message: "Access token created!",
    isSuccess: true
  };
};

export const getAccessToken = async (
  userId: string
): Promise<BillowResponse<string>> => {
  try {
    const response = await billowGet<GetAccessTokenResponse>(
      `${baseUrl}/${MONGO_ROUTE_URL}?accessTokenByUserId=${userId}`
    );
    // const response = await billowGet<GetAccessTokenResponse>(
    //   `${baseUrl}/${MONGO_ROUTE_URL}?userId=${userId}`
    // );

    const { accessToken } = response.data;
    console.log("this is the access token", accessToken);
    return {
      data: accessToken,
      message: accessToken
        ? "Access token retrieved!"
        : "User does not have access token.",
      isSuccess: true
    };
  } catch (error) {
    handleError(error);

    return {
      data: "",
      message: `Oops: ${error}!`,
      isSuccess: false
    };
  }
};

export const beginFundsTransfer = async (
  legalName: string,
  userId: string,
  amount: string
): Promise<BillowSimpleResponse> => {
  const accessToken = (await getAccessToken(userId)).data;
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
      message: "Transfer initiated successfully",
      isSuccess: true
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message,
      isSuccess: false
    };
  }
};

// Calls transfer/authorization/create
// https://plaid.com/docs/transfer/creating-transfers/#authorizing-a-transfer
const createTransferAuthorization = async (
  legalName: string,
  userId: string,
  amount: string,
  accessToken: string,
  accountId: string
): Promise<BillowResponse<string>> => {
  const request = BillowRequest<AuthorizeTransferCreateRequest>(
    `${baseUrl}/api/plaid/create-transfer`,
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
  const data = await response.json();
  const { decision, id: authorizationId } = data.authorization;
  if (decision === TransferAuthorizationDecision.Declined)
    throw new Error("Authorization was declined!");

  // if (decision !== TransferAuthorizationDecision.UserActionRequired)
  //   throw new Error(
  //     `Your financial institution says that further action is required. Please use the old payment system and report this to your utility company.`
  //   );

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
// https://plaid.com/docs/transfer/creating-transfers/#initiating-a-transfer
const initiateTransfer = async (
  authorizationId: string,
  accessToken: string,
  accountId: string,
  amount: string
): Promise<BillowResponse<TransferCreateResponse | null>> => {
  const request = BillowRequest<InitiateTransferRequest>(
    `${baseUrl}/api/plaid/initiate-transfer`,
    "POST",
    {
      authorizationId,
      accessToken,
      accountId,
      amount
    }
  );

  const response = await transferCreateHandler(request);
  const data = await response.json();

  return {
    data,
    message: "Transfer initiated successfully",
    isSuccess: true
  };
};
