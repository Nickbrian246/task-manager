import { ToDo } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface SessionState {
  isLoading: boolean;
  toDos: ToDo[];
  isUserLogged: boolean;
}

const initialState: SessionState = {
  isLoading: false,
  toDos: [],
  isUserLogged: false,
};

const toDos = createSlice({
  name: "toDos",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { logout } = toDos.actions;

export default toDos.reducer;
