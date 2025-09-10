import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import sql from "better-sqlite3";

const db = sql("billow.db");

export const storeAccountInformation = (
  request: StoreAccountInformationRequest
) => {
  db.prepare(
    "INSERT INTO accounts (user_id, account_id, account_mask) VALUES (?, ?, ?)"
  ).run(request.userId, request.accountId, request.accountMask);
};

export const getAccountInformation = (userId: string) => {
  const row = db
    .prepare<[string], { account_id: string; account_mask: string }>(
      "SELECT account_id as accountId, account_mask as accountMask FROM accounts WHERE user_id = ?"
    )
    .get(userId);

  return row;
};

export const getAccountId = (userId: string) => {
  throw new Error("getAccountId from the accounts.ts in lib is obsolete!");
  const row = db
    .prepare<[string], { account_id: string }>(
      "SELECT account_id FROM accounts WHERE user_id = ?"
    )
    .get(userId);

  return row?.account_id;
};
