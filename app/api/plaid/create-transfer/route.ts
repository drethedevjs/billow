import PlaidErrorWithResponse from "@/interfaces/PlaidErrorWithResponse";
import AuthorizeTransferCreateRequest from "@/interfaces/requests/AuthorizeTransferCreateRequest";
import { sleep } from "@/utils/billowHelper";
import plaidClient from "@/utils/plaidClient";
import {
  ACHClass,
  TransferAuthorizationCreateRequest,
  TransferNetwork,
  TransferType
} from "plaid";
import { v4 as uuid } from "uuid";

// Authorize transfer: /transfer/authorization/create
export async function POST(request: Request) {
  const {
    userId,
    amount,
    legalName,
    accessToken,
    accountId
  }: AuthorizeTransferCreateRequest = await request.json();

  // Need this key so that retries won't create multiple authorizations
  const idempotencyKey = uuid();
  const response = await createAuthTransfer(
    userId,
    amount,
    legalName,
    accessToken,
    accountId,
    idempotencyKey
  );

  return Response.json(response.data.authorization);
}

const createAuthTransfer = async (
  userId: string,
  amount: string,
  legalName: string,
  accessToken: string,
  accountId: string,
  idempotencyKey: string,
  remainingTries = 5
) => {
  try {
    const transferAuthReq: TransferAuthorizationCreateRequest = {
      account_id: accountId,
      access_token: accessToken,
      type: TransferType.Debit,
      network: TransferNetwork.Ach,
      amount: amount,
      ach_class: ACHClass.Web,
      user: {
        legal_name: legalName
      },
      idempotency_key: idempotencyKey
    };

    // TODO: Create workflow to send an email to the customer saying that the authorization
    // didn't work and for them to try again.

    const response = await plaidClient.transferAuthorizationCreate(
      transferAuthReq
    );

    return response;
  } catch (error) {
    const err = error as PlaidErrorWithResponse;
    const plaidError = err.response?.data
      ? err.response.data
      : { error_code: "UNKNOWN", error_message: "Unknown error" };

    if (
      remainingTries > 0 &&
      (plaidError.error_code === "RATE_LIMIT_EXCEEDED" ||
        plaidError.error_code === "INTERNAL_SERVER_ERROR")
    ) {
      // waiting a few seconds before trying again.
      sleep(3);
      // Retry on rate limits or internal server errors
      return await createAuthTransfer(
        userId,
        amount,
        legalName,
        accessToken,
        accountId,
        idempotencyKey,
        remainingTries - 1
      );
    }

    throw new Error(
      `Could not authorize transfer: METHOD: createAuthTransfer() - ${plaidError.error_code} - ${plaidError.error_message}`
    );
  }
};
