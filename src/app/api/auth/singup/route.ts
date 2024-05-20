import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/validarions/auth/user";
import { hash } from "argon2";
import prisma from "../../../../../prisma";
import { signJwt } from "../_utils/signAuth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const User = UserSchema.parse(body);

  const hashPassword = await hash(User.password);
  const data = { ...User, password: hashPassword };

  const response = await prisma.user.create({ data });

  const token = await signJwt({ email: User.email, userId: response.id });
  return NextResponse.json(
    {
      data: {
        accessToken: token,
      },
    },
    { status: 200 }
  );
}
