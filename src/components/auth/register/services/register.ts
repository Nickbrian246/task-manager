import { User } from "@prisma/client";
import { Signin } from "../interfaces/register";
export async function SigninUser(user: Signin): Promise<User> {
  const res = await fetch(
    "https://task-manager-one-lac.vercel.app/api/auth/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const data = await res.json();
  return data;
}
