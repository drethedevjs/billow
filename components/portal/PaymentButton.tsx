import { Button, Spinner } from "flowbite-react";
import { BiDollarCircle } from "react-icons/bi";

const PaymentButton = ({
  processing,
  processPayment,
  calcTotalPayment
}: {
  processing: boolean;
  processPayment: () => void;
  calcTotalPayment: string;
}) => {
  return (
    <>
      {processing ? (
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
          onClick={processPayment}
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
