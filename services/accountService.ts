import BillowPlaidAccount from "@/interfaces/BillowPlaidAccount";
import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import { billowGet, billowPost } from "@/utils/axiosHelper";
import { ACCOUNT_ROUTE_URL } from "@/utils/constants/billowConstants";
import { handleError } from "@/utils/errorHelper";
import { PlaidAccount } from "react-plaid-link";

export const storeAccountInformation = async (
  account: PlaidAccount,
  userId: string
): Promise<BillowSimpleResponse> => {
  try {
    await billowPost<StoreAccountInformationRequest, BillowSimpleResponse>(
      ACCOUNT_ROUTE_URL,
      {
        userId,
        account
      }
    );

    return {
      message: "Account information stored!",
      isSuccess: true
    };
  } catch (error: unknown) {
    handleError(error);
    return {
      message: "Failed to store account Id",
      isSuccess: false
    };
  }
};

export const getAccountId = async (
  userId: string
): Promise<BillowResponse<string>> => {
  try {
    const response = await billowGet<PlaidAccount>(
      `${ACCOUNT_ROUTE_URL}?accountByUserId=${userId}`
    );

    return {
      data: response.data?.id,
      message: "Account Id retrieved!",
      isSuccess: true
    };
  } catch (error: unknown) {
    handleError(error);
    return {
      data: "",
      message: "Failed to retrieve account Id",
      isSuccess: false
    };
  }
};

export const getAccount = async (
  userId: string
): Promise<BillowResponse<BillowPlaidAccount | null>> => {
  try {
    const response = await billowGet<BillowPlaidAccount>(
      `${ACCOUNT_ROUTE_URL}?accountByUserId=${userId}`
    );

    return {
      data: response.data,
      message: "Account information retrieved!",
      isSuccess: true
    };
  } catch (error: unknown) {
    handleError(error);
    return {
      data: null,
      message: "Failed to retrieve account Id",
      isSuccess: false
    };
  }
};
