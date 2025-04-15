'use client'

import Button from "@/components/_ui/Button";
import Navbar from "@/components/_ui/Navbar";
import SideMenu from "@/components/_ui/SideMenu";
import React from "react";

const AdminDashboard: React.FC = () => {
	return (
		<div className="flex h-full mx-auto w-full">
			<SideMenu />

			{/* Conteúdo Principal */}
			<div className="flex-1 flex flex-col bg-gray-200">
				<Navbar />

				{/* Seção Principal */}
				<div className="flex flex-col lg:flex-row gap-8 p-6">
					{/* Coluna Esquerda */}
					<div className="grid grid-cols-1 gap-8 w-full ">
						{/* Lista de Grupos */}
						<div className="bg-white shadow-md rounded-lg flex flex-col p-6 items-center w-full">
							<h3 className="text-3xl font-semibold text-[#4F85A6] py-3 mb-4 text-center">
								Lista de grupos
							</h3>
							<div className="max-h-48 overflow-y-auto w-full">
								<ul className="text-2xl pl-10">
									<li>1º Algoritmicamente Perigosos</li>
									<li>2º Bit Busters</li>
									<li>3º Bug Hunters</li>
									<li>4º Compiladores Selvagens</li>
									<li>5º Debuggers Anônimos</li>
									<li>6º Error 404</li>
								</ul>
							</div>
							<Button $rounded className="mt-4">
								Deletar Grupo
							</Button>
						</div>

						{/* Buscar Aluno */}
						<div className="bg-white p-6 shadow-md rounded-lg w-full">
							<h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">
								Buscar Aluno
							</h3>
							<input
								type="text"
								placeholder="Digite o nome do aluno"
								className="w-full p-2 border border-gray-300 rounded-lg mb-4"
							/>
							<div className="flex justify-center">
								<Button $rounded>Deletar Aluno</Button>
							</div>
						</div>
					</div>

					{/* Coluna Direita */}
					<div className="flex flex-col gap-8 w-full">
						{/* Buscar Professor */}
						<div className="bg-white p-6 shadow-md rounded-lg w-full ">
							<h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">
								Buscar Professor
							</h3>
							<input
								type="text"
								placeholder="Digite o nome do professor"
								className="w-full p-2 border border-gray-300 rounded-lg mb-4"
							/>
							<div className="flex justify-center">
								<Button $rounded>Deletar Professor</Button>
							</div>
						</div>

						{/* Buscar Grupo */}
						<div className="bg-white p-6 shadow-md rounded-lg w-full">
							<h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">
								Buscar Grupo
							</h3>
							<input
								type="text"
								placeholder="Digite o nome do grupo"
								className="w-full p-2 border border-gray-300 rounded-lg mb-4"
							/>
							<div className="flex justify-center">
								<Button $rounded>Deletar Grupo</Button>
							</div>
						</div>
					</div>
				</div> 
			</div>
		</div>
	);
};

export default AdminDashboard;
