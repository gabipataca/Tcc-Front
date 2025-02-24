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
        {/* Lista de Grupos e Enviar Exercícios */}
        <div className="grid grid-cols-2 gap-8 px-20 py-10">
  <div className="bg-white shadow-md rounded-lg flex flex-col relative p-4">
    <h3 className="text-3xl font-semibold text-[#4F85A6] py-3 mb-4 text-center">
      Lista de grupos
    </h3>
    
    <div className="pl-12">
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



        <div className="flex gap-8 px-20 items-start">
  {/* Coluna Esquerda - Mesma largura da Direita */}
  <div className="flex flex-col gap-6 w-1/2">
    <div className="bg-white p-6 shadow-md rounded-lg w-full">
      <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4  text-center">Buscar Professores</h3>
      <input 
        type="text" 
        placeholder="Digite o nome do professor" 
        className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
      />
         <div className="flex justify-center">
           <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
          Deletar Professor
      </button>
      </div>
    </div>

    <div className="bg-white p-6 shadow-md rounded-lg w-full">
      <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">Buscar Grupo</h3>
      <input 
        type="text" 
        placeholder="Digite o nome do grupo" 
        className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
      />
        <div className="flex justify-center">
          <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
          Deletar Grupo
         </button>
      </div>
    </div>

    <div className="bg-white p-6 shadow-md rounded-lg w-full">
      <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4  text-center">Buscar Aluno</h3>
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

  {/* Coluna Direita - Mesma largura da Esquerda */}
  <div className="w-1/2 bg-white p-6 shadow-md rounded-lg">
    <h3 className="text-2xl font-semibold text-[#4F85A6] mb-4  text-center">Criar Maratona</h3>
    <select className="w-full p-2 border border-gray-300 rounded-lg mb-4">
      <option>O surfista</option>
      <option>O Estacionamento</option>
      <option>Maior número</option>
    </select>
    <div className="flex justify-center">
          <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
          Deletar Aluno
        </button>
        </div>
        <div className="pl-12">
    <h4 className="text-lg mt-4">Lista de exercícios Aprovados</h4>
    <ul className="text-lg">
      <li>1. O surfista</li>
      <li>2. O Estacionamento</li>
      <li>3. Maior número</li>
    </ul>
    </div>
       <div className="flex gap-2 mt-4 justify-center">
         <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
           Iniciar Maratona
           </button>
               <button className="bg-[#4F85A6] text-white px-3 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
           Deletar Exercício
       </button>
      </div>


  </div>
</div>
</div>
</div>



  );
};

export default AdminDashboard;
