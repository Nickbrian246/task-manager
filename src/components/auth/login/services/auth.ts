import { AuthLogin } from "../interfaces/inputList";
import { Auth } from "@/interfaces/auth";
export async function logUser(user: AuthLogin): Promise<Auth> {
  const res = await fetch("http://localhost:3000/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data;
}
