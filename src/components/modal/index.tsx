import React, { ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
  close?: () => void;
}

export default function Modal({ children, className, close }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <dialog
      ref={dialogRef}
      style={{ background: "none" }}
      className={twMerge(
        " w-full h-full flex   justify-center items-center ",
        className
      )}
    >
      {children}
    </dialog>
  );
}
