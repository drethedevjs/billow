import { User } from "@/interfaces/User";
import { useBillowSelector } from "@/store/configureStore";
import { useMemo } from "react";

export default function useUser(): User {
  const dataArrayIdx = 4; // selector which account and user to use.
  const account = useBillowSelector((state) => state.account[dataArrayIdx]);

  const user: User = useMemo(
    () => ({
      id: account.id.toString(),
      firstName: account.accountHolderFirstName,
      lastName: account.accountHolderLastName,
      fullName: `${account.accountHolderFirstName} ${account.accountHolderLastName}`,
      address: account.address,
      email: account.email,
      phone: account.phone,
      dataArrayIdx: dataArrayIdx,
      accountData: account
    }),
    [account]
  );

  return user;
}
