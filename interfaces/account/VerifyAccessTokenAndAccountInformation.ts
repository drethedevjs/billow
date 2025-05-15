export default interface VerifyAccessTokenAndAccountInformation {
  hasAccessToken: boolean;
  accountInformation: {
    accountId: string;
    accountMask: string;
  };
}
