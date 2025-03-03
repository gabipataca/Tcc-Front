"use client";

import { useState } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function AdminMaratonaForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [maxIntegrantes, setMaxIntegrantes] = useState(3);
  const [dataInicio, setDataInicio] = useState("");
  const [inscricaoInicio, setInscricaoInicio] = useState("");
  const [inscricaoFim, setInscricaoFim] = useState("");
  const [status, setStatus] = useState("Fechado");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dadosMaratona = { nome, descricao, maxIntegrantes, dataInicio, inscricaoInicio, inscricaoFim, status };
    console.log(dadosMaratona);
    alert("Maratona criada com sucesso!");
  };

  return (
    <div className="flex h-full mx-auto w-full">
      {/* Navbar Lateral */}
      <div className="w-[250px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
        <div className="mt-20 h-full top-24 flex flex-col items-center">
          <FaUserCircle size={140} className="text-white mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-1">Perfil ADM</h2>
          <p className="text-white text-lg">E-mail Institucional</p>
         
        </div>
        <div className="mt-auto mb-3">
          <img src="/falcon.png" alt="FHO Logo" className="h-28" />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3 shadow-md">
          <div className="flex space-x-6 text-lg">
          <a href="#" className="hover:underline">Home</a>
          <span>|</span>
            <a href="#" className="hover:underline">Inscrições</a>
            <span>|</span>
            <a href="#" className="hover:underline">Criar Maratona</a>
            <span>|</span>
            <a href="#" className="hover:underline">Estatísticas</a>
            <span>|</span>
            <a href="#" className="hover:underline">Ranking</a>
            <span>|</span>
          </div>
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        <div className="flex min-h-screen w-full bg-gray-200 items-center justify-center pt-10">
          <div className="max-w-3xl w-full bg-white p-10 shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-[#4F85A6] text-center mb-6">Modelo de Inscrição Maratona</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">Nome da Maratona</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} 
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg" required />
              </div>
              
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">Descrição</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg" required />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-700">Número Máximo de Integrantes por Grupo</label>
                <select value={maxIntegrantes} onChange={(e) => setMaxIntegrantes(Number(e.target.value))}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg">
                  {[1, 2, 3].map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700">Início das Inscrições</label>
                  <input type="date" value={inscricaoInicio} onChange={(e) => setInscricaoInicio(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg" required />
                </div>
                <div>
                  <label className="block text-xl font-medium text-gray-700">Fim das Inscrições</label>
                  <input type="date" value={inscricaoFim} onChange={(e) => setInscricaoFim(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mt-4">
                <div>
                  <label className="block text-xl font-medium text-gray-700 text-center">Data da Maratona</label>
                  <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}
                    className="mt-2 block mx-auto w-1/2 border border-gray-300 rounded-lg p-3 text-lg" required />
                </div>
              </div>

              <div className="mb-4 mt-4">
                <label className="block text-xl font-medium text-gray-700">Status da Maratona</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg">
                  <option value="Aberto">Aberto</option>
                  <option value="Fechado">Fechado</option>
                </select>
              </div>

              <button type="submit"
                className="w-full bg-[#4F85A6] text-white py-3 text-xl rounded-lg hover:bg-[#3C6B88] transition mt-6">
                Liberar Inscrição
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
