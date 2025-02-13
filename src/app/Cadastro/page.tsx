"use client"

import React from "react";
import { User, IdCard, Mail, Lock, Layers } from "lucide-react";
import Input from "@/components/shared/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface RegisterInputs {
	joinYear: string;
	name: string;
	RA: string;
	email: string;
	password: string;
}

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
		}
	});

	const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
		
	}

	return (
		<div className="flex h-screen">
			{/* Seção da esquerda (Logo e Texto) */}
			<div className="w-1/2 bg-[#4F85A6] flex flex-col justify-center items-center text-white p-10">
				<img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
				<h1 className="text-5xl font-bold mt-4">FHO</h1>
				<p className="text-lg text-center mb-6">
					Para acessar sua conta da Maratona de Programação
				</p>
				<button className="px-6 py-2 border border-white rounded-lg text-white hover:bg-white hover:text-[#4F85A6] transition">
					Login
				</button>
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
						<button className="w-full bg-[#4F85A6] text-white p-2 rounded-lg hover:bg-[#3C6B88] transition">
							Criar
						</button>

					</form>
				</div>
			</div>
		</div>
	);
};

export default Cadastro;
