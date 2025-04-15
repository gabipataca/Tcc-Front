import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const PerfilProfessor: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full mx-auto">
      {/* Navbar Lateral */}
      <aside className="w-[250px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
      <div className="mt-[-30px] mb-2">
          <img src="/fhologo.png" alt="" className="h-20" />
        </div>
        <div className="mt-20 flex flex-col items-center">
          <FaUserCircle size={140} className="text-white mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-1">Nome</h2>
          <p className="text-white text-lg mb-1">RA: xxxxx</p>
          <p className="text-white text-lg mb-3">Data Nasc: xx/xx/xxxx</p>
        </div>
        <div className="mt-auto mb-3">
          <img src="/falcon.png" alt="FHO Logo" className="h-28" />
        </div>
      </aside>

      

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <header className="bg-[#4F85A6] text-white flex justify-between items-center p-3 px-6">
          <nav className="flex space-x-6 text-lg">
            <a href="#" className="hover:underline">Home</a>
            <span>|</span>
            <a href="#" className="hover:underline">Lista de Exercícios</a>
            <span>|</span>
            <a href="#" className="hover:underline">Ranking</a>
          </nav>
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </header>

        {/* Título */}
        <section className="flex justify-center items-center mt-5">
          <h1 className="text-4xl font-bold text-[#4F85A6]">Perfil do Professor</h1>
        </section>

        {/* Informações e Busca */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 px-20">
          {/* Informações do Professor */}
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col relative">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Informações do Professor</h3>
            <div className="pl-6">
              <p className="text-2xl">Nome: xxxxxx</p>
              <p className="text-2xl">E-mail: xxxxxxxxxxxxxx</p>
            </div>
            <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition absolute bottom-4 right-4">
              Editar
            </button>
          </div>

          {/* Buscar Aluno */}
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col">
            <h3 className="text-3xl font-semibold text-[#4F85A6] mb-4 text-center">Buscar Aluno</h3>
            <input type="text" placeholder="Digite o nome do aluno" className="w-full p-2 border border-gray-300 rounded-lg" />
            <div className="flex justify-center mt-4">
              <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
                Deletar Aluno
              </button>
            </div>
          </div>
        </section>

        {/* Lista de Grupos */}
        <section className="flex justify-center py-6">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-3xl font-semibold text-[#4F85A6] py-3 mb-4 text-center">Lista de Grupos</h3>
            <div className="max-h-48 overflow-y-auto pr-4 pl-6">
              <ul className="text-2xl">
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
            <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition block mx-auto mt-4">
              Deletar Grupo
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PerfilProfessor;
