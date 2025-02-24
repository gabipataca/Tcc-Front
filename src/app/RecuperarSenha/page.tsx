"use client";

import React from "react";
import { Mail } from "lucide-react";
import Input from "@/components/shared/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ResetPasswordInputs {
  email: string;
}

const RedefinirSenha: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen">
      {/* Seção da esquerda (Logo + Texto "FHO") */}
      <div className="w-1/2 bg-[#4f85a0] flex flex-col justify-center items-center">
        <img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
        <p className="text-white text-[60px] font-bold tracking-wider ml-10">FHO</p>
      </div>

      {/* Seção da direita (Redefinir Senha) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-8 text-[#4f85a0]">REDEFINIR SENHA</h1>

        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {/* Campo E-mail */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  label="E-mail"
                  error={fieldState.error}
                  icon={<Mail className="text-gray-500 mr-2" size={20} />}
                  {...field}
                />
              )}
            />

            {/* Botão Recuperar */}
            <div className="flex justify-center">
              <button className="w-1/2 bg-[#4f85a0] text-white p-2 rounded-lg hover:bg-[#42738e] transition mt-4">
                Recuperar senha
              </button>
            </div>
          </form>

          {/* Link para login */}
          <p className="mt-4 text-sm text-center">
            Lembrou a senha? <a href="#" className="text-[#4f85a0]">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RedefinirSenha;
