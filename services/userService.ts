"use server";
import VerifyAccessTokenAndAccountInformation from "@/interfaces/account/VerifyAccessTokenAndAccountInformation";
import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import CreateAndStoreAccessTokenRequest from "@/interfaces/requests/CreateAndStoreAccessTokenRequest";
import { StoreAccessTokenRequest } from "@/interfaces/requests/StoreAccessTokenRequest";
import { billowGet, billowPost } from "@/utils/axiosHelper";
import {
  PLAID_BASE_URL,
  USERS_ROUTE_URL
} from "@/utils/constants/billowConstants";
import { handleError } from "@/utils/errorHelper";

export const verifyAccessTokenAndGetAccountInformation = async (
  userId: string
): Promise<BillowResponse<VerifyAccessTokenAndAccountInformation | null>> => {
  try {
    const response = await billowGet<VerifyAccessTokenAndAccountInformation>(
      `${PLAID_BASE_URL}/exchange?userId=${userId}`
    );

    const { hasAccessToken, accountInformation } = response.data;
    if (hasAccessToken) {
      return {
        data: { hasAccessToken, accountInformation },
        message: "Access token and the account ID was retrieved successfully",
        isSuccess: true
      };
    } else {
      return {
        data: null,
        message: "No access token was found",
        isSuccess: true
      };
    }
  } catch (error: unknown) {
    handleError(error);
    return {
      data: null,
      message: "Failed to verify access token and to retrieve the account ID",
      isSuccess: false
    };
  }
};

export const storeAccessTokenAndAccountId = async (
  userId: string,
  accountId: string,
  publicToken: string,
  mask: string
): Promise<BillowSimpleResponse> => {
  try {
    await billowPost<CreateAndStoreAccessTokenRequest, BillowSimpleResponse>(
      `${PLAID_BASE_URL}/exchange`,
      {
        userId,
        publicToken,
        accountId,
        accountMask: mask
      }
    );

    return {
      message: "Access token and account information stored!",
      isSuccess: true
    };
  } catch (error: unknown) {
    handleError(error);
    return {
      message: "Failed to store access token and account ID",
      isSuccess: false
    };
  }
};

export const storeAccessToken = async (
  accessToken: string,
  userId: string
): Promise<BillowSimpleResponse> => {
  await billowPost<StoreAccessTokenRequest, void>(USERS_ROUTE_URL, {
    accessToken,
    userId
  });

  return {
    message: "Access token saved to database!",
    isSuccess: true
  };
};
