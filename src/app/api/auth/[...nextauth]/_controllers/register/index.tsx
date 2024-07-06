import { UserSchema } from "@/validarions/auth/user";
import { hash } from "argon2";
import prisma from "../../../../../../../prisma";
import { Prisma } from "@prisma/client";
import { generateNumericToken } from "@/utils/generate-token";
import { email as emailGrid } from "@/lib/sendgrid/sendgrid-config";
import { registerUserTokenEmailMessageTemplate } from "@/utils/token-email-template";

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
      data: { ...data, isEmailVerified: false },
    });

    const numericToken = generateNumericToken(5);
    await emailGrid().send(
      registerUserTokenEmailMessageTemplate(numericToken, email)
    );
    await prisma.token.create({ data: { token: numericToken, userId: id } });

    return { id, name, email };
  } catch (error) {
    // console.log(`soy el error ${error}`)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`${error.code}`);
    }
    throw new Error(`error ${error}`);
  }
}
