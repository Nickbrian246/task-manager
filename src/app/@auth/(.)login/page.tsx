"use client";
import React from "react";
import Modal from "@/components/modal";
import LoginModule from "@/components/auth/login";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  return (
    <Modal close={() => router.back()}>
      <LoginModule />
    </Modal>
  );
}
