import useUser from "@/hooks/useUser";
import plaidHelper from "@/utils/plaidHelper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
const ConnectToPlaidButton = () => {
  const [linkToken, setLinkToken] = useState<string>("");

  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await plaidHelper.getLinkToken();
      setLinkToken(response.data);
    };

    if (process.env.NODE_ENV === "development") fetchLinkToken();
  }, []);

  const user = useUser();

  const config: PlaidLinkOptions = {
    // onSuccess runs when users links their bank accounts.
    onSuccess: async (publicToken, metadata) => {
      const response = await plaidHelper.createAccessToken(
        publicToken,
        metadata,
        user.id
      );

      const {id: accountId, mask} = metadata.accounts[0];

      const accessToken = response.data;
      const storedResponse = await plaidHelper.storeAccessToken(
        accessToken,
        user.id
      );

      if (!storedResponse.isSuccess) throw new Error(storedResponse.message);
      
      const storeAccountInfoResponse = await plaidHelper.storeAccountInformation(accountId, mask, user.id);
      if (!storeAccountInfoResponse.isSuccess) throw new Error(storedResponse.message);
    },
    onExit: plaidHelper.logErrorsToConsole,
    // onEvent: (eventName, metadata) => {},
    token: linkToken
  };

  const { open } = usePlaidLink(config);
  return (
    <button
      onClick={() => open()}
      className="billow-btn-long h-10 bg-black text-white rounded-md font-semibold my-5 focus:ring-4 focus:ring-neutral-300 flex flex-row items-center justify-center"
      disabled={!linkToken}
    >
      <span className="text-sm">Connect to&nbsp;</span>
      <Image
        src="https://cdn.brandfetch.io/idly0-MZ4j/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
        alt="Plaid Logo"
        className="w-12 h-12"
        width={500}
        height={500}
      />
    </button>
  );
};

export default ConnectToPlaidButton;
