import { ToDo } from "@/app/page";
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
