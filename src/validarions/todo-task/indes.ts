import z from "zod";

export const TodoTaskSchema = z.object({
  toDoId: z.string(),
  name: z.string(),
  status: z.boolean(),
  label: z.string(),
});

export const ToDoSSchema = z.array(TodoTaskSchema).optional();
