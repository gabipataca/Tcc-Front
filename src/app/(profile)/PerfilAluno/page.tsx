import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const PerfilAluno: React.FC = () => {
  return (
    <div className="flex h-screen max-w[100%]">
      {/* Navbar Lateral */}
      <div className="w-[220px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
        <div className="absolute top-24 flex flex-col items-center">
          <FaUserCircle size={140} className="text-white mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-1">Nome</h2>
          <p className="text-white text-lg mb-1">RA: xxxxx</p>
          <p className="text-white text-lg mb-3">Ano de ingresso: XXXX</p>
        </div>
        <div className="mt-auto mb-3">
          <img src="/falcon.png" alt="FHO Logo" className="h-28" />
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

        {/* Título e Botões */}
        <div className="flex justify-between items-center py-3 px-20 mt-8">
          <h1 className="text-4xl font-bold text-[#4F85A6]">Perfil do Aluno</h1>
          <div>
            <button className="bg-[#4F85A6] text-white px-4 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition mr-2">
              Criar Grupo
            </button>
            <button className="bg-[#4F85A6] text-white px-4 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
              Iniciar Maratona
            </button>
          </div>
        </div>

        {/* Informações do Aluno e Grupo */}
        <div className="grid grid-cols-2 gap-8 py-6 px-20 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col relative">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Informações do Aluno</h3>
            <div className="pl-6"> 
              <p className="text-2xl ml-2">Nome: xxxxxx</p>
              <p className="text-2xl ml-2">Data de nascimento: xx/xx/xxxx</p>
              <p className="text-2xl ml-2">E-mail: xxxxxxxxxxxxxx</p>
              <p className="text-2xl ml-2">RA: xxxxxxxxxx</p>
            </div>
            <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition absolute bottom-4 right-4">
              Editar
            </button>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col relative">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Informações do Grupo</h3>
            <div className="pl-6">
              <p className="text-2xl ml-2">Nome do grupo: xxxxxx</p>
              <p className="text-2xl ml-2">Lista de integrantes: xxxxxx</p>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                Adicionar
              </button>
              <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                Editar
              </button>
            </div>
          </div>
        </div>

        {/* Tabelas */}
        <div className="grid grid-cols-2 gap-8 px-20">
          <div className="bg-white shadow-md rounded-lg flex flex-col relative p-4">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Histórico de Competição</h3>
            <table className="w-full mt-2 border-collapse border border-gray-300 text-2xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Ano</th>
                  <th className="border border-gray-300 p-2">Nome Grupo</th>
                  <th className="border border-gray-300 p-2">Questões Acertadas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-md rounded-lg flex flex-col relative p-4">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Equipe Campeã</h3>
            <table className="w-full mt-2 border-collapse border border-gray-300 text-2xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Ano</th>
                  <th className="border border-gray-300 p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilAluno;
