"use client";

import Button from "@/components/_ui/Button";
import Input from "@/components/_ui/Input";
import PageLink from "@/components/_ui/PageLink";
import ScreenContainer from "@/components/_ui/ScreenContainer";
import TitleLarge from "@/components/_ui/TitleLarge";
import LoginContainer from "@/components/pages/login/components/LoginContainer";
import LogoContainer from "@/components/pages/login/components/LogoContainer";
import useLogin from "@/components/pages/login/hooks/useLogin";
import { IdCard, Lock } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

const Login: React.FC = () => {
    const { control, handleSubmit, onSubmit, formError, isLoading } =
        useLogin();

    return (
        <ScreenContainer>
            {/* Seção da esquerda (Login) */}
            <LoginContainer>
                <TitleLarge className="mb-8">LOGIN</TitleLarge>
                <form
                    className="w-full flex flex-col gap-2 justify-center items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {formError && (
                        <p className="w-full max-w-sm text-red-700 mb-4 text-center">
                            {formError}
                        </p>
                    )}

                    <div className="w-full max-w-sm flex flex-col gap-2">
                        {/* Campo RA */}
                        <Controller
                            name="ra"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="text"
                                    placeholder="Digite o RA do aluno"
                                    label="RA"
                                    icon={
                                        <IdCard
                                            className="text-gray-500 mr-2"
                                            size={20}
                                        />
                                    }
                                    error={fieldState.error}
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
                                    placeholder="Digite a senha do usuário"
                                    label="Senha"
                                    autocomplete="current-password"
                                    icon={
                                        <Lock
                                            className="text-gray-500 mr-2"
                                            size={20}
                                        />
                                    }
                                    error={fieldState.error}
                                    {...field}
                                />
                            )}
                        />

                        {/* Opções adicionais */}
                        <div className="flex justify-between items-center mb-6 mt-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Lembre-me
                            </label>
                            <PageLink href="/recuperarSenha">
                                Esqueceu a senha?
                            </PageLink>
                        </div>

                        {/* Botão Entrar */}
                        <Button
                            variant="primary"
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            rounded={true}
                            fullWidth={true}
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            Entrar
                        </Button>

                        {/* Link para inscrição */}
                        <p className="flex gap-1 justify-center mt-4 text-sm text-center">
                            Não tem uma conta?
                            <PageLink href="/register">Inscreva-se</PageLink>
                        </p>
                    </div>
                </form>
            </LoginContainer>

            <LogoContainer />
        </ScreenContainer>
    );
};

export default Login;
