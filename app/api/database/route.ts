import { handleError } from "@/utils/errorHelper";
import { initializeDB } from "@/utils/serverHelper";

export async function POST(request: Request) {
  const secret = await request.json();
  if (secret !== process.env.INITDB_SECRET) {
    throw new Error("Not Found");
  }
  try {
    initializeDB();
    return new Response("Database initialized!");
  } catch (error) {
    handleError(error);
    return new Response("Database initialization failed!");
  }
}
