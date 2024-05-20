import { ToDo } from "@prisma/client";
import { ZodIssue } from "zod";

export interface ApiSuccessResponse<T, V> {
  data: T;
  metaData: V;
}

export interface ApiSuccessResponseNoMetaData<T> {
  data: T;
}

export interface ApiFailureResponse {
  message: string;
  errors?: ZodIssue[];
}

export interface AuthMetaData {
  accessToken: string;
}

export interface ResponseData {
  toDos: ToDo[];
}

export interface RegisterResponseData {
  accessToken: string;
}
