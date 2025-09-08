import { BillowSimpleResponse } from "@/interfaces/BillowResponse";
import { StoreAccessTokenRequest } from "@/interfaces/requests/StoreAccessTokenRequest";
import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import { billowPost } from "@/utils/axiosHelper";
import { MONGO_ROUTE_URL } from "@/utils/constants/databaseConstants";

export const storeAccessToken = async (
  accessToken: string,
  userId: string
): Promise<BillowSimpleResponse> => {
  await billowPost<StoreAccessTokenRequest, void>(MONGO_ROUTE_URL, {
    accessToken,
    userId
  });

  return {
    message: "Access token saved to database!",
    isSuccess: true
  };
};

export const storeAccountInformation = async (
  accountId: string,
  mask: string,
  userId: string
): Promise<BillowSimpleResponse> => {
  await billowPost<StoreAccountInformationRequest, void>(MONGO_ROUTE_URL, {
    accountId,
    mask,
    userId
  });

  return {
    message: "Access token saved to database!",
    isSuccess: true
  };
};
