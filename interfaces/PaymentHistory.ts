import Address from "./account/Address";
import ServicePaymentHistory from "./ServicePaymentHistory";

export interface PaymentHistory {
  id: number;
  userId: string;
  date: string;
  total: number;
  accountNumber: number;
  address: Address;
  servicePaymentHistory: ServicePaymentHistory[];
}
