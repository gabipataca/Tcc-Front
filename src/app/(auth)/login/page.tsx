"use client"

import Button from "@/components/_ui/Button";
import Input from "@/components/_ui/Input";
import PageLink from "@/components/_ui/PageLink";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface LoginInputs {
  RA: string;
  password: string;
}

const Login: React.FC = () => {

  const {
      register,
      handleSubmit,
      control,
      reset,
      watch,
      formState: { errors }
    } = useForm<LoginInputs>({
      defaultValues: {
        RA: "",
        password: ""
      }
    });
  
    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
      console.log(data);
    }

  return (
    <div className="flex h-screen">
      {/* Seção da esquerda (Login) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-8 text-[#4f85a0]">LOGIN</h1>

        <div className="w-full max-w-sm">
          {/* Campo RA */}
          <Controller
            name="RA"
            control={control}
            render={({field, fieldState}) => (
              <Input
                type="text"
                placeholder="Digite o RA do aluno"
                label="RA"
                error={fieldState.error}
                {...field}
              />
            )}
          />

          {/* Campo Senha */}
          <Controller
            name="password"
            control={control}
            render={({field, fieldState}) => (
              <Input
                type="password"
                placeholder="Digite a senha do usuário"
                label="Senha"
                autocomplete="current-password"
                error={fieldState.error}
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
          <Button rounded={true} fullWidth={true}>
            Entrar
          </Button>

          {/* Link para inscrição */}
          <p className="mt-4 text-sm text-center">
            Não tem uma conta? <PageLink href="/cadastro">Inscreva-se</PageLink>
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
