'use client'

import SideMenu from "@/components/_ui/SideMenu";
import React, { useState } from "react";
import { FaSignOutAlt, FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [exercises, setExercises] = useState<{ title: string; type: string }[]>([
    { title: "Exemplo de Exercício", type: "Lógico" }
  ]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Lógico");
  const [filter, setFilter] = useState("Todos");

  const addExercise = () => {
    if (title.trim()) {
      setExercises([...exercises, { title, type }]);
      setTitle("");
    }
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const exercisesFiltered = filter === "Todos" ? exercises : exercises.filter(ex => ex.type === filter);

  return (
    <div className="flex h-screen w-screen bg-gray-200">
      {/* Navbar Lateral */}
      <SideMenu />
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        {/* Navbar Superior */}
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3 px-6">
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
        </div>

        <div className="mt-10 p-5">
          <div className="grid grid-cols-2 gap-8 px-20 py-1">
            {/* Lista de Exercícios */}
            <div className="bg-white shadow-md rounded-lg flex flex-col p-6 relative">
              <h3 className="text-3xl font-semibold text-[#4F85A6] text-center mb-4">Lista de exercícios</h3>
              <select className="w-full p-2 border border-gray-300 rounded-lg mb-4" value={filter} onChange={(e) => setFilter(e.target.value)}>
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
                  {exercisesFiltered.map((ex, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                      {ex.title} ({ex.type})
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => removeExercise(index)}><FaTrash /></button>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                value={type}
                onChange={(e) => setType(e.target.value)}
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
                <button onClick={addExercise} className="bg-[#4F85A6] text-white px-6 py-2 text-lg rounded-lg hover:bg-[#3C6B88] transition">
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
