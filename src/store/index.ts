import { configureStore } from "@reduxjs/toolkit";
import sessionState from "./slices/to-dos/to-dos.slice";

export const store = configureStore({
  reducer: { sessionState },
});
