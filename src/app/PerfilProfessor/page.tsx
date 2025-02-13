import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const PerfilProfessor: React.FC = () => {
  return (
    <div className="flex h-screen mx-auto max-w-[100%]">
      {/* Navbar Lateral */}
      <div className="w-[220px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
        <div className="absolute top-24 flex flex-col items-center">
          <FaUserCircle size={140} className="text-white mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-1">Nome</h2>
          <p className="text-white text-lg mb-1">RA: xxxxx</p>
          <p className="text-white text-lg mb-3">Data Nasc: xx/xx/xxxx</p>
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

        {/* Título e Informações */}
        <div className="flex justify-center items-center py-0 px-15 mt-5">
          <h1 className="text-4xl font-bold text-[#4F85A6]">Perfil do Professor</h1>
        </div>

        {/* Informações do Professor e Buscar Aluno */}
        <div className="grid grid-cols-2 gap-8 py-6 px-20 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col relative">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Informações do Professor</h3>
            <div className="pl-6"> 
              <p className="text-2xl ml-2">Nome: xxxxxx</p>
              <p className="text-2xl ml-2">E-mail: xxxxxxxxxxxxxx</p>
            </div>
            <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition absolute bottom-4 right-4">
              Editar
            </button>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col relative">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Buscar Aluno</h3>
            <div className="pl-6">
              <input
                type="text"
                placeholder="Digite o nome do aluno"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                Deletar Aluno
              </button>
            </div>
          </div>
        </div>
               
        {/* Lista de Grupos e Enviar Exercícios */}
        <div className="grid grid-cols-2 gap-8 px-20">
  <div className="bg-white shadow-md rounded-lg flex flex-col relative p-4">
    <h3 className="text-3xl font-semibold text-[#4F85A6] py-3 mb-4 text-center">
      Lista de grupos
    </h3>
    
    <div className="pl-14">
      <div className="max-h-48 overflow-y-auto pr-4">
        <ul className="text-2xl ml-2">
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
      <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition absolute bottom-4 right-4">
        Deletar Grupo
      </button>
    </div>
  </div>




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
                <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition ">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilProfessor;
