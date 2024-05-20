import { ChangeEvent, SetStateAction } from "react";
import { ToDo } from "@prisma/client";

interface DeleteToDo {
  index: number;
  setGroupOfToDoS: React.Dispatch<SetStateAction<ToDo[]>>;
}

export const deleteToDo = ({ index, setGroupOfToDoS }: DeleteToDo) => {
  setGroupOfToDoS((prev) => {
    const groupOfToDoS = [...prev];
    groupOfToDoS.splice(index, 1);
    return groupOfToDoS;
  });
};

interface HandleUpdate {
  e: ChangeEvent<HTMLInputElement>;
  index: number;
  setGroupOfToDoS: React.Dispatch<SetStateAction<ToDo[]>>;
}
export const handleUpdate = ({ e, index, setGroupOfToDoS }: HandleUpdate) => {
  const text = e.target.value;
  setGroupOfToDoS((prev) => {
    const newGroupOfToDos = [...prev];

    // by index
    const toDo = newGroupOfToDos[index];
    newGroupOfToDos[index] = { ...toDo, name: text };
    return newGroupOfToDos;
  });
};
