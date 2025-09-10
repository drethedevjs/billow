import { User } from "@/interfaces/User";
import { getMongoClient } from "@/utils/mongoHelper";
import { NextRequest } from "next/server";

const mongoClient = await getMongoClient();
if (!mongoClient) throw new Error("Mongo client missing.");
const db = mongoClient.db();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  if (searchParams.has("accessTokenByUserId")) {
    const userId = searchParams.get("accessTokenByUserId");
    const collection = db.collection("Users");
    const user: User | null = await collection.findOne<User>({ userId });

    return Response.json({ accessToken: user?.plaidAccessToken });
  }
}

export async function POST(request: Request) {
  const { accessToken, userId } = await request.json();

  // const mongoClient = await getMongoClient();
  // if (!mongoClient) throw new Error("Mongo client missing.");

  // const db = mongoClient.db("billow");
  const collection = db.collection("Users");
  collection.insertOne({
    userId,
    accessToken
  });
}
