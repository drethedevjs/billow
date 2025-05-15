import { PlaidContext } from "@/context/PlaidContext";
import plaidHelper from "@/utils/plaidHelper";
import { useContext } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

const ConnectToPlaidButton = () => {
  const linkToken = useContext(PlaidContext);

  const config: PlaidLinkOptions = {
    // onSuccess runs when users links their bank accounts.
    onSuccess: plaidHelper.getAndStoreAccessToken,
    onExit: plaidHelper.logErrorsToConsole,
    // onEvent: (eventName, metadata) => {},
    token: linkToken
  };

  const { open } = usePlaidLink(config);
  return (
    <button
      onClick={() => open()}
      className="billow-btn-long h-10 bg-black text-white rounded-md font-semibold my-5 focus:ring-4 focus:ring-neutral-300"
    >
      Connect to Plaid
    </button>
  );
};

export default ConnectToPlaidButton;
