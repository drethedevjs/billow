"use client";
import { accountData } from "@/data/accountData";
import { User } from "@/interfaces/User";
import { createContext } from "react";

export const UserContext = createContext<User | null>(null);

const whichUser = 4;
const account = accountData[whichUser];
const user: User = {
  id: account.id.toString(),
  firstName: account.accountHolderFirstName,
  lastName: account.accountHolderLastName,
  fullName: account.accountHolderFirstName + account.accountHolderLastName,
  address: account.address,
  email: account.email,
  phone: account.phone
};

export default function UserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
