import { MONGO_ROUTE_URL } from "@/utils/constants/databaseConstants";
import { getMongoClient } from "@/utils/mongoHelper";
import { NextRequest } from "next/server";
import { PlaidAccount } from "react-plaid-link";

const mongoClient = await getMongoClient();
if (!mongoClient) throw new Error("Mongo client missing.");
const db = mongoClient.db();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  if (searchParams.has("accountByUserId")) {
    const userId = searchParams.get("accountByUserId");
    const collection = db.collection("Accounts");
    const account: PlaidAccount | null = await collection.findOne<PlaidAccount>(
      { userId }
    );
    console.log("back from mongo", account);
    return Response.json(account);
  }

  throw new Error(`${MONGO_ROUTE_URL}/account: No implementation.`);
}

export async function POST(request: Request) {
  const mongoClient = await getMongoClient();
  mongoClient?.db("Bill");
}
