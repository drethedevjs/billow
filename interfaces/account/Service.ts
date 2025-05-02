import { ServiceType } from "@/types/ServiceType";

export default interface Service {
  id: number;
  type: ServiceType;
  price: number;
  penalty: number;
}
