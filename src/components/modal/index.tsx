"use client";
import React, { ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { IoCloseCircle } from "react-icons/io5";
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
      style={{ background: "none", zIndex: "10" }}
      className={twMerge(
        " w-full h-full flex   justify-center items-center ",
        className
      )}
    >
      <div className="relative max-h-[600px]">
        {children}
        <button onClick={close}>
          <IoCloseCircle className="text-2xl text-white scale-150 absolute top-0 right-0 " />
        </button>
      </div>
    </dialog>
  );
}
