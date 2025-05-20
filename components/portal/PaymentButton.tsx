import useUser from "@/hooks/useUser";
import Location from "@/interfaces/account/Location";
import ServicePaymentHistory from "@/interfaces/ServicePaymentHistory";
import { beginFundsTransfer as plaidPay } from "@/services/plaidService";
import paymentHistorySlice from "@/store/paymentHistory";
import userAccountSlice from "@/store/userAccount";
import { ServiceType } from "@/types/ServiceType";
import {
  calcTotalPaymentAmount,
  clearPaymentAmountInputs
} from "@/utils/dashboardHelper";
import { getRandomId } from "@/utils/globalHelper";
import { Button, Spinner } from "flowbite-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
const PaymentButton = ({
  setServicePaymentAmounts,
  setPenaltyPayments,
  totalPayment,
  location,
  servicePaymentAmounts,
  accountMask,
  penaltyPayments
}: {
  setServicePaymentAmounts: Dispatch<SetStateAction<Record<string, number>>>;
  setPenaltyPayments: Dispatch<SetStateAction<Record<string, number>>>;
  totalPayment: string;
  location: Location;
  servicePaymentAmounts: Record<string, number>;
  accountMask: string;
  penaltyPayments: Record<string, number>;
}) => {
  const { payBill } = userAccountSlice.actions;
  const { addPaymentHistory } = paymentHistorySlice.actions;

  const dispatch = useDispatch();
  const user = useUser();
  if (!user) throw new Error("User not set.");
  const { fullName, id: userId } = user;

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const pay = async () => {
    setIsProcessing(true);

    const response = await plaidPay(fullName, userId, totalPayment);
    if (!response.isSuccess) {
      console.error(response.message);
      // TODO: Add error toast
      throw new Error(response.message);
    }

    const servicePaymentHistory: ServicePaymentHistory[] = [];
    Object.keys(servicePaymentAmounts).forEach((service) => {
      dispatch(
        payBill({
          accountNumber: location.accountNumber,
          serviceName: service,
          payment: servicePaymentAmounts[service] + penaltyPayments[service]
        })
      );

      servicePaymentHistory.push({
        service: service as ServiceType,
        amount: servicePaymentAmounts[service],
        penaltyAmount: penaltyPayments[service]
      });
    });

    const total = calcTotalPaymentAmount(
      servicePaymentAmounts,
      penaltyPayments
    );

    const id = getRandomId();
    dispatch(
      addPaymentHistory({
        id,
        userId,
        date: new Date().toISOString(),
        total: total,
        accountNumber: location.accountNumber,
        address: location.address,
        servicePaymentHistory
      })
    );

    clearPaymentAmountInputs();
    setServicePaymentAmounts({});
    setPenaltyPayments({});
    setIsProcessing(false);
  };

  const totalPenaltyPayments = useMemo(() => {
    return Object.values(penaltyPayments).reduce(
      (prev, current) => prev + current,
      0
    );
  }, [penaltyPayments]);

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
          disabled={Number(totalPayment) + totalPenaltyPayments === 0}
        >
          <BiDollarCircle className="mr-2 h-5 w-5" />
          Make Payment with XXXX{accountMask}
        </Button>
      )}
    </>
  );
};

export default PaymentButton;
