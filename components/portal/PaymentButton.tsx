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
  servicePaymentAmounts,
  accountMask
}: {
  isProcessing: boolean;
  runMockFunction: (func: () => Promise<void>) => void;
  totalPayment: string;
  location: Location;
  servicePaymentAmounts: Record<string, number>;
  accountMask: string;
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
        <Button className="payment-processing-btn billow-btn-long">
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
          className="payment-btn billow-btn-long"
          disabled={Number(totalPayment) === 0}
        >
          <BiDollarCircle className="mr-2 h-5 w-5" />
          Make Payment with XXXX{accountMask}
        </Button>
      )}
    </>
  );
};

export default PaymentButton;
