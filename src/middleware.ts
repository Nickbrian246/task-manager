import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/api/auth/_utils/signAuth";

const secretKey = process.env.SECRET_WORD;
export async function middleware(request: NextRequest) {
  try {
    const token = request.headers
      .get("authorization")
      ?.split(" ")
      .pop() as string;

    const decodedUser = await verifyToken(token);

    const response = NextResponse.next();
    response.headers.set("user-credentials", JSON.stringify(decodedUser));

    return response;
  } catch (error) {
    // console.log(error);
    NextResponse.json({ error: error }, { status: 400 });
  }
}

export const config = {
  match: ["/api/todo-task"],
};
