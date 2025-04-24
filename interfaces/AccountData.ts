import Location from "./Location";

export interface AccountData {
  utilityCompanyName: string;
  accountHolderFirstName: string;
  accountHolderLastName: string;
  locations: Location[];
}
