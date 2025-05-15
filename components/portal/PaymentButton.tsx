import { UserContext } from "@/context/UserContext";
import Location from "@/interfaces/account/Location";
import { User } from "@/interfaces/User";
import { beginFundsTransfer as plaidPay } from "@/services/plaidService";
import userAccountSlice from "@/store/userAccount";
import { clearPaymentAmountInputs } from "@/utils/dashboardHelper";
import { Button, Spinner } from "flowbite-react";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";

const PaymentButton = ({
  setServicePaymentAmounts,
  totalPayment,
  location,
  servicePaymentAmounts,
  accountMask
}: {
  setServicePaymentAmounts: Dispatch<SetStateAction<Record<string, number>>>;
  totalPayment: string;
  location: Location;
  servicePaymentAmounts: Record<string, number>;
  accountMask: string;
}) => {
  const { payBill } = userAccountSlice.actions;
  const dispatch = useDispatch();
  const user = useContext<User | null>(UserContext);
  if (!user) throw new Error("User not set.");
  const { fullName, id: userId } = user;

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const pay = async () => {
    setIsProcessing(true);

    // TODO: Remove this mock delay
    setTimeout(async () => {
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
      setServicePaymentAmounts({ "": 0 });
      setIsProcessing(false);
    }, 3000);
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
