"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const SessionAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;
