import InitiateTransferRequest from "@/interfaces/requests/InitiateTransferRequest";
import { sleep } from "@/utils/billowHelper";
import plaidClient from "@/utils/plaidClient";
import { PlaidError, TransferCreateRequest } from "plaid";

export async function POST(request: Request) {
  const {
    authorizationId,
    accessToken,
    accountId,
    amount
  }: InitiateTransferRequest = await request.json();

  const response = await initiateTransfer(
    authorizationId,
    accessToken,
    accountId,
    amount
  );

  return Response.json(response.data);
}

const initiateTransfer = async (
  authorizationId: string,
  accessToken: string,
  accountId: string,
  amount: string,
  remainingTries = 5
) => {
  const transferCreateReq: TransferCreateRequest = {
    authorization_id: authorizationId,
    access_token: accessToken,
    account_id: accountId,
    amount: amount,
    description: "Water Bill"
  };

  try {
    const response = await plaidClient.transferCreate(transferCreateReq);

    return response;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plaidError = (error as any).response?.data as PlaidError;

    if (
      remainingTries > 0 &&
      (plaidError.error_code === "RATE_LIMIT_EXCEEDED" ||
        plaidError.error_code === "INTERNAL_SERVER_ERROR")
    ) {
      sleep(3);
      // Retry on rate limits or internal server errors
      return await initiateTransfer(
        authorizationId,
        accessToken,
        accountId,
        amount,
        remainingTries - 1
      );
    } else {
      throw new Error(
        `Transfer failed: METHOD: initiateTransfer() - ${plaidError.error_code} - ${plaidError.error_message}`
      );
    }
  }
};
