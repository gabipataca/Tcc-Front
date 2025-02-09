import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const PerfilAluno: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Navbar Lateral */}
      <div className="w-1/5 bg-[#4F85A6] flex flex-col items-center py-10 relative">
        <div className="absolute top-32 flex flex-col items-center">
          <FaUserCircle size={100} className="text-white mb-6" />
          <h2 className="text-white text-xl font-semibold mb-1">Nome</h2>
          <p className="text-white text-md mb-1">RA: xxxxx</p>
          <p className="text-white text-md mb-6">Ano de ingresso: XXXX</p>
        </div>
        <img src="/falcon.png" alt="FHO Logo" className="h-28 mt-auto mb-4" />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-4">
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        {/* Título e Botões */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-200">
          <h1 className="text-2xl font-semibold text-[#4F85A6]">Perfil do Aluno</h1>
          <div>
            <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg hover:bg-[#3C6B88] transition mr-4">Criar Grupo</button>
            <button className="bg-[#4F85A6] text-white px-4 py-2 rounded-lg hover:bg-[#3C6B88] transition">Iniciar Maratona</button>
          </div>
        </div>

        {/* Informações do Aluno e Grupo */}
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-[#4F85A6]">Informações do Aluno</h3>
            <p>Nome: xxxxxx</p>
            <p>Data de nascimento: xx/xx/xxxx</p>
            <p>E-mail: xxxxxxxxxxxxxx</p>
            <p>RA: xxxxxxxxxx</p>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-[#4F85A6]">Informações do Grupo</h3>
            <p>Nome do grupo: xxxxxx</p>
            <p>Lista de integrantes: xxxxxx</p>
          </div>
        </div>

        {/* Tabelas */}
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-[#4F85A6]">Histórico de Competição</h3>
            <table className="w-full mt-2 border-collapse border border-gray-300">
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
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-[#4F85A6]">Equipe Campeã</h3>
            <table className="w-full mt-2 border-collapse border border-gray-300">
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilAluno;
