"use client"

import React from "react";
import { User, IdCard, Mail, Lock, Layers } from "lucide-react";
import Input from "@/components/_ui/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/_ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ScreenContainer from "@/components/_ui/ScreenContainer";

interface RegisterInputs {
	joinYear: string;
	name: string;
	RA: string;
	email: string;
	password: string;
}

const schema = z.object({
	joinYear: z.coerce.number().min(new Date().getFullYear() - 6, "Ano inválido!").max(new Date().getFullYear(), "Ano inválido!"),
	name: z.string(),
	RA: z.string().min(6, { message: "RA deve ter no mínimo 6 digitos!" }).max(7, { message: "RA deve ter no máximo 7 digitos!" }),
	email: z.string().email("Formato de e-mail inválido!"),
	password: z.string()
});

const Cadastro: React.FC = () => {

	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		formState: { errors }
	} = useForm<RegisterInputs>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			RA: "",
			joinYear: ""
		},
		mode: "onTouched",
		resolver: zodResolver(schema)
	});

	const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
		console.log(data);
	}

	return (
		<ScreenContainer>
			{/* Seção da esquerda (Logo e Texto) */}
			<div className="w-1/2 bg-[#4F85A6] flex flex-col justify-center items-center text-white p-10">
				<img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
				<h1 className="text-5xl font-bold mt-4">FHO</h1>
				<p className="text-lg text-center mb-6">
					Para acessar sua conta da Maratona de Programação
				</p>
				<Button
					type="link"
					linkHref="/login"
					style="secondary"
					rounded={true}
				>
					Login
				</Button>
				
			</div>

			{/* Seção da direita (Formulário de Cadastro) */}
			<div className="w-1/2 flex flex-col justify-center items-center p-10">
				<h2 className="text-3xl font-bold text-[#4F85A6] mb-6">Crie sua conta</h2>

				<div className="w-full max-w-sm space-y-4">
					<form onSubmit={handleSubmit(onSubmit)}>

						{/* Nome */}
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="text"
									icon={<User className="text-gray-500 mr-2" size={20} />}
									placeholder="Digite seu nome"
									label="Nome"
									autocomplete="name"
									error={fieldState.error}
									{...field}
								/>
							)}
						/>

						{/* RA */}
						<Controller
							name="RA"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="text"
									icon={<IdCard className="text-gray-500 mr-2" size={20} />}
									placeholder="Digite seu RA"
									label="RA do aluno"
									error={fieldState.error}
									{...field}
								/>
							)}
						/>

						{/* E-mail Institucional */}
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="email"
									icon={<Mail className="text-gray-500 mr-2" size={20} />}
									placeholder="Digite seu e-mail"
									label="E-mail Institucional"
									autocomplete="email"
									error={fieldState.error}
									{...field}
								/>
							)}
						/>

						{/* Senha */}
						<Controller
							name="password"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="password"
									icon={<Lock className="text-gray-500 mr-2" size={20} />}
									placeholder="Digite sua senha"
									label="Senha"
									autocomplete="new-password"
									error={fieldState.error}
									{...field}
								/>
							)}
						/>

						{/* Ano de Ingresso */}
						<Controller
							name="joinYear"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									type="number"
									icon={<Layers className="text-gray-500 mr-2" size={20} />}
									placeholder="Digite o ano de ingresso"
									label="Ano de Ingresso"
									error={fieldState.error}
									{...field}
								/>
							)}
						/>

						{/* Botão Criar Conta */}
						<Button
							rounded={true}
							fullWidth={true}
						>
							Criar
						</Button>

					</form>
				</div>
			</div>
		</ScreenContainer>
	);
};

export default Cadastro;
