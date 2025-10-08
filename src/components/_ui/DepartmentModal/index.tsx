"use client";

import React, { useState } from "react";
import Modal from "@/components/_ui/Modal";
import Input from "@/components/_ui/Input";

interface DepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { departamento: string; email: string }) => void;
  initialData: { departamento: string; email: string };
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  open,
  onClose,
  onConfirm,
  initialData,
}) => {
  const [departamento, setDepartamento] = useState(initialData.departamento);
  const [email, setEmail] = useState(initialData.email);

  const buttonClasses = "bg-[#4F85A6] hover:bg-[#3b6e8a] text-white";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Alterar informações"
      description="Altere seus dados"
      hasConfirmButton
      hasCancelButton
      confirmButtonContent="Salvar alterações"
      cancelButtonContent="Cancelar"
      onConfirm={() => onConfirm({ departamento, email })}
      onCancel={onClose}
      center
      confirmButtonClass={buttonClasses}
      cancelButtonClass={buttonClasses}
      bodyContent={
        <div className="flex flex-col gap-4 px-2 py-1">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Departamento
            </label>
            <Input
              type="text"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="mt-1"
              placeholder="Digite o nome do departamento"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="Digite o e-mail institucional"
            />
          </div>
        </div>
      }
    />
  );
};

export default DepartmentModal;