import Database from "better-sqlite3";

// Open (or create) the database file
const db = new Database("billow.db");

// It's better to have the access token be stored in a table that links to a
// user's userId but I'm doing it this way just to get the integration up and running.
db.exec(`
  DROP TABLE IF EXISTS accessTokens;
  CREATE TABLE accessTokens (
    id INTEGER PRIMARY KEY,
    user_id TEXT UNIQUE,
    token TEXT
    );
`);

db.exec(`
  DROP TABLE IF EXISTS accounts;
  CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    user_id TEXT UNIQUE,
    account_id TEXT,
    account_mask TEXT
  );
`);

// Clear existing rows (optional)
db.exec(`DELETE FROM accessTokens;`);
db.exec(`DELETE FROM accounts;`);

console.log("Database initialized with one row.");
