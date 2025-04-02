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
            {["Professor", "Grupo"].map((type, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded-lg w-full">
                <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">
                  Buscar {type}
                </h3>
                <input 
                  type="text" 
                  placeholder={`Digite o nome do ${type.toLowerCase()}`} 
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
                />
                <div className="flex justify-center">
                  <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                    Deletar {type}
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
