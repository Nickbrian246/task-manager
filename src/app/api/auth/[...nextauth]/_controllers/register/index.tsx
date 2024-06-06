import { UserSchema } from "@/validarions/auth/user";
import { hash } from "argon2";
import prisma from "../../../../../../../prisma";
import { Prisma } from "@prisma/client";
type Credentials = {
  name: string;
  email: string;
  password: string;
  familyName: string;
};
export async function registerController(credentials: Credentials) {
  try {
    const hashedPassword = await hash(credentials.password);

    const data = UserSchema.parse({
      ...credentials,
      password: hashedPassword,
    });

    const { id, email, name } = await prisma.user.create({
      data,
    });

    return { id, name, email };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`${error.code}`);
    }
    throw new Error(`error ${error}`);
  }
}
