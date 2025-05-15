import {
  BillowResponse,
  BillowSimpleResponse
} from "@/interfaces/BillowResponse";
import { getAccessToken } from "@/lib/accessTokens";
import { getAccountId } from "@/lib/accounts";

export async function GET(request: Request) {
  const { userId } = await request.json(); // TODO: Get actual user ID from auth

  const accessToken = getAccessToken(userId);

  if (!accessToken) {
    const result: BillowSimpleResponse = {
      message: "No access token found for user",
      isSuccess: false
    };
    return Response.json(result);
  }

  const accountId = getAccountId(userId);

  if (!accountId) {
    const result: BillowSimpleResponse = {
      message: "No account ID found for user",
      isSuccess: false
    };
    return Response.json(result);
  }

  const result: BillowResponse<{ accessToken: string; accountId: string }> = {
    message: "Access token and account ID retrieved successfully",
    isSuccess: true,
    data: { accessToken, accountId }
  };

  return Response.json(result);
}
