import { InputList } from "../interfaces/inputList";
import { v4 } from "uuid";
export const inputList: InputList[] = [
  {
    name: "Nombre",
    label: "Nombre",
    id: "name",
  },
  {
    name: "Apellido",
    label: "Apellido",
    id: "familyName",
  },
  {
    name: "Correo",
    label: "Correo",
    id: "email",
  },
  {
    name: "Contraseña",
    label: "Contraseña",
    id: "password",
  },
];
