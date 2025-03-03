import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-full mx-auto w-full">
      {/* Navbar Lateral */}
      <div className="w-[250px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
        <div className="mt-20 h-full top-24 flex flex-col items-center">
          <FaUserCircle size={140} className="text-white mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-1">Perfil ADM</h2>
          <p className="text-white text-lg">E-mail Institucional</p>
          <div className="mt-auto mb-3">
            <img src="/falcon.png" alt="FHO Logo" className="h-28" />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3 px-6">
          <nav className="flex space-x-6 text-lg">
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
          </nav>
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        {/* Seção Principal */}
        <div className="grid grid-cols-2 gap-8 px-20 py-10">
          {/* Coluna Esquerda */}
          <div className="flex flex-col gap-6">
            {/* Lista de Grupos */}
            <div className="bg-white shadow-md rounded-lg flex flex-col p-6 w-[560px] items-center">
              <h3 className="text-3xl font-semibold text-[#4F85A6] py-3 mb-4 text-center">
                Lista de grupos
              </h3>
              <div className="max-h-48 overflow-y-auto w-full">
                <ul className="text-2xl pl-24">
                  <li>1º Algoritmicamente Perigosos</li>
                  <li>2º Bit Busters</li>
                  <li>3º Bug Hunters</li>
                  <li>4º Compiladores Selvagens</li>
                  <li>5º Debuggers Anônimos</li>
                  <li>6º Error 404</li>
                  <li>7º Full Stack Ninjas</li>
                  <li>8º Code Warriors</li>
                  <li>9º Runtime Terrors</li>
                  <li>10º Stack Overflowers</li>
                </ul>
              </div>
              <button className="bg-[#4F85A6] text-white px-4 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition mt-4">
                Deletar Grupo
              </button>
            </div>

            {/* Buscar Aluno */}
            <div className="bg-white p-6 shadow-md rounded-lg w-[560px] mx-auto">
              <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">
                Buscar Aluno
              </h3>
              <input
                type="text"
                placeholder="Digite o nome do aluno"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-center">
                <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                  Deletar Aluno
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col gap-6 w-full">
            {["Professor", "Grupo"].map((tipo, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded-lg w-full">
                <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">
                  Buscar {tipo}
                </h3>
                <input 
                  type="text" 
                  placeholder={`Digite o nome do ${tipo.toLowerCase()}`} 
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
                />
                <div className="flex justify-center">
                  <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                    Deletar {tipo}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
