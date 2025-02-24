"use client"

import Button from "@/components/_ui/Button";
import Input from "@/components/_ui/Input";
import PageLink from "@/components/_ui/PageLink";
import ScreenContainer from "@/components/_ui/ScreenContainer";
import TitleLarge from "@/components/_ui/TitleLarge";
import LoginContainer from "@/components/pages/login/components/LoginContainer";
import LogoContainer from "@/components/pages/login/components/LogoContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, Lock } from "lucide-react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod"

interface LoginInputs {
	RA: string;
	password: string;
}

const schema = z.object({
	RA: z.string().min(6, { message: "RA deve ter no mínimo 6 digitos!" }).max(7, { message: "RA deve ter no máximo 7 digitos!" }),
	password: z.string()
});

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
		},
		mode: "onTouched",
		resolver: zodResolver(schema)
	});

	const onSubmit: SubmitHandler<LoginInputs> = (data) => {
		console.log(data);
	}

	return (
		<ScreenContainer>
			{/* Seção da esquerda (Login) */}
			<LoginContainer>
				<TitleLarge className="mb-8">LOGIN</TitleLarge>
				<form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
					<div className="w-full max-w-sm">
						{/* Campo RA */}
						<Controller
							name="RA"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="text"
									placeholder="Digite o RA do aluno"
									label="RA"
									icon={<IdCard className="text-gray-500 mr-2" size={20} />}
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
									icon={<Lock className="text-gray-500 mr-2" size={20} />}
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
							<PageLink href="/recuperarSenha">Esqueceu a senha?</PageLink>
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
				</form>
			</LoginContainer>

			<LogoContainer />
		</ScreenContainer>
	);
};

export default Login;
