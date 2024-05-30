"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logUser } from "@/store/slices/to-dos/thunks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { AuthLogin } from "./interfaces/inputList";
import { inputList } from "./utils/inputList";
import GoogleAuthButton from "../components/google";
import { signIn } from "next-auth/react";

export default function Login() {
  const [userLogData, setUserLogData] = useState<AuthLogin>({
    email: "",
    password: "",
  });
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.sessionState);
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserLogData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("sign-in", {
      email: userLogData.email,
      password: userLogData.password,
    });
  };

  return (
    <form
      className="flex flex-col p-7 max-w-3xl rounded-md gap-4 border border-white bg-[#1c1917] "
      method="dialog"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-bold text-white text-center ">
        Iniciar sesion
      </h2>
      {inputList.map((inputData) => (
        <div className="flex flex-col w-full" key={inputData.id}>
          <label className="text-white" htmlFor={inputData.id}>
            {inputData.name}
          </label>
          <div className="w-full flex items-center justify-center">
            <input
              type={
                inputData.id === "password" && !hiddenPassword
                  ? "password"
                  : "text"
              }
              className="p-2 rounded-lg border-2 border-[#6b7280] w-full"
              id={inputData.id}
              name={inputData.id}
              placeholder={inputData.name}
              onChange={handleInput}
            />
            {inputData.id === "password" && (
              <span
                title={hiddenPassword ? "Ocultar contraseña" : "Ver contraseña"}
                onClick={() => {
                  setHiddenPassword((prev) => !prev);
                }}
                className="text-white text-2xl ml-2 "
              >
                {hiddenPassword ? <LuEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
        </div>
      ))}
      <button className="p-4 active:bg-slate-700 bg-slate-400 rounded-md text-white md:m-auto md:px-10 relative flex justify-center items-center">
        {isLoading ? "Cargando" : " Iniciar sesión"}
        {isLoading && (
          <span className="absolute animate-spin  text-xl">
            <AiOutlineLoading3Quarters className="text-black" />
          </span>
        )}
      </button>
      <nav className="flex gap-2 text-white">
        ¿No tienes una cuenta?
        <Link
          className="underline text-white hover:text-slate-400"
          href={"/register"}
          replace={true}
        >
          Regístrate{" "}
        </Link>
      </nav>
      <GoogleAuthButton title="Iniciar session" />
    </form>
  );
}
