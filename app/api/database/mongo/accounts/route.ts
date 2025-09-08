import { getMongoClient } from "@/utils/mongoHelper";

export async function POST(request: Request) {
  const mongoClient = await getMongoClient();
  mongoClient?.db("Bill")
}
