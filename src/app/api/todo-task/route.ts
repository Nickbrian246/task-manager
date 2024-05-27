import prisma from "../../../../prisma";
import { ToDoSSchema } from "@/validarions/todo-task/indes";

export async function PUT(request: Request, response: Response) {
  try {
    const toDos = await request.json();

    const userCredentials = request.headers.get("user-credentials") as string;
    console.log(userCredentials);

    const { userId } = JSON.parse(userCredentials);

    const toDosData = ToDoSSchema.parse(toDos);

    const { ToDos } = await prisma.user.update({
      where: { id: userId },
      data: { ToDos: toDosData },
    });

    return Response.json({ data: { toDos: ToDos } });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request) {
  try {
    const userDecoded = request.headers.get("user-credentials") as string;
    const { userId } = JSON.parse(userDecoded);

    const { ToDos } = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return Response.json({ data: { toDos: ToDos } });
  } catch (error) {}
}
