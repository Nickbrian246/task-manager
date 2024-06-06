import { verify } from "argon2";
import prisma from "../../../../../../../prisma";
import { Prisma } from "@prisma/client";
export async function SigninController(email: string, password: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { email },
    });
    // if (!user) throw new Error("user not found");
    if (user) {
      const validatePassword = await verify(user.password ?? "", password);
      if (!validatePassword) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`${error.code}`);
    }

    throw new Error(`${error}`);
  }
}
