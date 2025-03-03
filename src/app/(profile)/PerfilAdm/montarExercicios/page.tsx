'use client'

import React, { useState } from "react";
import { FaSignOutAlt, FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [exercicios, setExercicios] = useState<{ titulo: string; tipo: string }[]>([
    { titulo: "Exemplo de Exercício", tipo: "Lógico" }
  ]);
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Lógico");
  const [filtro, setFiltro] = useState("Todos");

  const adicionarExercicio = () => {
    if (titulo.trim()) {
      setExercicios([...exercicios, { titulo, tipo }]);
      setTitulo("");
    }
  };

  const removerExercicio = (index: number) => {
    setExercicios(exercicios.filter((_, i) => i !== index));
  };

  const exerciciosFiltrados = filtro === "Todos" ? exercicios : exercicios.filter(ex => ex.tipo === filtro);

  return (
    <div className="flex h-screen w-screen bg-gray-200">
            {/* Navbar Lateral */}
         <div className="w-[250px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
         <div className="mt-20 h-full top-24 flex flex-col items-center">
        <FaUserCircle size={140} className="text-white mb-4" />
        <h2 className="text-white text-2xl font-semibold mb-1">Usuário ADM</h2>
          <p className="text-white text-lg">E-mail Institucional</p>

        <div className="mt-auto mb-6">
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
        
        <div className="mt-10 p-5">
          <div className="grid grid-cols-2 gap-8 px-20 py-1">
            {/* Lista de Exercícios */}
            <div className="bg-white shadow-md rounded-lg flex flex-col p-6 relative">
              <h3 className="text-3xl font-semibold text-[#4F85A6] text-center mb-4">Lista de exercícios</h3>
              <select className="w-full p-2 border border-gray-300 rounded-lg mb-4" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <option value="Todos">Todos</option>
                <option value="Lógico">Lógico</option>
                <option value="Sequenciais">Sequenciais</option>
                <option value="Matemáticos">Matemáticos</option>
                <option value="Strings">Strings</option>
                <option value="Grafos">Grafos</option>
                <option value="Matriz">Matriz</option>
              </select>
              <div className="max-h-48 overflow-y-auto px-4">
                <ul className="text-lg space-y-2">
                  {exerciciosFiltrados.map((ex, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                      {ex.titulo} ({ex.tipo})
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => removerExercicio(index)}><FaTrash /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enviar Exercícios */}
            <div className="bg-white shadow-md rounded-lg flex flex-col p-6 relative">
              <h3 className="text-3xl font-semibold text-[#4F85A6] text-center mb-4">Enviar modelos de exercícios</h3>
              <input
                type="text"
                placeholder="Digite o Título do Exercício"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <select
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="Lógico">Lógico</option>
                <option value="Sequenciais">Sequenciais</option>
                <option value="Matemáticos">Matemáticos</option>
                <option value="Strings">Strings</option>
                <option value="Grafos">Grafos</option>
                <option value="Matriz">Matriz</option>
              </select>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Descrição:</label>
                  <button className="bg-gray-300 px-4 py-2 rounded-lg mt-2">Anexar arquivo</button>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Valores de entrada:</label>
                  <button className="bg-gray-300 px-4 py-2 rounded-lg mt-2">Anexar arquivo</button>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Valores de saída:</label>
                  <button className="bg-gray-300 px-4 py-2 rounded-lg mt-2">Anexar arquivo</button>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button onClick={adicionarExercicio} className="bg-[#4F85A6] text-white px-6 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
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

export default AdminDashboard;

