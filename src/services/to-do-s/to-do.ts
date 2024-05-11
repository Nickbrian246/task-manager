import { getAuthToken } from "@/utils";
import { ToDo } from "@prisma/client";

export async function putToDos(toDos: ToDo[]): Promise<ToDo[]> {
  const token = getAuthToken();
  const response = await fetch("http://localhost:3000/api/todo-task", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(toDos),
  });
  const res = await response.json();
  return res;
}
