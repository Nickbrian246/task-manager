import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "hola" }, { status: 200 });
}
