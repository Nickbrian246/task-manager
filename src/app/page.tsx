"use client";

import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  saveToDoSInLocalStorage,
  getToDoSInLocalStorage,
} from "@/utils/localstorage";
import Menu from "@/components/menu/Menu";
import { menuModalOpenAndClose } from "@/utils/checkKeyCommand/checkSlashMenu";
export interface ToDo {
  name: string;
  toDoId: string;
  status: boolean;
  label?: string;
  isMenuOpen: boolean;
}

export default function Home() {
  const [groupOfToDoS, setGroupOfToDoS] = useState<ToDo[]>([]);
  const groupOfToDoSRef = useRef<HTMLInputElement[]>([]);
  const [currentIndexPosition, setCurrentIndexPosition] = useState<number>(0);
  const [relativeCursorPosition, setRelativeCursorPositon] = useState({
    axisX: 0,
    axisY: 0,
  });

  useEffect(() => {
    if (groupOfToDoS?.length === 0) {
      const addDefaultToDo: ToDo[] = groupOfToDoS.concat({
        name: "",
        toDoId: uuidv4(),
        status: false,
        label:
          "Escribe tu primer tarea y oprime la tecla Enter para la siguiente ;)",
        isMenuOpen: false,
      });
      setGroupOfToDoS(addDefaultToDo);
    }
  }, [groupOfToDoS]);

  useEffect(() => {
    const LocalstorageToDos = getToDoSInLocalStorage();

    if (LocalstorageToDos && LocalstorageToDos[0].name.length > 0) {
      setGroupOfToDoS(LocalstorageToDos);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      saveToDoSInLocalStorage(groupOfToDoS);
    }, 400);
    return () => {
      clearTimeout(debounce);
    };
  }, [groupOfToDoS]);

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      const normalizeIndexToBase1 = currentIndexPosition + 1;

      // index es el de inicio
      if (normalizeIndexToBase1 === groupOfToDoS.length) {
        const newToDo: ToDo = {
          name: "",
          toDoId: uuidv4(),
          status: false,
          label: ``,
          isMenuOpen: false,
        };
        setGroupOfToDoS((prevState) => [...prevState, newToDo]);
        setTimeout(() => focusNextInputToDo(index), 0); // Esperar a que se actualice el estado antes de enfocar
      } else {
        const updatedGroupOfToDoS = [...groupOfToDoS];
        updatedGroupOfToDoS.splice(index + 1, 0, {
          name: " ",
          toDoId: uuidv4(),
          status: false,
          label: " ",
          isMenuOpen: false,
        });
        setGroupOfToDoS(updatedGroupOfToDoS);
        setTimeout(() => focusNextInputToDo(index), 0);
      }
    }
    if (e.key === "ArrowUp") {
      focusPreviousInputToDo(index - 1);
    }
    if (e.key === "ArrowDown") {
      focusNextInputToDo(index);
    }
  };

  const addRefToElements = (ref: HTMLInputElement, index: number) => {
    groupOfToDoSRef.current[index] = ref;
  };

  const focusNextInputToDo = (index: number) => {
    if (groupOfToDoSRef.current[index + 1]) {
      groupOfToDoSRef.current[index + 1].focus();
    }
  };

  const focusPreviousInputToDo = (index: number) => {
    if (groupOfToDoSRef.current[index]) {
      groupOfToDoSRef.current[index].focus();
    }
  };

  const deleteToDo = (index: number) => {
    setGroupOfToDoS((prev) => {
      const groupOfToDoS = [...prev];
      groupOfToDoS.splice(index, 1);
      return groupOfToDoS;
    });
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const text = e.target.value;
    const inputCursorPosition = e.target.selectionEnd ?? 0;
    setRelativeCursorPositon((prev) => {
      return { ...prev, axisX: inputCursorPosition };
    });
    searchKeyLetterInText(text, index);
    setGroupOfToDoS((prev) => {
      const newGroupOfToDos = [...prev];

      // by index
      const toDo = newGroupOfToDos[index];
      newGroupOfToDos[index] = { ...toDo, name: text };
      return newGroupOfToDos;
    });
  };

  const checkCurrentToDoStatus = (index: number) => {
    const ToDo = groupOfToDoS[index];
    return ToDo;
  };

  const handleTaskStatus = (id: string) => {
    setGroupOfToDoS((prev) => {
      const newGroupOfToDos = prev.map((toDo) => {
        return id === toDo.toDoId ? { ...toDo, status: !toDo.status } : toDo;
      });
      return newGroupOfToDos;
    });
  };

  const handleToDoFocus = (currentToDoIndex: number) => {
    setCurrentIndexPosition(currentToDoIndex);
    setGroupOfToDoS((prev) => {
      const newGroupOfToDos = prev.map((toDo, index) => {
        return currentToDoIndex === index
          ? {
              ...toDo,
              name: toDo.name.length >= 2 ? toDo.name : ``,
              label: `Oprime la tecla " / " para abrir el menu de opciones`,
            }
          : toDo;
      });
      return newGroupOfToDos;
    });
  };

  const handleDeleteKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Delete" || e.key === "Del" || e.key === "Backspace") {
      if (checkCurrentToDoStatus(index).name.length === 0) {
        deleteToDo(index);
        setTimeout(() => focusPreviousInputToDo(index - 1), 0);
      }
    }
  };

  const handleToDoBlur = (currentToDoIndex: number) => {
    // handleCloseMenu(currentToDoIndex);
    setGroupOfToDoS((prev) => {
      const newGroupOfToDos = prev.map((toDo, index) => {
        return currentToDoIndex === index
          ? {
              ...toDo,
              name: toDo.name.length >= 1 ? toDo.name : ` `,
              label: "",
            }
          : toDo;
      });
      return newGroupOfToDos;
    });
  };

  const searchKeyLetterInText = (text: string, index: number) => {
    let regex = /\/\s/;
    if (text.includes("/"))
      return !regex.test(text) ? handleOpenMenu(index) : handleCloseMenu(index);
    handleCloseMenu(index);
  };

  const handleOpenMenu = (currentIndex: number) => {
    setGroupOfToDoS((prevToDos) => {
      const newToDos = prevToDos.map((toDo, index) => {
        return index === currentIndex ? { ...toDo, isMenuOpen: true } : toDo;
      });
      return newToDos;
    });
  };

  const handleCloseMenu = (currentIndex: number) => {
    setGroupOfToDoS((prevToDos) => {
      const newToDos = prevToDos.map((toDo, index) => {
        return index === currentIndex ? { ...toDo, isMenuOpen: false } : toDo;
      });
      return newToDos;
    });
  };
  console.log(relativeCursorPosition);

  return (
    <>
      <section className="w-full flex justify-center flex-col items-center pt-[10%]">
        <section>
          <h1 className="text-7xl font-bold text-white">Task Manager</h1>
          <section className="md:max-w-screen-md w-full  p-2 flex flex-col gap-1 mt-5">
            {groupOfToDoS &&
              groupOfToDoS.map((toDo, index) => (
                <div
                  key={toDo.toDoId}
                  className="flex items-center justify-start p-1 bg-#1c1917  rounded-md relative"
                >
                  {
                    // <span>{index}.</span>
                  }
                  <input
                    checked={toDo.status}
                    onChange={() => {
                      handleTaskStatus(toDo.toDoId);
                    }}
                    type="checkbox"
                    className="scale-125 mr-3"
                  />
                  <input
                    onKeyDown={(e) => {
                      handleDeleteKey(e, index);
                    }}
                    onBlur={() => {
                      handleToDoBlur(index);
                    }}
                    onFocus={() => {
                      handleToDoFocus(index);
                    }}
                    className={`px-1 py-1 w-full h-fit break-words  outline-none bg-[#1c1917] text-white  ${
                      toDo.status && "line-through text-gray-500"
                    }`}
                    onChange={(e) => {
                      handleUpdate(e, index);
                    }}
                    key={toDo.toDoId}
                    value={toDo.name}
                    placeholder={toDo.label && toDo.label}
                    onKeyUp={(e) => handleEnterKey(e, currentIndexPosition)}
                    ref={(ref) => {
                      if (ref) addRefToElements(ref, index);
                    }}
                  />
                  {toDo.isMenuOpen && (
                    <Menu axisx={relativeCursorPosition.axisX} />
                  )}
                </div>
              ))}
          </section>
        </section>
      </section>
    </>
  );
}
