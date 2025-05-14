export default interface AuthorizeTransferCreateRequest {
  userId: string;
  amount: string;
  legalName: string; // should be (full) first and last name
  accessToken: string;
  accountId: string;
}
