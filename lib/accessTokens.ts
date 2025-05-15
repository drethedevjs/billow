import sql from "better-sqlite3";

const db = sql("billow.db");

export const storeAccessToken = (token: string, userId: string) => {
  const existing = db
    .prepare("SELECT id FROM accessTokens WHERE user_id = ?")
    .get(userId);

  if (existing) {
    db.prepare("UPDATE accessTokens SET token = ? WHERE user_id = ?").run(
      token,
      userId
    );
  } else {
    db.prepare("INSERT INTO accessTokens (user_id, token) VALUES (?, ?)").run(
      userId,
      token
    );
  }
};

export const getAccessToken = (userId: string) => {
  const row = db
    .prepare<[string], { token: string }>(
      "SELECT token FROM accessTokens WHERE user_id = ?"
    )
    .get(userId);

  return row?.token;
};
