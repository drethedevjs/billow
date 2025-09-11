import { PlaidAccount } from "react-plaid-link";

export default interface VerifyAccessTokenAndAccountInformation {
  hasAccessToken: boolean;
  accountInformation: PlaidAccount;
}
