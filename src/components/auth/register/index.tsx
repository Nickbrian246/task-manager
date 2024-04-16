"use client";
import React, { ChangeEvent, useState } from "react";
import { inputList } from "./utils/inputList";
import { PasswordRules } from "@/components/passwordRules/password-rules";
import { useValidatePassword } from "@/hooks/useValidatePassword";
import { FaEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
interface RegisterFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export default function Register() {
  const [registerInputData, setRegisterInputData] = useState<RegisterFormData>({
    email: "",
    lastName: "",
    name: "",
    password: "",
  });
  const [isWriting, setIsWriting] = useState(false);
  const [hiddePassword, setHiddenPassword] = useState(false);

  const {
    atLeastOneUppercase,
    checkPassword,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    isLengthCorrect,
  } = useValidatePassword();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "password") {
      setIsWriting(true);
      checkPassword(value);
    }
    setRegisterInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <form
      className="flex flex-col p-7 max-w-3xl gap-2 bg-[#1c1917]  border border-white rounded-md z-20  "
      method="dialog"
    >
      <h2 className="text-4xl font-bold text-white text-center ">Registrate</h2>
      {inputList.map((inputData) => (
        <div className="flex flex-col w-full" key={inputData.id}>
          <label className="text-white" htmlFor={inputData.id}>
            {inputData.name}
          </label>
          <div className="w-full flex items-center justify-center">
            <input
              type={
                inputData.id === "password" && !hiddePassword
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
                title={hiddePassword ? "Ocultar contraseña" : "Ver contraseña"}
                onClick={() => {
                  setHiddenPassword((prev) => !prev);
                }}
                className="text-white text-2xl ml-2 "
              >
                {hiddePassword ? <LuEye /> : <FaEyeSlash />}
              </span>
            )}
          </div>
        </div>
      ))}
      <PasswordRules
        atLeastOneUppercase={atLeastOneUppercase}
        hasNoWhiteSpace={hasNoWhiteSpace}
        hasOneEspecialCharacter={hasOneEspecialCharacter}
        isLengthCorrect={isLengthCorrect}
        isWriting={isWriting}
      />
      <button className="p-4 bg-slate-400 rounded-md text-white md:m-auto md:px-10">
        Registrase
      </button>
      <nav className="flex gap-2 text-white">
        ¿No tienes una cuenta?
        <Link
          className="underline text-white hover:text-slate-400"
          href={"/login"}
          replace={true}
        >
          Iniciar sesión{" "}
        </Link>
      </nav>
    </form>
  );
}
