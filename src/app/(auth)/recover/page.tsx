"use client"

import React from "react";
import { Mail } from "lucide-react";
import Button from "@/components/_ui/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/_ui/Input";
import BodyLarge from "@/components/_ui/BodyLarge";
import TitleExtraLarge from "@/components/_ui/TitleExtraLarge";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


interface ResetPasswordInputs {
	email: string;
}

const schema = z.object({
	email: z.string({
		required_error: "Campo obrigatório"
	}).email("Formato de email inválido!")
});

const RedefinirSenha: React.FC = () => {

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<ResetPasswordInputs>({
		defaultValues: {
			email: ""
		},
		mode: "onTouched",
		resolver: zodResolver(schema)
	});

	const onSubmit: SubmitHandler<ResetPasswordInputs> = (data) => {

	}

	return (
		<div className="flex h-screen">
			{/* Lado esquerdo */}
			<div className="w-1/2 bg-[#4f85a0] text-white flex flex-col items-center justify-center p-10">
				<img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
				<TitleExtraLarge className="mt-4">FHO</TitleExtraLarge>
				<BodyLarge centered white className="mb-6">
					Caso já possua conta, clique abaixo para fazer login
				</BodyLarge>
				<Button rounded type="link" linkHref="/login" style="secondary">
					Login
				</Button>
			</div>

			{/* Lado direito */}
			<div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
				<h2 className="text-3xl font-bold text-[#4f85a0] mb-4">Redefinição de senha</h2>
				<BodyLarge white={false} centered className="mb-6">
					Digite seu e-mail no campo abaixo para redefinir sua senha
				</BodyLarge>
				<div className="w-full max-w-sm">
					<form onSubmit={handleSubmit(onSubmit)}>

						{/* Campo de E-mail */}
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="email"
									error={fieldState.error}
									label="E-mail Institucional"
									required={true}
									placeholder="Digite seu e-mail"
									icon={<Mail className="text-gray-500 mr-2" size={20} />}
									{...field}
								/>
							)}
						/>

						{/* Botão Recuperar */}
						<Button rounded fullWidth>
							Recuperar
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RedefinirSenha;