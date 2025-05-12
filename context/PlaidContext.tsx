"use client";

import plaidHelper from "@/utils/plaidHelper";
import { createContext } from "react";

export const PlaidContext = createContext<string>("");

const linkToken = (await plaidHelper.getLinkToken()).data;

export default function PlaidProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PlaidContext.Provider value={linkToken}>{children}</PlaidContext.Provider>
  );
}
