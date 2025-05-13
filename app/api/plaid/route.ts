import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import GetAndStoreAccessTokenRequest from "@/interfaces/requests/GetAndStoreAccessTokenRequest";
import { storeAccessToken } from "@/lib/accessTokens";
import { storeAccountInformation } from "@/lib/accounts";
import plaidClient from "@/utils/plaidClient";
import {
  CountryCode,
  CreditAccountSubtype,
  DepositoryAccountSubtype,
  LinkTokenCreateRequest,
  Products
} from "plaid";

// export async function GET() {
//   return Response.json({ message: "You hit me." });
// }

export async function GET() {
  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: "user-id",
      phone_number: "+1 415 5550123"
    },
    client_name: "Billow",
    products: [Products.Transfer, Products.Auth],
    required_if_supported_products: [Products.Identity],
    transactions: {
      days_requested: 730
    },
    country_codes: [CountryCode.Us],
    language: "en",
    webhook: "https://sample-web-hook.com",
    // redirect_uri: "https://domainname.com/oauth-page.html",
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

    const response = await plaidClient.linkTokenCreate(request);
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

export async function POST(request: Request) {
  const { publicToken, accountId }: GetAndStoreAccessTokenRequest =
    await request.json();

  // calling /item/public_token/exchange endpoint
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken
  });

  const accessToken = response.data.access_token;
  const userId = "1234";

  storeAccessToken(accessToken, userId);
  storeAccountInformation({ userId, accountId });

  const result: BillowSimpleResponse = {
    message: "Access token and account information stored!",
    isSuccess: true
  };

  return Response.json(result);
}
