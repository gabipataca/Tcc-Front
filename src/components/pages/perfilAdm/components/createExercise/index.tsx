'use client'

import React, { useState } from "react";
import SideMenu from "@/components/_ui/SideMenu";
import Button from "@/components/_ui/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [exercises, setExercises] = useState<{ title: string; type: string }[]>([
    { title: "Exemplo de Exercício", type: "Lógico" }
  ]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Lógico");
  const [filter, setFilter] = useState("Todos");

  const addExercises = () => {
    if (title.trim()) {
      setExercises([...exercises, { title, type }]);
      setTitle("");
    }
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const ExercisesList = ({
    exercises,
    onDelete,
    filter,
    setFilter,
  }: {
    exercises: { title: string; type: string }[];
    onDelete: (index: number) => void;
    filter: string;
    setFilter: (f: string) => void;
  }) => {
    const exercisesFilter =
      filter === "Todos" ? exercises : exercises.filter((ex) => ex.type === filter);

    return (
      <div className="bg-white shadow-md rounded-lg flex flex-col p-6 relative">
        <h3 className="text-3xl font-semibold text-[#4F85A6] text-center mb-4">
          Lista de exercícios
        </h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["Todos", "Lógico", "Sequenciais", "Matemáticos", "Strings", "Grafos", "Matriz"].map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
        <div className="max-h-48 overflow-y-auto px-4">
          <ul className="text-lg space-y-2">
            {exercisesFilter.map((ex, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                {ex.title} ({ex.type})
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(index)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const ExerciseForm = ({
    title,
    setTitle,
    type,
    setType,
    onSubmit,
  }: {
    title: string;
    setTitle: (t: string) => void;
    type: string;
    setType: (t: string) => void;
    onSubmit: () => void;
  }) => {
    return (
      <div className="bg-white shadow-md rounded-lg flex flex-col p-6 relative">
        <h3 className="text-3xl font-semibold text-[#4F85A6] text-center mb-4">
          Enviar modelos de exercícios
        </h3>
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
          {["Lógico", "Sequenciais", "Matemáticos", "Strings", "Grafos", "Matriz"].map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>

        <div className="space-y-4">
          {["Descrição", "Valores de entrada", "Valores de saída"].map((label) => (
            <div key={label} className="flex flex-col">
              <label className="text-lg font-medium">{label}:</label>
              <button className="bg-gray-300 px-4 py-2 rounded-lg mt-2">Anexar arquivo</button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={onSubmit} $rounded $fullWidth>
            Enviar
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen bg-gray-200">
      <SideMenu />
      <div className="flex-1 flex flex-col bg-gray-200">
        <div className="mt-10 p-5">
          <div className="grid grid-cols-2 gap-8 px-20 py-1">
            <ExercisesList
              exercises={exercises}
              onDelete={removeExercise}
              filter={filter}
              setFilter={setFilter}
            />
            <ExerciseForm
              title={title}
              setTitle={setTitle}
              type={type}
              setType={setType}
              onSubmit={addExercises}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
