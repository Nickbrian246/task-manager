import { MutableRefObject, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToDo } from "@/app/page";
import { handleUpdate, deleteToDo } from "./update-and-delete-to-do";
import { checkCurrentToDoStatus } from "./utils";

interface EnterKeyProps {
  e: React.KeyboardEvent<HTMLInputElement>;
  index: number;
  setGroupOfToDoS: React.Dispatch<SetStateAction<ToDo[]>>;
  groupOfToDoS: ToDo[];
  currentIndexPosition: number;
  groupOfToDoSRef: MutableRefObject<HTMLInputElement[]>;
}

export const handleEnterKey = ({
  currentIndexPosition,
  e,
  groupOfToDoS,
  index,
  setGroupOfToDoS,
  groupOfToDoSRef,
}: EnterKeyProps) => {
  if (e.key === "Enter") {
    const normalizeIndexToBase1 = currentIndexPosition + 1;

    // index es el de inicio
    if (normalizeIndexToBase1 === groupOfToDoS.length) {
      const newToDo: ToDo = {
        name: "",
        toDoId: uuidv4(),
        status: false,
        label: ``,
      };
      setGroupOfToDoS((prevState) => [...prevState, newToDo]);
      setTimeout(() => focusNextInputToDo({ groupOfToDoSRef, index }), 0); // Esperar a que se actualice el estado antes de enfocar
    } else {
      const updatedGroupOfToDoS = [...groupOfToDoS];
      updatedGroupOfToDoS.splice(index + 1, 0, {
        name: " ",
        toDoId: uuidv4(),
        status: false,
        label: " ",
      });
      setGroupOfToDoS(updatedGroupOfToDoS);
      setTimeout(() => focusNextInputToDo({ groupOfToDoSRef, index }), 0);
    }
  }
  if (e.key === "ArrowUp") {
    focusPreviousInputToDo({ groupOfToDoSRef, index: index - 1 });
  }
  if (e.key === "ArrowDown") {
    focusNextInputToDo({ groupOfToDoSRef, index });
  }
};

interface FocusNextOrPrevInputToDo {
  groupOfToDoSRef: MutableRefObject<HTMLInputElement[]>;
  index: number;
}
export const focusNextInputToDo = ({
  groupOfToDoSRef,
  index,
}: FocusNextOrPrevInputToDo) => {
  if (groupOfToDoSRef.current[index + 1]) {
    groupOfToDoSRef.current[index + 1].focus();
  }
};

export const focusPreviousInputToDo = ({
  groupOfToDoSRef,
  index,
}: FocusNextOrPrevInputToDo) => {
  if (groupOfToDoSRef.current[index])
    return groupOfToDoSRef.current[index].focus();
};

interface handleDeleteKey {
  e: React.KeyboardEvent<HTMLInputElement>;
  index: number;
  groupOfToDoS: ToDo[];
  setGroupOfToDoS: React.Dispatch<SetStateAction<ToDo[]>>;
  groupOfToDoSRef: MutableRefObject<HTMLInputElement[]>;
}
export const handleDeleteKey = ({
  e,
  index,
  groupOfToDoS,
  setGroupOfToDoS,
  groupOfToDoSRef,
}: handleDeleteKey) => {
  if (e.key === "Delete" || e.key === "Del" || e.key === "Backspace") {
    if (checkCurrentToDoStatus({ groupOfToDoS, index }).name.length === 0) {
      deleteToDo({ index, setGroupOfToDoS });
      setTimeout(
        () => focusPreviousInputToDo({ groupOfToDoSRef, index: index - 1 }),
        0
      );
    }
  }
};
