import axios from "axios";
import { PlaidLinkError, PlaidLinkOnSuccessMetadata } from "react-plaid-link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
  getAndStoreAccessToken: async (
    publicToken: string,
    metadata: PlaidLinkOnSuccessMetadata
  ) => {
    const accountId = metadata.accounts[0].id;
    const response = await axios.post(`${baseUrl}/api/plaid`, {
      publicToken,
      accountId
    });

    return response;
  },
  logErrorsToConsole: (err: PlaidLinkError | null) => {
    if (err) console.error(err);
  }
};

export default plaidHelper;
