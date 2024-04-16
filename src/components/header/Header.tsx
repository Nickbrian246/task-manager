import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex w-full p-4 justify-end">
      <nav className="flex gap-8 text-slate-400">
        <Link className="hover:text-slate-50" href={"/login"}>
          Iniciar sesión{" "}
        </Link>
        <Link className="hover:text-slate-50" href={"/register"}>
          Registrarse
        </Link>
      </nav>
    </header>
  );
}
