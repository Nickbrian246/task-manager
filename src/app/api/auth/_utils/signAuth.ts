import jwt from "jsonwebtoken";

interface JwtPayload {
  email: string;
  userId: string;
}

export async function signJwt(payload: JwtPayload): Promise<string> {
  try {
    const secret: string = process.env.NEXT_PUBLIC_SECRET_WORD ?? "hello";
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    return token;
  } catch (error) {
    throw new Error("Error al firmar el token JWT");
  }
}

export async function verifyToken(token: string) {
  try {
    const secret: string = process.env.NEXT_PUBLIC_SECRET_WORD ?? "hello";
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    throw new Error("Error al veirficar el token JWT");
  }
}
