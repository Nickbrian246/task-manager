"use client";
import { PasswordRules } from "@/components/passwordRules/password-rules";
import { useValidatePassword } from "@/hooks/useValidatePassword";
import { UserSchema } from "@/validarions/auth/user";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { ZodError, ZodIssue } from "zod";
import GoogleAuthButton from "../components/google";
import { AuthRegister } from "../login/interfaces/inputList";
import { inputList } from "./utils/inputList";

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [zodErrors, setZodErrors] = useState<ZodIssue[] | null>(null);
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

  const handleSubmitButton: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const userData = UserSchema.parse(registerInputData);

      setIsLoading(true);
      signIn("register", { ...userData, redirect: false })
        .then((res) => {
          if (res?.ok) {
            router.back();
            return res;
          }
          if (res?.error === "P2002") {
            setZodErrors([
              {
                message: "Esta dirección de correo ya existe.",
                code: "custom",
                path: ["email"],
              },
            ]);
          } else {
            setErrorMessage(`${res?.error}`);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      if (error instanceof ZodError) {
        setZodErrors(error.issues);
        setErrorMessage("Favor de completar los campos faltantes");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col p-7 max-w-3xl gap-2 bg-[#1c1917]  border border-white rounded-md z-20  "
        method="dialog"
        onSubmit={handleSubmitButton}
      >
        <h2 className="text-4xl font-bold text-white text-center ">
          Regístrate
        </h2>
        {errorMessage && (
          <p className="text-base text-center text-red-400">{errorMessage}</p>
        )}
        {inputList.map((inputData) => (
          <div className="flex flex-col w-full gap-1" key={inputData.id}>
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
                  title={
                    isHidePassword ? "Ocultar contraseña" : "Ver contraseña"
                  }
                  onClick={() => {
                    setIsHidePassword((prev) => !prev);
                  }}
                  className="text-white text-2xl ml-2 "
                >
                  {isHidePassword ? <LuEye /> : <FaEyeSlash />}
                </span>
              )}
            </div>
            {zodErrors && (
              <p className="text-sm text-red-400">
                {zodErrors
                  .filter(
                    (e) =>
                      e.path[0] === inputData.id && e.path[0] !== "password"
                  )
                  .map((e) => e.message)
                  .join(", ")}
              </p>
            )}
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
          {isLoading ? "Cargando..." : " Registrase"}
          {isLoading && (
            <span className="absolute animate-spin  text-xl">
              <AiOutlineLoading3Quarters className="text-black" />
            </span>
          )}
        </button>
        <nav className="flex gap-2 mb-2 text-white">
          ¿No tienes una cuenta?
          <Link
            className="underline text-white hover:text-slate-400"
            href={"/login"}
            replace={true}
          >
            Iniciar sesión{" "}
          </Link>
        </nav>
        <GoogleAuthButton title="Continuar con Google" />
      </form>
    </>
  );
}
