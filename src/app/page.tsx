"use client";

import { defaultToDo } from "@/components/default-to-do/utils/default-to-do";
import Header from "@/components/header/Header";
import Loading from "@/components/loading";
import ToDoManager from "@/components/to-do-manager/to-do-manager";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getToDos, putToDos } from "@/store/slices/to-dos/thunks";
import { setToDos } from "@/store/slices/to-dos/to-dos.slice";
import {
  getToDoSInLocalStorage,
  saveToDoSInLocalStorage,
} from "@/utils/localstorage";
import { ToDo } from "@prisma/client";
import { useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [groupOfToDoS, setGroupOfToDoS] = useState<ToDo[]>(defaultToDo);
  const groupOfToDoSRef = useRef<HTMLInputElement[]>([]);
  const [currentIndexPosition, setCurrentIndexPosition] = useState<number>(0);
  const controls = useDragControls();
  const { isUserLogged, toDos } = useAppSelector((state) => state.sessionState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUserLogged) {
      dispatch(getToDos());
    } else {
      const localStorageToDos = getToDoSInLocalStorage();
      localStorageToDos?.length > 1 &&
        localStorageToDos[0].name.length > 1 &&
        setToDos(localStorageToDos);
    }
  }, [isUserLogged]);

  useEffect(() => {
    setGroupOfToDoS(toDos);
  }, [toDos]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (isUserLogged) {
        dispatch(putToDos(groupOfToDoS));
      } else {
        saveToDoSInLocalStorage(groupOfToDoS);
      }
    }, 3000);
    return () => {
      clearTimeout(debounce);
    };
  }, [groupOfToDoS]);

  return (
    <>
      <Header />
      <section className="w-full flex justify-center flex-col items-center pt-[5%]">
        <section>
          <h1 className="text-7xl font-bold text-white text-center">
            Task Manager
          </h1>
          <ToDoManager
            controls={controls}
            currentIndexPosition={currentIndexPosition}
            groupOfToDoS={groupOfToDoS}
            groupOfToDoSRef={groupOfToDoSRef}
            setCurrentIndexPosition={setCurrentIndexPosition}
            setGroupOfToDoS={setGroupOfToDoS}
          />
        </section>
      </section>
      <Loading />
    </>
  );
}
