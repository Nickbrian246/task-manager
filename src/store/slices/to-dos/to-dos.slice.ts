"use client";
import { ToDo } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { logUser, putToDos, getToDos, registerUser } from "./thunks";
import { saveAuthToken } from "@/utils";
import { getAuthToken, deleteAuthToken } from "@/utils";
import { signOut } from "next-auth/react";

interface SessionState {
  isLoading: boolean;
  loadingMessage: string;
  isUserLogged: boolean;
  toDos: ToDo[];
}

const initialState: SessionState = {
  isLoading: false,
  loadingMessage: "",
  isUserLogged: false,
  toDos: [],
};

const toDos = createSlice({
  name: "Session state",
  initialState,
  reducers: {
    logout: (state) => {
      state.isUserLogged = false;
      state.toDos = [];
    },
    setToDos: (state, { payload }) => {
      state.toDos = payload;
    },
    isLoggedStatus: (state, { payload }) => {
      state.isUserLogged = payload as boolean;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logUser.fulfilled, (state, { payload }) => {
      state.isUserLogged = true;
      state.isLoading = false;
      saveAuthToken(payload.metaData.accessToken);
    });
    builder.addCase(logUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isUserLogged = true;

      saveAuthToken(payload.data.accessToken);
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getToDos.pending, (state) => {
      state.isLoading = true;
      state.loadingMessage = "Cargando To Dos.";
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
      state.loadingMessage = "Guardando";
    });
    builder.addCase(putToDos.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(putToDos.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export const { logout, setToDos, isLoggedStatus } = toDos.actions;

export default toDos.reducer;
