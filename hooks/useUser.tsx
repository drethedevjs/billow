import { User } from "@/interfaces/User";
import { useBillowSelector } from "@/store/configureStore";
import { useMemo } from "react";

export default function useUser(): User {
  const account = useBillowSelector((state) => state.account[3]);

  const user = useMemo(
    () => ({
      id: account.id.toString(),
      firstName: account.accountHolderFirstName,
      lastName: account.accountHolderLastName,
      fullName: `${account.accountHolderFirstName}${account.accountHolderLastName}`,
      address: account.address,
      email: account.email,
      phone: account.phone
    }),
    [account]
  );

  return user;
}
