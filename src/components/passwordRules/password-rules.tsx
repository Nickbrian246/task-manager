"use client";
interface Props {
  isWriting: boolean;
  isLengthCorrect: boolean;
  atLeastOneUppercase: boolean;
  hasOneEspecialCharacter: boolean;
  hasNoWhiteSpace: boolean;
}

export function PasswordRules({
  atLeastOneUppercase,
  hasNoWhiteSpace,
  hasOneEspecialCharacter,
  isLengthCorrect,
  isWriting,
}: Props) {
  return (
    <>
      <div className="flex gap-1  flex-wrap max-w-[400px]">
        <span
          className={`text-sm  ${
            isWriting
              ? isLengthCorrect
                ? "text-[#22c55e]"
                : "text-red-400"
              : "text-[#cbd5e1]"
          }`}
        >
          * La contraseña debe tener al menos 8 caracteres.
        </span>
        <span
          className={`text-sm  ${
            isWriting
              ? atLeastOneUppercase
                ? "text-[#22c55e]"
                : "text-red-400"
              : "text-[#cbd5e1]"
          }`}
        >
          * La contraseña debe contener al menos una letra mayúscula.
        </span>
        <span
          className={`text-sm  ${
            isWriting
              ? hasOneEspecialCharacter
                ? "text-[#22c55e]"
                : "text-red-400"
              : "text-[#cbd5e1]"
          }`}
        >
          * La contraseña debe contener al menos un carácter especial como ?*.
        </span>
        <span
          className={`text-sm  ${
            isWriting
              ? hasNoWhiteSpace
                ? "text-[#22c55e]"
                : "text-red-400"
              : "text-[#cbd5e1]"
          }`}
        >
          * La contraseña no debe contener espacios.
        </span>
      </div>
    </>
  );
}
