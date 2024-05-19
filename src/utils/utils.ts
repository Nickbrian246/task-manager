import { ToDo } from "@prisma/client";
import { SetStateAction } from "react";
interface CheckCurrentToDoStatus {
  index: number;
  groupOfToDoS: ToDo[];
}

export const checkCurrentToDoStatus = ({
  groupOfToDoS,
  index,
}: CheckCurrentToDoStatus): ToDo => {
  const ToDo = groupOfToDoS[index];
  return ToDo;
};

interface HandleTaskStatus {
  id: string;
  setGroupOfToDoS: React.Dispatch<SetStateAction<ToDo[]>>;
}
export const handleTaskStatus = ({ id, setGroupOfToDoS }: HandleTaskStatus) => {
  setGroupOfToDoS((prev) => {
    const newGroupOfToDos = prev.map((toDo) => {
      return id === toDo.toDoId ? { ...toDo, status: !toDo.status } : toDo;
    });
    return newGroupOfToDos;
  });
};

export const updateToDoLabel = (index: number): string => {
  return index === 0
    ? `Escribe tu primer tarea y oprime la tecla Enter para la siguiente ;)`
    : `Oprime la tecla " / " para abrir el menu de opciones`;
};

export const updateNameWhiteSpaceOnBlur = (
  index: number,
  name: string
): string => {
  if (name.length >= 1) {
    return name;
  }
  return index === 0 ? `` : ` `;
};

export const updateNameWhiteSpaceOnFocus = (name: string): string => {
  return name.length >= 2 ? name : ``;
};
