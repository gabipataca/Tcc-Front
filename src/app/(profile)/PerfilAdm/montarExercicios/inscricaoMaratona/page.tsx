"use client";
import Navbar from "@/components/_ui/Navbar";
import SideMenu from "@/components/_ui/SideMenu";
import React, { useState } from "react";
import Button from "@/components/_ui/Button";

export default function AdminCompetitionForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState(3);
  const [initialDate, setInitialDate] = useState("");
  const [initialRegistration, setInitialRegistration] = useState("");
  const [endRegistration, setEndRegistration] = useState("");
  const [status, setStatus] = useState("Fechado");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataCompetition = { name, description, maxMembers, initialDate, initialRegistration, endRegistration, status };
    console.log(dataCompetition);
    alert("Maratona criada com sucesso!");
  };

  return (
    <div className="flex">
      {/* Menu Lateral */}
      <SideMenu />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <Navbar />
    
        <div className="flex min-h-screen w-full bg-gray-200 items-center justify-center pt-10">
          <div className="max-w-3xl w-full bg-white p-10 shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-[#4F85A6] text-center mb-6">
              Modelo de Inscrição Maratona
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">
                  Nome da Maratona
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">
                  Número Máximo de Integrantes por Grupo
                </label>
                <select
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
                >
                  {[1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700">
                    Início das Inscrições
                  </label>
                  <input
                    type="date"
                    value={initialRegistration}
                    onChange={(e) => setInitialRegistration(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium text-gray-700">
                    Fim das Inscrições
                  </label>
                  <input
                    type="date"
                    value={endRegistration}
                    onChange={(e) => setEndRegistration(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-4">
                <div>
                  <label className="block text-xl font-medium text-gray-700 text-center">
                    Data da Maratona
                  </label>
                  <input
                    type="date"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                    className="mt-2 block mx-auto w-1/2 border border-gray-300 rounded-lg p-3 text-lg"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 mt-4">
                <label className="block text-xl font-medium text-gray-700">
                  Status da Maratona
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Fechado">Fechado</option>
                </select>
              </div>

              <div className="flex justify-center mt-6">
          <Button onClick={handleSubmit} $rounded $fullWidth>
           Liberar Inscrição
              </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
