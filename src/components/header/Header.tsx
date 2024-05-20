"use client";
import Link from "next/link";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { isLoggedStatus, logout } from "@/store/slices/to-dos/to-dos.slice";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { useEffectOnce } from "react-use";

export default function Header() {
  const dispatch = useAppDispatch();
  const { isUserLogged } = useAppSelector((state) => state.sessionState);
  useEffectOnce(() => {
    dispatch(isLoggedStatus());
  });
  return (
    <header className="flex w-full p-4 justify-end">
      <nav className="flex gap-8 text-slate-400">
        {isUserLogged ? (
          <button
            className="flex gap-2 items-center justify-center hover:text-[#e2e8f0]"
            onClick={() => {
              dispatch(logout());
            }}
          >
            <IoIosLogOut />
            Cerrar sesión{" "}
          </button>
        ) : (
          <>
            <Link
              className="hover:text-[#e2e8f0] flex justify-center items-center gap-2"
              href={"/login"}
            >
              <IoIosLogIn />
              Iniciar sesión{" "}
            </Link>
            <Link
              className="hover:text-[#e2e8f0] flex justify-center items-center gap-2"
              href={"/register"}
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
