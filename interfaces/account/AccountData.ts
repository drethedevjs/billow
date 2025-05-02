import Location from "./Location";

export interface AccountData {
  id: number;
  utilityCompanyName: string;
  accountHolderFirstName: string;
  accountHolderLastName: string;
  locations: Location[];
}
