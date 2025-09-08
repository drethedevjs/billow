import { BillowSimpleResponse } from "@/interfaces/BillowResponse";
import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import { billowPost } from "@/utils/axiosHelper";
import { handleError } from "@/utils/errorHelper";
import { baseUrl } from "@/utils/globalHelper";

export const storeAccountInformation = async (
  accountId: string,
  mask: string,
  userId: string
): Promise<BillowSimpleResponse> => {
  try {
    await billowPost<StoreAccountInformationRequest, BillowSimpleResponse>(
      `${baseUrl}/api/database/sqlite`,
      {
        userId,
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
