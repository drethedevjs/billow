import Location from "@/interfaces/account/Location";
import userAccountSlice from "@/store/userAccount";
import { serviceTypes } from "@/types/ServiceType";
import { Button, Spinner } from "flowbite-react";
import { BiDollarCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";

const PaymentButton = ({
  isProcessing,
  runMockFunction,
  calcTotalPayment,
  location,
  servicePaymentAmounts
}: {
  isProcessing: boolean;
  runMockFunction: (func: () => void) => void;
  calcTotalPayment: string;
  location: Location;
  servicePaymentAmounts: Record<string, number>;
}) => {
  const { payBill } = userAccountSlice.actions;
  const dispatch = useDispatch();

  const pay = () => {
    const processPayment = () => {
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
          disabled={Number(calcTotalPayment) === 0}
        >
          <BiDollarCircle className="mr-2 h-5 w-5" />
          Make Payment
        </Button>
      )}
    </>
  );
};

export default PaymentButton;
