import { ServiceType } from "@/types/ServiceType";

export default interface ServicePaymentHistory {
  service: ServiceType;
  amount: number;
  penaltyAmount: number;
}
