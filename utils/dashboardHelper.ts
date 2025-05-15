import Service from "@/interfaces/account/Service";
import { serviceTypes } from "@/types/ServiceType";

export const changeToMostPrice = (type: string, service: Service) => {
  const element = document.getElementById(
    type.toLowerCase()
  ) as HTMLInputElement;

  const mostCustomerCanPay = Number(
    (service.penalty + service.price).toFixed(2)
  );

  if (element) {
    element.value = mostCustomerCanPay.toString();
  } else throw new Error(`Cannot find the id for the ${type} utility.`);

  return mostCustomerCanPay;
};

export const changeBackgroundToActiveAccount = (
  e: React.MouseEvent<HTMLLIElement>
) => {
  const activeAccountEl = document.getElementsByClassName(
    "bg-accent account-number"
  );
  activeAccountEl[0]?.classList.remove("bg-accent");
  e.currentTarget.classList.add("bg-accent");
};

export const calcTotalPayment = (
  servicePaymentAmounts: Record<string, number>
) => {
  const paymentAmounts = Object.values(servicePaymentAmounts);

  const total = paymentAmounts
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);

  return total;
};

export const clearPaymentAmountInputs = () => {
  for (const st of serviceTypes) {
    const input = document.getElementById(st.toLowerCase()) as HTMLInputElement;

    if (input) input.value = "";
  }
};
