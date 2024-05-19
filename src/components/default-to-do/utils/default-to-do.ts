import { ToDo } from "@prisma/client";
export const defaultToDo: ToDo[] = [
  {
    name: "",
    toDoId: "defaultToDos",
    status: false,
    label:
      "  Escribe tu primer tarea y oprime la tecla Enter para la siguiente ;)",
  },
];
