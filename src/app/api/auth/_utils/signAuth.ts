import { SignJWT, jwtVerify } from "jose";
interface JwtPayload {
  email: string;
  userId: string;
}

const secret: string = process.env.NEXT_PUBLIC_SECRET_WORD as string;
const secreKey = new TextEncoder().encode(secret);
export async function signJwt(payload: any): Promise<string> {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secreKey);
  } catch (error) {
    throw new Error("Error al firmar el token JWT");
  }
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secreKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    throw new Error("Error al veirficar el token JWT");
  }
}
