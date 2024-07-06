import { decode } from "next-auth/jwt";
import prisma from "../../../../../prisma";
import { Prisma } from "@prisma/client";
interface JWT {
  email: string;
}
interface EmailVerification {
  token: string;
}
export async function POST(request: Request) {
  try {
    const clientJwt = request.headers.get("Cookie") as string;
    const { token } = (await request.json()) as EmailVerification;

    if (!clientJwt)
      return Response.json({ data: "no token provided" }, { status: 400 });

    const { email } = (await decode({
      token: clientJwt.split("=").pop(),
      secret: process.env.NEXTAUTH_SECRET as string,
    })) as JWT;

    const { validatationToken, id: userId } =
      await prisma.user.findFirstOrThrow({
        where: { email },
        include: { validatationToken: true },
      });
    if (validatationToken && validatationToken?.tries >= 5)
      return Response.json(
        { message: "You have reached the maximum number of attempts." },
        { status: 400 }
      );

    if (validatationToken && validatationToken?.token !== token) {
      await prisma.token.update({
        where: { userId },
        data: { tries: validatationToken?.tries + 1 },
      });
      return Response.json({ message: "wrong token " }, { status: 400 });
    }

    if (validatationToken?.token === token) {
      await prisma.user.update({
        where: { email },
        data: { isEmailVerified: true },
      });
    }

    return Response.json({ data: "ok" });
  } catch (error) {
    // console.log(`soy el error ${error}`)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json({ message: `${error.message}` }, { status: 400 });
    }
    return Response.json({ message: `${error}` }, { status: 400 });
  }
}
