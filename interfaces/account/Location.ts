import Address from "./Address";
import Service from "./Service";

export default interface Location {
  services: Service[];
  address: Address;
  accountNumber: number;
}
