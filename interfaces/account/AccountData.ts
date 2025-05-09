import Address from "./Address";
import Location from "./Location";

export interface AccountData {
  id: number;
  utilityCompanyName: string;
  accountHolderFirstName: string;
  accountHolderLastName: string;
  address: Address;
  email: string;
  phone: string;
  locations: Location[];
}
