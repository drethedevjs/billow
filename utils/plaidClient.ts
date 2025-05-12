import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// 1. Build a Configuration object
const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET
    }
  }
});

// 2. Instantiate the API client
const plaidClient = new PlaidApi(config);

export default plaidClient;
