"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { isLoggedStatus, logout } from "@/store/slices/to-dos/to-dos.slice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { useDeepCompareEffect, useEffectOnce } from "react-use";
import { useUserSessionStatus } from "@/hooks/use-session/use-session";
import { useEffect } from "react";

export default function Header() {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const { isUserLogged } = useAppSelector((state) => state.sessionState);

  useEffect(() => {
    if (data?.user) {
      dispatch(isLoggedStatus(true));
    } else {
      dispatch(isLoggedStatus(false));
    }
  }, [data?.user]);

  const handleLogout = async () => {
    dispatch(logout());
    await signOut();
  };
  return (
    <header className="flex w-full p-4 justify-end">
      <nav className="flex gap-8 text-slate-400">
        {isUserLogged ? (
          <button
            className="flex gap-2 items-center justify-center hover:text-[#e2e8f0]"
            onClick={handleLogout}
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
