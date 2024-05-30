"use client";
import { PasswordRules } from "@/components/passwordRules/password-rules";
import { useAppDispatch } from "@/hooks/redux";
import { useValidatePassword } from "@/hooks/useValidatePassword";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { AuthRegister } from "../login/interfaces/inputList";
import { inputList } from "./utils/inputList";

export default function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [registerInputData, setRegisterInputData] = useState<AuthRegister>({
    email: "",
    familyName: "",
    name: "",
    password: "",
  });
  const [isWriting, setIsWriting] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(false);

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

  const handleSubmitButton: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    // dispatch(registerUser(registerInputData));
    await signIn("register", { ...registerInputData });
  };
  return (
    <form
      className="flex flex-col p-7 max-w-3xl gap-2 bg-[#1c1917]  border border-white rounded-md z-20  "
      method="dialog"
      onSubmit={handleSubmitButton}
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
                inputData.id === "password" && !isHidePassword
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
                title={isHidePassword ? "Ocultar contraseña" : "Ver contraseña"}
                onClick={() => {
                  setIsHidePassword((prev) => !prev);
                }}
                className="text-white text-2xl ml-2 "
              >
                {isHidePassword ? <LuEye /> : <FaEyeSlash />}
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
