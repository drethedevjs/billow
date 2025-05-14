import { BillowSimpleResponse } from "@/interfaces/BillowResponse";
import GetAndStoreAccessTokenRequest from "@/interfaces/requests/GetAndStoreAccessTokenRequest";
import { storeAccessToken } from "@/lib/accessTokens";
import { storeAccountInformation } from "@/lib/accounts";
import plaidClient from "@/utils/plaidClient";

// item/public_token/exchange - Gets an access token
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
