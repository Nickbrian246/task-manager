import { NextRequest } from "next/server";

export interface DecodedUser {
  email: string;
  userId: string;
}

export interface CustomNextApiRequest<RequestBody = unknown>
  extends NextRequest {
  user: DecodedUser;
  req: RequestBody;
}
