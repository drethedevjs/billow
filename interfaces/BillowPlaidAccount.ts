import { PlaidAccount } from "react-plaid-link";

export default interface BillowPlaidAccount extends PlaidAccount {
  userId: string;
}
