import CreateAndStoreAccessTokenRequest from "@/interfaces/requests/CreateAndStoreAccessTokenRequest";
import { getAccount } from "@/services/accountService";
import { getAccessToken } from "@/services/plaidService";
import plaidClient from "@/utils/plaidClient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({
      message: "User ID is required",
      isSuccess: false
    });
  }

  const response = await getAccessToken(userId);
  const hasAccessToken = Boolean(response.data);
  const accountInformation = await getAccount(userId);

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
}
