import { MongoClient } from "mongodb";
import { handleError } from "./errorHelper";

export const getMongoClient = async () => {
  const url = process.env.BILLOW_DB_CONNECT_STRG;

  if (!url) throw new Error("Database connection string missing!");

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to database!");
    client.db("Billow");
    return client;
  } catch (error) {
    handleError(error);
  }
};
