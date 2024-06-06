import { z } from "zod";

export const ToDoSchema = z.object({
  toDoId: z.string(),
  name: z.string(),
  label: z.string(),
  userId: z.string(),
});
export const UserCredentialsSchema = z.object({
  email: z.string().min(5),
  password: z.string().min(8),
});

export const UserSchema = z.object({
  name: z.string().min(4, { message: "Debe tener al menos 4 letras " }),
  familyName: z.string().min(4, { message: "Debe tener al menos 4 letras " }),
  email: z.string().email({ message: "Ingrese un email valido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[\?\*\@\#\$\%\^\&\!\(\)]/, {
      message:
        "La contraseña debe contener al menos un carácter especial como ?*.",
    })
    .refine((val) => !/\s/.test(val), {
      message: "La contraseña no debe contener espacios.",
    }),
});
