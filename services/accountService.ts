import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import { billowGet, billowPost } from "@/utils/axiosHelper";
import { MONGO_ROUTE_URL } from "@/utils/constants/databaseConstants";
import { handleError } from "@/utils/errorHelper";
import { PlaidAccount } from "react-plaid-link";

export const storeAccountInformation = async (
  accountId: string,
  mask: string,
  userId: string
): Promise<BillowSimpleResponse> => {
  try {
    await billowPost<StoreAccountInformationRequest, BillowSimpleResponse>(
      MONGO_ROUTE_URL,
      {
        userId,
        accountId,
        accountMask: mask
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
      `${MONGO_ROUTE_URL}/accounts?accountByUserId=${userId}`
    );

    return {
      data: response.data?.id,
      message: "Account information retrieved!",
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
