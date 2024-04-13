import { ChangeEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { inputList } from "./utils/inputList";

interface RegisterFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [registerInputData, setRegisterInputData] = useState<RegisterFormData>({
    email: "",
    password: "",
  });
  const [hiddenPassword, setHiddenPassword] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegisterInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <form className="flex flex-col p-7 max-w-3xl gap-4 " method="dialog">
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
      <button className="p-4 bg-slate-400 rounded-md text-white md:m-auto md:px-10">
        {" Iniciar sesión"}
      </button>
    </form>
  );
}
