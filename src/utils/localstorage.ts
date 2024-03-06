import { ToDo } from "@/app/page";
export function saveToDoSInLocalStorage(toDO: ToDo[]) {
  localStorage.setItem("todo", JSON.stringify(toDO));
}
export function getToDoSInLocalStorage(): ToDo[] {
  const toDos = localStorage.getItem("todo");
  return toDos ? JSON.parse(toDos) : undefined;
}
export function deleteEntityInLocalStorage(entityName: string) {
  return localStorage.removeItem(entityName);
}
