"use client";
import React from "react";
import Modal from "@/components/modal";
import RegisterModule from "@/components/auth/register";
import { useRouter } from "next/navigation";
export default function Register() {
  const router = useRouter();
  return (
    <Modal close={() => router.back()}>
      <RegisterModule />
    </Modal>
  );
}
