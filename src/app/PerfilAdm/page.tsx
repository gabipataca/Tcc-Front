import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-full mx-auto max-w-[100%]">
      {/* Navbar Lateral */}
      <div className="w-[220px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
        <div className="mt-20 h-full top-24 flex flex-col items-center">
          <FaUserCircle size={140} className="text-white mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-1">Usuário ADM</h2>
          <p className="text-white text-lg">E-mail Institucional</p>

          <div className="mt-auto mb-3">
          <img src="/falcon.png" alt="FHO Logo" className="h-28" />
        </div>
        </div>
      </div>

     
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3">
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="grid grid-cols-2 gap-8 py-6 px-20 mt-6">
          {/* Lista de Grupos */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4">Lista de grupos</h3>
            <ul className="text-lg">
              <li>1º Algoritmicamente Perigosos</li>
              <li>2º Bit Busters</li>
              <li>3º Bug Hunters</li>
              <li>4º Compiladores Selvagens</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg">Editar Grupo</button>
              <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg">Deletar Grupo</button>
            </div>
          </div>

          {/* Enviar Exercícios */}
          <div className="bg-white shadow-md rounded-lg flex flex-col relative p-4">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Enviar modelos de exercícios</h3>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Digite o Título do Exercício"
                className="w-3/4 p-2 border border-gray-300 rounded-lg mb-4"
              />
            </div>

            <div className="space-y-4">
              <label className="text-2xl pl-24">Descrição:</label>
              <button className="bg-gray-300 px-4 py-2 rounded-lg ml-20">Anexar arquivo</button>

              <label className="text-2xl pl-16">Valores de entrada:</label>
              <button className="bg-gray-300 px-4 py-2 rounded-lg ml-5">Anexar arquivo</button>

              <label className="text-2xl pl-16">Valores de saída:</label>
              <button className="bg-gray-300 px-4 py-2 rounded-lg ml-10">Anexar arquivo</button>

              <div className="flex justify-center mt-4">
                <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buscar e Criar Maratona */}
        <div className="grid grid-cols-2 gap-8 px-20">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4">Buscar Professores</h3>
            <input type="text" placeholder="Digite o nome do professor" className="w-full p-2 border border-gray-300 rounded-lg mb-4" />
            <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg">Deletar Professor</button>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4">Criar Maratona</h3>
            <select className="w-full p-2 border border-gray-300 rounded-lg mb-4">
              <option>O surfista</option>
              <option>O Estacionamento</option>
              <option>Maior número</option>
            </select>
            <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg">Adicionar</button>
            <h4 className="text-lg mt-4">Lista de exercícios Aprovados</h4>
            <ul className="text-lg">
              <li>1. O surfista</li>
              <li>2. O Estacionamento</li>
              <li>3. Maior número</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg">Iniciar Maratona</button>
              <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg">Deletar Exercício</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
