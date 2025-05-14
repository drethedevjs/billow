import Service from "@/interfaces/account/Service";

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
