import prisma from "../../../../prisma";
import { ToDoSSchema } from "@/validarions/todo-task/indes";
import { decode } from "next-auth/jwt";
interface JWT {
  email: string;
}
export async function PUT(request: Request, response: Response) {
  try {
    const toDos = await request.json();

    const token = request.headers.get("Cookie") as string;

    const { email } = (await decode({
      token: token.split("=").pop(),
      secret: process.env.NEXTAUTH_SECRET as string,
    })) as JWT;

    const toDosData = ToDoSSchema.parse(toDos);

    const { ToDos } = await prisma.user.update({
      where: { email },
      data: { ToDos: toDosData },
    });

    return Response.json({ data: { toDos: ToDos } });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Cookie") as string;

    const { email } = (await decode({
      token: token.split("=").pop(),
      secret: process.env.NEXTAUTH_SECRET as string,
    })) as JWT;

    const { ToDos } = await prisma.user.findUniqueOrThrow({
      where: { email },
    });

    return Response.json({ data: { toDos: ToDos } });
  } catch (error) {}
}
