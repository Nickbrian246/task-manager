import React from "react";
import Modal from "@/components/modal";
import RegisterModule from "@/components/auth/register";

export default function Register() {
  return (
    <Modal className="p-4 absolute">
      <RegisterModule />
    </Modal>
  );
}
