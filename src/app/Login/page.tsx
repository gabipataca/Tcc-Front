"use client";

import React from "react";
import { Mail, Lock } from "lucide-react";
import Input from "@/components/shared/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface LoginInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen">
      {/* Seção da esquerda (Login) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-8 text-[#4f85a0]">LOGIN</h1>

        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
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

            {/* Campo Senha */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  label="Senha"
                  error={fieldState.error}
                  icon={<Lock className="text-gray-500 mr-2" size={20} />}
                  {...field}
                />
              )}
            />

            {/* Opções adicionais */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Lembre-me
              </label>
              <a href="#" className="text-[#4f85a0] text-sm">Esqueceu a senha?</a>
            </div>

            {/* Botão Entrar */}
            <button className="w-full bg-[#4f85a0] text-white p-2 rounded-lg hover:bg-[#42738e] transition">
              Entrar
            </button>
          </form>

          {/* Link para cadastro */}
          <p className="mt-4 text-sm text-center">
            Não tem uma conta? <a href="#" className="text-[#4f85a0]">Inscreva-se</a>
          </p>
        </div>
      </div>

      {/* Seção da direita (Logo + Texto "FHO") */}
      <div className="w-1/2 bg-[#4f85a0] flex flex-col justify-center items-center">
        <img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
        <p className="text-white text-[60px] font-bold tracking-wider ml-10">FHO</p>
      </div>
    </div>
  );
};

export default Login;
