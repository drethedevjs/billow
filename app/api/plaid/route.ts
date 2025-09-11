import plaidClient from "@/utils/plaidClient";
import chalk from "chalk";
import {
  CountryCode,
  CreditAccountSubtype,
  DepositoryAccountSubtype,
  LinkTokenCreateRequest,
  Products
} from "plaid";

const linkTokenRequest: LinkTokenCreateRequest = {
  user: {
    client_user_id: "user-id",
    phone_number: "+1 415 5550123"
  },
  client_name: "Billow",
  products: [Products.Transfer],
  // required_if_supported_products: [Products.Identity],
  transactions: {
    days_requested: 730
  },
  country_codes: [CountryCode.Us],
  language: "en",
  account_filters: {
    depository: {
      account_subtypes: [
        DepositoryAccountSubtype.Checking,
        DepositoryAccountSubtype.Savings,
        DepositoryAccountSubtype.MoneyMarket
      ]
    },
    credit: {
      account_subtypes: [CreditAccountSubtype.CreditCard]
    }
  }
};

// getLinkToken - Gets link token for new account connection.
export async function GET() {
  try {
    console.info(chalk.blueBright("Getting link token..."));

    const response = await plaidClient.linkTokenCreate(linkTokenRequest);
    const { link_token: linkToken } = response.data;
    console.info(chalk.blueBright("Retrieved link token!"));

    return Response.json({ linkToken });
  } catch (error) {
    // handle error
    console.error("Server error: ", error);
    return Response.json({
      message: await Response.error().text(),
      isSuccess: false
    });
  }
}
