"use client";
import { ToDo } from "@prisma/client";
import { Auth } from "@/interfaces/auth";
import { putToDos } from "@/services/to-do-s/to-do";
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

export function deleteToDosInLocalStorage() {
  localStorage.removeItem("todo");
}

export function saveAuthToken(accessToken: string) {
  localStorage.setItem("authToken", accessToken);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

export function deleteAuthToken() {
  return localStorage.removeItem("authToken");
}

//todo limpiar localstorage una vez se hayan guardado correctamente los todos
export async function saveLocalStorageToDosInDataBase(): Promise<ToDo[]> {
  const token = getAuthToken();
  const localStorageToDos = getToDoSInLocalStorage();
  try {
    const res = await putToDos(localStorageToDos);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
