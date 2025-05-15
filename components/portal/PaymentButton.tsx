import { UserContext } from "@/context/UserContext";
import Location from "@/interfaces/account/Location";
import { User } from "@/interfaces/User";
import { beginFundsTransfer as plaidPay } from "@/services/plaidService";
import userAccountSlice from "@/store/userAccount";
import { serviceTypes } from "@/types/ServiceType";
import { Button, Spinner } from "flowbite-react";
import { useContext } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";

const PaymentButton = ({
  isProcessing,
  runMockFunction,
  totalPayment,
  location,
  servicePaymentAmounts
}: {
  isProcessing: boolean;
  runMockFunction: (func: () => Promise<void>) => void;
  totalPayment: string;
  location: Location;
  servicePaymentAmounts: Record<string, number>;
}) => {
  const { payBill } = userAccountSlice.actions;
  const dispatch = useDispatch();
  const userContext = useContext<User | null>(UserContext);
  if (!userContext) throw new Error("userContext must be set.");
  const { fullName, id: userId } = userContext;

  const pay = () => {
    const processPayment = async () => {
      const response = await plaidPay(fullName, userId, totalPayment);
      if (!response.isSuccess) {
        console.error(response.message);
        // TODO: Add error toast
        throw new Error(response.message);
      }

      Object.keys(servicePaymentAmounts).forEach((serviceType) => {
        dispatch(
          payBill({
            accountNumber: location.accountNumber,
            serviceName: serviceType,
            payment: servicePaymentAmounts[serviceType]
          })
        );
      });

      clearPaymentAmountInputs();
    };

    runMockFunction(processPayment);
  };

  const clearPaymentAmountInputs = () => {
    for (const st of serviceTypes) {
      const input = document.getElementById(
        st.toLowerCase()
      ) as HTMLInputElement;

      if (input) input.value = "0";
    }
  };

  return (
    <>
      {isProcessing ? (
        <Button className="mt-3 w-full focus:!ring-0 bg-white hover:bg-white border border-accent text-accent dark:bg-white dark:hover:bg-white dark:hover:text-accent cursor-not-allowed">
          <Spinner
            aria-label="Spinner button example"
            size="sm"
            color="failure"
          />
          <span className="pl-3">Payment Processing</span>
        </Button>
      ) : (
        <Button
          onClick={pay}
          className="mt-3 w-full bg-primary focus:!ring-0 hover:bg-accent transition-colors dark:bg-accent dark:hover:bg-slate dark:hover:text-accent disabled:bg-muted"
          disabled={Number(totalPayment) === 0}
        >
          <BiDollarCircle className="mr-2 h-5 w-5" />
          Make Payment
        </Button>
      )}
    </>
  );
};

export default PaymentButton;
