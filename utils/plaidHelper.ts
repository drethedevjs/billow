import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import { storeAccountInformation } from "@/services/accountService";
import { storeAccessToken } from "@/services/databaseService";
import { createAccessToken } from "@/services/plaidService";
import axios from "axios";
import { PlaidLinkError, PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import { baseUrl } from "./globalHelper";

const plaidHelper = {
  getLinkToken: async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/plaid`);

      const linkToken = response.data;

      return linkToken;
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  createAccessToken: async (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata,
    userId: string
  ): Promise<BillowResponse<string>> => {
    // Should always be the first account because transfers only
    // support one account at a time.
    const { id: accountId, mask } = metadata.accounts[0];

    const response = await createAccessToken(
      userId,
      accountId,
      publicToken,
      mask
    );

    return response;
  },
  storeAccessToken: async (
    accessToken: string,
    userId: string
  ): Promise<BillowSimpleResponse> => {
    const response = await storeAccessToken(accessToken, userId);
    return response;
  },
  storeAccountInformation: async (
    accountId: string,
    mask: string,
    userId: string
  ): Promise<BillowSimpleResponse> => {
    const response = await storeAccountInformation(accountId, mask, userId);
    return response;
  },
  logErrorsToConsole: (err: PlaidLinkError | null) => {
    if (err) console.error(err);
  },
  getAccessToken: async () => {}
};

export default plaidHelper;
