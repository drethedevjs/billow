import Address from "./account/Address";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: Address;
  email: string;
  phone: string;
};
