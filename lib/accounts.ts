import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import sql from "better-sqlite3";

const db = sql("billow.db");

export const storeAccountInformation = (
  request: StoreAccountInformationRequest
) => {
  db.prepare("INSERT INTO accounts (user_id, account_id) VALUES (?, ?)").run(
    request.userId,
    request.accountId
  );
};

export const getAccountId = (userId: string) => {
  const row = db
    .prepare<[string], { account_id: string }>(
      "SELECT account_id FROM accounts WHERE user_id = ?"
    )
    .get(userId);

  return row?.account_id;
};
