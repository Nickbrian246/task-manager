import { NextRequest, NextResponse } from "next/server";
import { UserSchema, UserCredentialsSchema } from "@/validarions/auth/user";
import { hash, verify } from "argon2";
import prisma from "../../../../../prisma";
import { signJwt } from "../_utils/signAuth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const SessionCredentials = UserCredentialsSchema.parse(body);

  const user = await prisma.user.findFirstOrThrow({
    where: { email: SessionCredentials.email },
  });

  const hashPassword = await verify(user.password, SessionCredentials.password);
  if (!hashPassword)
    return Response.json({ message: "Incorrect Password" }, { status: 400 });

  const token = await signJwt({ email: user.email, userId: user.id });

  return NextResponse.json({ acessToken: token }, { status: 200 });
}
