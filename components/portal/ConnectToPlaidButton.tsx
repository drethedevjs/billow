import plaidHelper from "@/utils/plaidHelper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
const ConnectToPlaidButton = () => {
  // const linkToken = useContext(PlaidContext);
  const [linkToken, setLinkToken] = useState<string>("");

  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await plaidHelper.getLinkToken();
      setLinkToken(response.data);
    };

    if (process.env.NODE_ENV === "development") fetchLinkToken();
  }, []);

  const config: PlaidLinkOptions = {
    // onSuccess runs when users links their bank accounts.
    onSuccess: plaidHelper.createAndStoreAccessToken,
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
