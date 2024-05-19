import { NextResponse } from "next/server";
import { ApiFailureResponse } from "./api-responses-interface";

export interface CustomNextApiResponse<Response>
  extends NextResponse<Response | ApiFailureResponse> {}
