'use client'


import React from "react";
import Button from "@/components/_ui/Button";
import Navbar from "@/components/_ui/Navbar";
import SideMenu from "@/components/_ui/SideMenu";

const AdminDashboard: React.FC = () => {
	return (
		<div className="flex h-full mx-auto w-full">
			<SideMenu />

			{/* Conteúdo Principal */}
			<div className="flex-1 flex flex-col bg-gray-200">
				<Navbar />

				{/* Seção Principal: Configurar Maratona */}
				<div className="flex justify-center items-start p-6 w-full">
					<div className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl">
						<h3 className="text-3xl font-semibold text-[#4F85A6] mb-6 text-center">
							Configurar Maratona
						</h3>

						{/* Quantidade de Exercícios */}
						<div className="mb-4">
							<label className="block text-xl font-medium text-gray-700 mb-2">
								Quantidade de Exercícios (2 a 15)
							</label>
							<input
								type="number"
								min="2"
								max="15"
								defaultValue="2"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>

						{/* Filtro por Título */}
						<div className="mb-4">
							<label className="block text-xl font-medium text-gray-700 mb-2">
								Filtrar Exercícios por Título
							</label>
							<input
								type="text"
								placeholder="Digite o título do exercício"
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
						</div>

						{/* Lista de Exercícios Selecionáveis */}
						<div className="mb-6">
							<h4 className="text-xl font-semibold text-gray-700 mb-2">Selecionar Exercícios</h4>
							<div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
								<label className="block">
									<input type="checkbox" className="mr-2" />
									Exercício 1 - Título exemplo
								</label>
								<label className="block">
									<input type="checkbox" className="mr-2" />
									Exercício 2 - Título exemplo
								</label>
								<label className="block">
									<input type="checkbox" className="mr-2" />
									Exercício 3 - Título exemplo
								</label>
							</div>
						</div>

						{/* Duração da Maratona */}
						<div className="mb-6">
							<label className="block text-xl font-medium text-gray-700 mb-2">
								Duração da Maratona (minutos)
							</label>
							<input
								type="number"
								min="1"
								className="w-full p-2 border border-gray-300 rounded-lg"
								placeholder="Ex: 90"
							/>
						</div>

						{/* Botão Criar Maratona */}
						<div className="flex justify-center">
                        <Button $rounded className="bg-[#4F85A6] text-white px-6 py-2 mt-4 hover:bg-[#3b6b88] transition">
	                        Criar Maratona
                        </Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
