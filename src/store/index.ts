import { configureStore } from "@reduxjs/toolkit";
import toDos from "./slices/to-dos/to-dos.slice";

export const store = configureStore({
  reducer: { toDos },
});
