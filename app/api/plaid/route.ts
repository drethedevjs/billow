import { BillowResponse } from "@/interfaces/BillowResponse";
import plaidClient from "@/utils/plaidClient";
import {
  CountryCode,
  CreditAccountSubtype,
  DepositoryAccountSubtype,
  LinkTokenCreateRequest,
  Products
} from "plaid";

// getLinkToken - Gets link token for new account connection.
export async function GET() {
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
          DepositoryAccountSubtype.Savings
        ]
      },
      credit: {
        account_subtypes: [CreditAccountSubtype.CreditCard]
      }
    }
  };

  try {
    console.log("Getting link token...");

    const response = await plaidClient.linkTokenCreate(linkTokenRequest);
    const linkToken = response.data.link_token;
    console.log("Retrieved link token...");

    const result: BillowResponse<string> = {
      data: linkToken,
      message: "",
      isSuccess: true
    };

    return Response.json(result);
  } catch (error) {
    // handle error
    console.error("Server error: ", error);
    return {
      data: "",
      message: await Response.error().text(),
      isSuccess: false
    };
  }
}
