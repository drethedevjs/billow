import { BillowToastContext } from "@/context/ToastContext";
import useUser from "@/hooks/useUser";
import VerifyAccessTokenAndAccountInformation from "@/interfaces/account/VerifyAccessTokenAndAccountInformation";
import plaidHelper from "@/utils/plaidHelper";
import chalk from "chalk";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

const ConnectToPlaidButton = ({
  setPlaidConnectivityVerification
}: {
  setPlaidConnectivityVerification: Dispatch<
    SetStateAction<VerifyAccessTokenAndAccountInformation | null>
  >;
}) => {
  const [linkToken, setLinkToken] = useState<string>("");
  const { setToastMsg, showToast, setIsError } = useContext(BillowToastContext);

  const showFailToast = (msg: string) => {
    setToastMsg(msg);
    setIsError(true);
    showToast();
  };

  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await plaidHelper.getLinkToken();
      if (!response.isSuccess) {
        console.error(response.message);
        showFailToast(response.message);
        return;
      }

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

      const accessToken = response.data;
      const storedResponse = await plaidHelper.storeAccessToken(
        accessToken,
        user.id
      );

      if (!storedResponse.isSuccess) throw new Error(storedResponse.message);
      console.info(storedResponse.message);

      const plaidAccount = metadata.accounts[0];
      const storeAccountInfoResponse =
        await plaidHelper.storeAccountInformation(plaidAccount, user.id);

      if (!storeAccountInfoResponse.isSuccess)
        throw new Error(storedResponse.message);

      console.info(chalk.blueBright(storeAccountInfoResponse.message));

      setPlaidConnectivityVerification({
        hasAccessToken: true,
        accountInformation: plaidAccount
      });
    },
    onExit: plaidHelper.logErrorsToConsole,
    // onEvent: (eventName, metadata) => {},
    token: linkToken
  };

  const { open } = usePlaidLink(config);
  return (
    <button
      onClick={() => open()}
      className="disabled:bg-slate-500 disabled:cursor-not-allowed billow-btn-long h-10 bg-black text-white rounded-md font-semibold my-5 focus:ring-4 focus:ring-neutral-300 flex flex-row items-center justify-center dark:ring-white dark:ring-1"
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
