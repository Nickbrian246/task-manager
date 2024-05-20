"use client";
import { handleDeleteKey, handleEnterKey } from "@/utils/key-actions";
import { handleUpdate } from "@/utils/update-and-delete-to-do";
import {
  handleTaskStatus,
  updateToDoLabel,
  updateNameWhiteSpaceOnBlur,
  updateNameWhiteSpaceOnFocus,
} from "@/utils/utils";
import { ToDo } from "@prisma/client";
import { DragControls, Reorder } from "framer-motion";
import React, { MutableRefObject, SetStateAction } from "react";
import { BiGridVertical } from "react-icons/bi";

interface Props {
  groupOfToDoS: ToDo[];
  setGroupOfToDoS: React.Dispatch<SetStateAction<ToDo[]>>;
  setCurrentIndexPosition: React.Dispatch<SetStateAction<number>>;
  currentIndexPosition: number;
  groupOfToDoSRef: MutableRefObject<HTMLInputElement[]>;
  controls: DragControls;
}

const ToDoManager = ({
  currentIndexPosition,
  groupOfToDoS,
  groupOfToDoSRef,
  setCurrentIndexPosition,
  setGroupOfToDoS,
  controls,
}: Props) => {
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
              name: updateNameWhiteSpaceOnFocus(toDo.name),
              label: updateToDoLabel(index),
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
              name: updateNameWhiteSpaceOnBlur(index, toDo.name),
              label: updateToDoLabel(index),
            }
          : toDo;
      });
      return newGroupOfToDos;
    });
  };

  return (
    <section className="md:max-w-screen-md w-full  p-2 flex flex-col gap-1 mt-5">
      <Reorder.Group axis="y" values={groupOfToDoS} onReorder={setGroupOfToDoS}>
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
                text-white  
                ${toDo.status && "line-through text-zinc-400"}
                `}
                onChange={(e) => {
                  handleUpdate({ e, index, setGroupOfToDoS });
                }}
                key={toDo.toDoId}
                value={toDo.name}
                placeholder={toDo.label ?? "hello"}
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
  );
};

export default ToDoManager;
