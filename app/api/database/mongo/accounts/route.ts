import BillowPlaidAccount from "@/interfaces/BillowPlaidAccount";
import StoreAccountInformationRequest from "@/interfaces/requests/StoreAccountInformationRequest";
import { MONGO_ROUTE_URL } from "@/utils/constants/databaseConstants";
import { getMongoClient } from "@/utils/mongoHelper";
import { NextRequest } from "next/server";

const mongoClient = await getMongoClient();
if (!mongoClient) throw new Error("Mongo client missing.");
const db = mongoClient.db();

// getAccount
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  if (searchParams.has("accountByUserId")) {
    const userId = searchParams.get("accountByUserId");
    const collection = db.collection("Accounts");

    const account: BillowPlaidAccount | null =
      await collection.findOne<BillowPlaidAccount>({ userId });

    return Response.json({ account: account });
  }

  // TODO: add the name of the implementation requested to this interpolation.
  throw new Error(`${MONGO_ROUTE_URL}/account: No implementation.`);
}

// storeAccountInformation
export async function POST(request: NextRequest) {
  const { account, userId }: StoreAccountInformationRequest =
    await request.json();

  const collection = db.collection("Accounts");

  await collection.insertOne({
    ...account,
    userId
  });

  return Response.json({ success: true });
}
