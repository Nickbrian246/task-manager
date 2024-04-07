import prisma from "../../../../prisma";
import { ToDoSSchema } from "@/validarions/todo-task/indes";

export async function PUT(request: Request, response: Response) {
  try {
    const toDos = await request.json();

    const userCredentials = request.headers.get("user-credentials") as string;
    const { userId } = JSON.parse(userCredentials);

    const toDosData = ToDoSSchema.parse(toDos);

    const { ToDos } = await prisma.user.update({
      where: { id: userId },
      data: { ToDos: toDosData },
    });

    return Response.json({ data: ToDos });
  } catch (error) {
    console.log(error);
  }
}
