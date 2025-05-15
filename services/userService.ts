"use server";
import VerifyAccessTokenAndAccountInformation from "@/interfaces/account/VerifyAccessTokenAndAccountInformation";
import { BillowResponse } from "@/interfaces/BillowResponse";
import { billowGet } from "@/utils/axiosHelper";
import { handleError } from "@/utils/errorHelper";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const verifyAccessTokenAndGetAccountInformation = async (
  userId: string
): Promise<BillowResponse<VerifyAccessTokenAndAccountInformation | null>> => {
  try {
    const response = await billowGet<VerifyAccessTokenAndAccountInformation>(
      `${baseUrl}/api/plaid/exchange?userId=${userId}`
    );

    const { hasAccessToken, accountInformation } = response.data;
    if (hasAccessToken) {
      return {
        data: { hasAccessToken, accountInformation },
        message:
          "Has access token and the account ID was retrieved successfully",
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
  accessToken: string,
  accountId: string
) => {
  try {
    await axios.post(`${baseUrl}/api/plaid/exchange`, {
      userId,
      accessToken,
      accountId
    });
    return true;
  } catch (error: unknown) {
    handleError(error);
    throw new Error("Failed to store access token and account ID");
  }
};
