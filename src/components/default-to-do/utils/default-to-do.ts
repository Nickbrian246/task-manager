import { ToDo } from "@prisma/client";
import { v4 as uuid } from "uuid";
export const defaultToDo: ToDo[] = [
  {
    name: "",
    toDoId: uuid(),
    status: false,
    label:
      "  Escribe tu primer tarea y oprime la tecla Enter para la siguiente ;)",
  },
];
