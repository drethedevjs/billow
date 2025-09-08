import CreateAndStoreAccessTokenRequest from "@/interfaces/requests/CreateAndStoreAccessTokenRequest";
import { getAccountInformation } from "@/lib/accounts";
import { getAccessToken } from "@/services/plaidService";
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

  const response = await getAccessToken(userId);
  const hasAccessToken = Boolean(response.data);
  const accountInformation = getAccountInformation(userId);

  return Response.json({ hasAccessToken, accountInformation });
}

export async function POST(request: Request) {
  const { publicToken }: CreateAndStoreAccessTokenRequest =
    await request.json();

  // calling /item/public_token/exchange endpoint
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken
  });

  const accessToken = response.data.access_token;
  return Response.json(accessToken);

  // storeAccessToken(accessToken, userId);
  // storeAccountInformation({ userId, accountId, accountMask });

  // return Response.json({ success: true });
}
