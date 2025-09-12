import { PlaidAccount } from "react-plaid-link";

export default interface StoreAccountInformationRequest {
  userId: string;
  account: PlaidAccount;
}
