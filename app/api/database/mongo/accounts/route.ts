import BillowPlaidAccount from "@/interfaces/BillowPlaidAccount";
import { MONGO_ROUTE_URL } from "@/utils/constants/databaseConstants";
import { getMongoClient } from "@/utils/mongoHelper";
import { NextRequest } from "next/server";

const mongoClient = await getMongoClient();
if (!mongoClient) throw new Error("Mongo client missing.");
const db = mongoClient.db();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  if (searchParams.has("accountByUserId")) {
    const userId = searchParams.get("accountByUserId");
    const collection = db.collection("Accounts");

    const account: BillowPlaidAccount | null =
      await collection.findOne<BillowPlaidAccount>({ userId });

    return Response.json(account);
  }

  // TODO: add the name of the implementation requested to this interpolation.
  throw new Error(`${MONGO_ROUTE_URL}/account: No implementation.`);
}
