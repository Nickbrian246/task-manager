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
  name: z.string(),
  familyName: z.string(),
  email: z.string().email({ message: "Enter valid emial" }),
  password: z.string(),
});
