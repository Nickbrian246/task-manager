import {
  AuthLogin,
  AuthRegister,
} from "@/components/auth/login/interfaces/inputList";
import {
  deleteToDosInLocalStorage,
  getAuthToken,
  getToDoSInLocalStorage,
} from "@/utils";
import { ToDo } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiSuccessResponseNoMetaData,
  ApiSuccessResponse,
  AuthMetaData,
  ResponseData,
} from "@/types/api-responses-interface";

export const putToDos = createAsyncThunk<
  ApiSuccessResponseNoMetaData<ResponseData>,
  ToDo[],
  {
    rejectValue: any;
  }
>("putToDos/putToDos", async (toDos, { rejectWithValue, fulfillWithValue }) => {
  const token = getAuthToken();
  try {
    const response = await fetch("http://localhost:3000/api/todo-task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toDos),
    });
    const res = await response.json();
    fulfillWithValue(res);
    return res;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const getToDos = createAsyncThunk<
  ApiSuccessResponseNoMetaData<ResponseData>
>("getToDos", async (_, { fulfillWithValue, rejectWithValue }) => {
  try {
    const token = getAuthToken();
    const response = await fetch("http://localhost:3000/api/todo-task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return fulfillWithValue(res);
  } catch (error) {
    console.log(error);
  }
});

export const logUser = createAsyncThunk<
  ApiSuccessResponse<ResponseData, AuthMetaData>,
  AuthLogin
>(
  "logUser/logUser",
  async (user, { fulfillWithValue, dispatch, rejectWithValue }) => {
    try {
      const req = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await req.json();

      return fulfillWithValue(res);
    } catch (error) {
      rejectWithValue(error);
      console.log(error);
    }
  }
);

export const registerUser = createAsyncThunk<AuthRegister, ToDo[]>(
  "registerUser/registerUser",
  async (authRegisterData, { fulfillWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authRegisterData),
      });
      const data = await res.json();
      fulfillWithValue(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
