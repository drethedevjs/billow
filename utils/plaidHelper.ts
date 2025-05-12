import axios from "axios";

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
  getAndStoreAccessToken: async (publicToken: string) => {
    const response = await axios.post(`${baseUrl}/api/plaid`, publicToken);

    return response;
  }
};

export default plaidHelper;
