"use server";

import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import AuthorizeTransferCreateRequest from "@/interfaces/requests/AuthorizeTransferCreateRequest";
import CreateAndStoreAccessTokenRequest from "@/interfaces/requests/CreateAndStoreAccessTokenRequest";
import InitiateTransferRequest from "@/interfaces/requests/InitiateTransferRequest";
import AuthorizeTransferCreateResponse from "@/interfaces/responses/AuthorizeTransferCreateResponse";
import GetAccessTokenResponse from "@/interfaces/responses/GetAccessTokenResponse";
import { getAccountId } from "@/services/accountService";
import { billowGet, billowPost } from "@/utils/axiosHelper";
import {
  PLAID_BASE_URL,
  USERS_ROUTE_URL
} from "@/utils/constants/billowConstants";
import { handleError } from "@/utils/errorHelper";
import { baseUrl } from "@/utils/globalHelper";
import { AxiosError } from "axios";
import chalk from "chalk";
import { TransferAuthorizationDecision, TransferCreateResponse } from "plaid";

export const createAccessToken = async (
  userId: string,
  accountId: string,
  publicToken: string,
  mask: string
): Promise<BillowResponse<string>> => {
  const response = await billowPost<CreateAndStoreAccessTokenRequest, string>(
    `${PLAID_BASE_URL}/exchange`,
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
      `${USERS_ROUTE_URL}?accessTokenByUserId=${userId}`
    );

    const { accessToken } = response.data;

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
  try {
    const tokenResponse = await getAccessToken(userId);

    if (!tokenResponse.data) throw new Error("User doesn't have access token.");

    const accountResponse = await getAccountId(userId);

    if (!accountResponse.isSuccess) throw new Error(accountResponse.message);

    if (!accountResponse.data) {
      console.error(accountResponse.message);
      throw new Error("User doesn't have an account linked.");
    }

    const accessToken = tokenResponse.data;
    const accountId = accountResponse.data;

    console.info(chalk.blueBright("creating transfer authorization"));
    const authorizationResponse = await createTransferAuthorization(
      legalName,
      userId,
      amount,
      accessToken,
      accountId
    );

    const authorizationId = authorizationResponse.data;

    console.info(
      chalk.blueBright("transfer authorization created successfully")
    );
    console.info(chalk.blueBright("initiating transfer"));

    const initiateTransResponse = await initiateTransfer(
      authorizationId,
      accessToken,
      accountId,
      amount
    );

    console.info(chalk.blueBright(initiateTransResponse.message));

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
  const response = await billowPost<
    AuthorizeTransferCreateRequest,
    AuthorizeTransferCreateResponse
  >(`${baseUrl}/api/plaid/create-transfer`, {
    legalName,
    userId,
    amount,
    accessToken,
    accountId
  });

  console.log("back from createAuthTransfer", response.data);

  const { decision, id: authorizationId } = response.data;

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
  const response = await billowPost<
    InitiateTransferRequest,
    TransferCreateResponse
  >(`${baseUrl}/api/plaid/initiate-transfer`, {
    authorizationId,
    accessToken,
    accountId,
    amount
  });

  return {
    data: response.data,
    message: "Transfer initiated successfully",
    isSuccess: true
  };
};
