"use client"

import React, { useState } from "react";
import { User, IdCard, Mail, Lock, Layers, Key } from "lucide-react";
import Input from "@/components/_ui/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/_ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ScreenContainer from "@/components/_ui/ScreenContainer";

interface RegisterInputs {
	role: string;
	name: string;
	RA: string;
	email: string;
	password: string;
	joinYear?: string;
	accessCode?: string;
}

const schema = z.object({
	role: z.enum(["Aluno", "Professor"]),
	name: z.string(),
	RA: z.string().min(6, { message: "RA deve ter no mínimo 6 dígitos!" }).max(7, { message: "RA deve ter no máximo 7 dígitos!" }),
	email: z.string().email("Formato de e-mail inválido!"),
	password: z.string(),
	joinYear: z.coerce.number().min(new Date().getFullYear() - 6, "Ano inválido!").max(new Date().getFullYear(), "Ano inválido!").optional(),
	accessCode: z.string().optional()
});

const Cadastro: React.FC = () => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors }
	} = useForm<RegisterInputs>({
		defaultValues: {
			role: "Aluno",
			name: "",
			email: "",
			password: "",
			RA: "",
			joinYear: ""
		},
		mode: "onTouched",
		resolver: zodResolver(schema)
	});

	const role = watch("role");

	const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
		console.log(data);
	};

	return (
		<ScreenContainer>
			<div className="w-1/2 bg-[#4F85A6] flex flex-col justify-center items-center text-white p-10">
				<img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
				<h1 className="text-5xl font-bold mt-4">FHO</h1>
				<p className="text-lg text-center mb-6">Para acessar sua conta da Maratona de Programação</p>
				<Button type="link" linkHref="/login" style="secondary" rounded={true}>Login</Button>
			</div>

			<div className="w-1/2 flex flex-col justify-center items-center p-10">
				<h2 className="text-3xl font-bold text-[#4F85A6] mb-6">Crie sua conta</h2>

				<div className="w-full max-w-sm space-y-4">
					<form onSubmit={handleSubmit(onSubmit)}>

						{/* Nome */}
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<Input type="text" icon={<User className="text-gray-500 mr-2" size={20} />} placeholder="Digite seu nome" label="Nome" error={fieldState.error} {...field} />
							)}
						/>

						{/* Seleção de Tipo */}
						<label className="text-gray-700 text-base font-normal">Tipo</label>
						<select {...register("role")} className="w-full p-2 border rounded mb-4">
							<option value="Aluno">Aluno</option>
							<option value="Professor">Professor</option>
						</select>

						{/* RA */}
						<Controller
							name="RA"
							control={control}
							render={({ field, fieldState }) => (
								<Input type="text" icon={<IdCard className="text-gray-500 mr-2" size={20} />} placeholder="Digite seu RA" label="RA do Usuário" error={fieldState.error} {...field} />
							)}
						/>

						{/* E-mail */}
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<Input type="email" icon={<Mail className="text-gray-500 mr-2" size={20} />} placeholder="Digite seu e-mail" label="E-mail Institucional" error={fieldState.error} {...field} />
							)}
						/>

						{/* Senha */}
						<Controller
							name="password"
							control={control}
							render={({ field, fieldState }) => (
								<Input type="password" icon={<Lock className="text-gray-500 mr-2" size={20} />} placeholder="Digite sua senha" label="Senha" error={fieldState.error} {...field} />
							)}
						/>

						{/* Ano de Ingresso (Alunos) */}
						{role === "Aluno" && (
							<Controller
								name="joinYear"
								control={control}
								render={({ field, fieldState }) => (
									<Input type="number" icon={<Layers className="text-gray-500 mr-2" size={20} />} placeholder="Digite o ano de ingresso" label="Ano de Ingresso" error={fieldState.error} {...field} />
								)}
							/>
						)}

						{/* Código de Acesso (Professores) */}
						{role === "Professor" && (
							<Controller
								name="accessCode"
								control={control}
								render={({ field, fieldState }) => (
									<Input type="text" icon={<Key className="text-gray-500 mr-2" size={20} />} placeholder="Digite o código de acesso" label="Código de Acesso" error={fieldState.error} {...field} />
								)}
							/>
						)}

						<Button rounded={true} fullWidth={true}>Criar</Button>
					</form>
				</div>
			</div>
		</ScreenContainer>
	);
};

export default Cadastro;