import { ServiceName } from "@/types/ServiceName";

export default interface Service {
  name: ServiceName;
  price: number;
  penalty: number;
}
