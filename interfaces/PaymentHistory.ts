import Address from "./account/Address";
import ServicePaymentHistory from "./ServicePaymentHistory";

export interface PaymentHistory {
  id: number;
  date: string;
  total: number;
  accountNumber: number;
  address: Address;
  servicePaymentHistory: ServicePaymentHistory[];
}
