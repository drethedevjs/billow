import { BillowSimpleResponse } from "@/interfaces/BillowResponse";
import GetAndStoreAccessTokenRequest from "@/interfaces/requests/GetAndStoreAccessTokenRequest";
import { getAccessToken, storeAccessToken } from "@/lib/accessTokens";
import { getAccountInformation, storeAccountInformation } from "@/lib/accounts";
import plaidClient from "@/utils/plaidClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({
      message: "User ID is required",
      isSuccess: false
    });
  }

  const hasAccessToken = Boolean(getAccessToken(userId));
  const accountInformation = getAccountInformation(userId);

  return Response.json({ hasAccessToken, accountInformation });
}

export async function POST(request: Request) {
  const { publicToken, accountId, accountMask }: GetAndStoreAccessTokenRequest =
    await request.json();

  // calling /item/public_token/exchange endpoint
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken
  });

  const accessToken = response.data.access_token;
  const userId = "1234";

  storeAccessToken(accessToken, userId);
  storeAccountInformation({ userId, accountId, accountMask });

  const result: BillowSimpleResponse = {
    message: "Access token and account information stored!",
    isSuccess: true
  };

  return Response.json(result);
}
