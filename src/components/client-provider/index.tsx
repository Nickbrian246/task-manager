"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ClientProvider = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);
