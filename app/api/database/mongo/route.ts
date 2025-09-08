import { User } from "@/interfaces/User";
import { getMongoClient } from "@/utils/mongoHelper";

const mongoClient = await getMongoClient();
if (!mongoClient) throw new Error("Mongo client missing.");
const db = mongoClient.db();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.has("accessTokenByUserId")) {
    console.log("THIS NEW WAY WORKS");
    const userId = searchParams.get("accessTokenByUserId");
    const collection = db.collection("Users");
    const user: User | null = await collection.findOne<User>({ userId });

    return Response.json({ accessToken: user?.accessToken });
  } else if (searchParams.has("accessTokenByUserId")) {
    console.log("THIS NEW WAY WORKS");
    const userId = searchParams.get("accessTokenByUserId");
    const collection = db.collection("Users");
    const user: User | null = await collection.findOne<User>({ userId });

    return Response.json({ accessToken: user?.accessToken });
  }
  // const collection = db.collection("Users");
  // const user: User | null = await collection.findOne<User>({ userId });

  // return Response.json({ boom: "holla back" });
  // const { searchParams } = new URL(request.url);
  // const userId = searchParams.get("userId");

  // const collection = db.collection("Users");
  // const user: User | null = await collection.findOne<User>({ userId });

  // return Response.json({ accessToken: user?.accessToken });
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
