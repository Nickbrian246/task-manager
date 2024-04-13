"use client";

import { handleDeleteKey, handleEnterKey } from "@/utils/key-actions";
import {
  getToDoSInLocalStorage,
  saveToDoSInLocalStorage,
} from "@/utils/localstorage";
import { handleTaskStatus } from "@/utils/utils";
import { handleUpdate } from "@/utils/update-and-delete-to-do";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiGridVertical } from "react-icons/bi";
import { Reorder, useDragControls } from "framer-motion";
import Register from "@/components/auth/register";
import Modal from "@/components/modal";
import Login from "@/components/auth/login";

export interface ToDo {
  name: string;
  toDoId: string;
  status: boolean;
  label?: string;
}

export default function Home() {
  const [groupOfToDoS, setGroupOfToDoS] = useState<ToDo[]>([]);
  const groupOfToDoSRef = useRef<HTMLInputElement[]>([]);
  const [currentIndexPosition, setCurrentIndexPosition] = useState<number>(0);
  const controls = useDragControls();

  useEffect(() => {
    if (groupOfToDoS?.length === 0) {
      const addDefaultToDo: ToDo[] = groupOfToDoS.concat({
        name: "",
        toDoId: uuidv4(),
        status: false,
        label:
          "Escribe tu primer tarea y oprime la tecla Enter para la siguiente ;)",
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

  const addRefToElements = (ref: HTMLInputElement, index: number) => {
    groupOfToDoSRef.current[index] = ref;
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

  const handleToDoBlur = (currentToDoIndex: number) => {
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

  return (
    <>
      <section className="w-full flex justify-center flex-col items-center pt-[10%]">
        <section>
          <h1 className="text-7xl font-bold text-white text-center">
            Task Manager
          </h1>
          <section className="md:max-w-screen-md w-full  p-2 flex flex-col gap-1 mt-5">
            <Reorder.Group
              axis="y"
              values={groupOfToDoS}
              onReorder={setGroupOfToDoS}
            >
              {groupOfToDoS.map((toDo, index) => (
                <Reorder.Item key={toDo.toDoId} value={toDo}>
                  <div
                    key={toDo.toDoId}
                    className="flex items-center justify-start p-1 bg-#1c1917  rounded-md gap-3"
                  >
                    <span
                      onPointerDown={(e) => controls.start(e)}
                      className="text-[#525252] scale-150 cursor-grabbing hover:text-[#e2e8f0] hover:bg-[#262626] rounded"
                    >
                      <BiGridVertical />
                    </span>
                    {
                      // <span>{index}.</span>
                    }

                    <input
                      checked={toDo.status}
                      onChange={() => {
                        handleTaskStatus({ id: toDo.toDoId, setGroupOfToDoS });
                      }}
                      type="checkbox"
                      className="scale-125 "
                    />
                    <input
                      onKeyDown={(e) => {
                        handleDeleteKey({
                          e,
                          groupOfToDoS,
                          groupOfToDoSRef,
                          index,
                          setGroupOfToDoS,
                        });
                      }}
                      onBlur={() => {
                        handleToDoBlur(index);
                      }}
                      onFocus={() => {
                        handleToDoFocus(index);
                      }}
                      className={`
                      px-1 
                      py-1 
                      w-full
                      h-auto  
                      outline-none 
                      bg-[#1c1917] 
                      text-white  ${
                        toDo.status && "line-through text-zinc-400"
                      }`}
                      onChange={(e) => {
                        handleUpdate({ e, index, setGroupOfToDoS });
                      }}
                      key={toDo.toDoId}
                      value={toDo.name}
                      placeholder={toDo.label && toDo.label}
                      onKeyUp={(e) =>
                        handleEnterKey({
                          e,
                          currentIndexPosition,
                          groupOfToDoS,
                          groupOfToDoSRef,
                          index,
                          setGroupOfToDoS,
                        })
                      }
                      ref={(ref) => {
                        if (ref) addRefToElements(ref, index);
                      }}
                    />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </section>
        </section>
        {/* <Modal className="flex-col    ">
          <div className="bg-[#1c1917] rounded-lg p-2 border border-[#9ca3af]">
            <Login />
          </div>
        </Modal> */}
      </section>
    </>
  );
}
