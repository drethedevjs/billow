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
  servicePaymentAmounts: Record<string, number>,
  penaltyPayments: Record<string, number>
) => {
  const paymentAmounts = Object.values(servicePaymentAmounts);
  const penaltyAmounts = Object.values(penaltyPayments);

  const total =
    paymentAmounts.reduce((prev, current) => prev + current, 0) +
    penaltyAmounts.reduce((prev, current) => prev + current, 0);

  return total.toFixed(2);
};

export const clearPaymentAmountInputs = () => {
  for (const st of serviceTypes) {
    const input = document.getElementById(st.toLowerCase()) as HTMLInputElement;

    if (input) input.value = "";
  }
};

export const highlightFirstAccount = () => {
  const firstAccount = document.getElementsByClassName("account-number")[0];
  firstAccount.classList.add("bg-accent");
};

export const calcTotalPaymentAmount = (
  servicePaymentAmounts: Record<string, number>,
  penaltyPayments: Record<string, number>
) => {
  const paymentAmounts = Object.values(servicePaymentAmounts);
  const total = paymentAmounts.reduce((prev, current) => prev + current, 0);

  const penaltyAmounts = Object.values(penaltyPayments);
  const penaltyTotal = penaltyAmounts.reduce(
    (prev, current) => prev + current,
    0
  );

  return total + penaltyTotal;
};

export const calcPenaltyAndAmount = (
  amount: number,
  type: string,
  services: Service[]
) => {
  const service = services.find((s) => s.type === type);
  if (!service) throw new Error(`Cannot find the ${type} service.`);

  if (amount > service.price + service.penalty)
    amount = changeToMostPrice(type, service);

  let penaltyAmt = 0;
  if (amount >= service.penalty) {
    penaltyAmt = service.penalty;
    amount = amount - service.penalty;
  } else {
    penaltyAmt = amount;
    amount = 0;
  }

  return { amount, penaltyAmt };
};
