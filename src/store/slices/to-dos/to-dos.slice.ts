import { ToDo } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { logUser, putToDos, getToDos } from "./thunks";
import { saveAuthToken } from "@/utils";
import { getAuthToken, deleteAuthToken } from "@/utils";

interface SessionState {
  isLoading: boolean;
  isUserLogged: boolean;
  toDos: ToDo[];
}

const initialState: SessionState = {
  isLoading: false,
  isUserLogged: !!getAuthToken(),
  toDos: [],
};

const toDos = createSlice({
  name: "Session state",
  initialState,
  reducers: {
    logout: (state) => {
      deleteAuthToken();
      state.isUserLogged = false;
      state.toDos = [];
    },
    setToDos: (state, { payload }) => {
      state.toDos = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logUser.fulfilled, (state, { payload }) => {
      state.isUserLogged = true;
      saveAuthToken(payload.metaData.accessToken);
    });
    builder.addCase(logUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getToDos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getToDos.fulfilled, (state, { payload }) => {
      state.toDos = payload.data.toDos;
      state.isLoading = false;
    });
    builder.addCase(getToDos.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(putToDos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(putToDos.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(putToDos.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export const { logout, setToDos } = toDos.actions;

export default toDos.reducer;
