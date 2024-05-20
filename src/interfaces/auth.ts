import { User } from "@prisma/client";

type ToDos = Pick<User, "ToDos">;

export interface Auth {
  accessToken: string;
  toDos: ToDos;
}
