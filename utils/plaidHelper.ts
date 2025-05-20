import { storeAccessTokenAndAccountId } from "@/services/userService";
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
  createAndStoreAccessToken: async (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata
  ) => {
    // Should always be the first account because transfers only
    // support one account at a time.
    const { id: accountId, mask } = metadata.accounts[0];

    await storeAccessTokenAndAccountId("1234", accountId, publicToken, mask);
  },
  logErrorsToConsole: (err: PlaidLinkError | null) => {
    if (err) console.error(err);
  },
  getAccessToken: async () => {}
};

export default plaidHelper;
