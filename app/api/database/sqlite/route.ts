import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import { storeAccountInformation } from "@/lib/accounts";
import { handleError } from "@/utils/errorHelper";

export async function POST(request: Request) {
  const { accountId, mask, userId } = await request.json();

  try {
    const request: StoreAccountInformationRequest = {
      accountId,
      accountMask: mask,
      userId
    };

    await storeAccountInformation(request);
    return new Response("Account Information Stored!");
  } catch (error) {
    handleError(error);
    return new Response(
      "Error happened while attempting to store the account information!"
    );
  }
}
