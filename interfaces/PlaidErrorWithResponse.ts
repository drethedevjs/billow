import { PlaidError } from "plaid";

export default interface PlaidErrorWithResponse extends PlaidError {
  response?: {
    data?: {
      error_code: string;
      error_message: string;
    };
  };
}
