'use client';

import { FaSignOutAlt } from "react-icons/fa";
import React from "react";
import styled from "styled-components";

// Botão estilizado
const StyledButton = styled.button`
  background-color: #4F85A6;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a6b87;
  }
`;

const Navbar = () => (
  <div className="bg-[#4F85A6] text-white mb-6 flex justify-between items-center p-4 px-6">
    <nav className="flex space-x-6 text-lg">
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Home</a>
      <span>|</span>
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Enviar Exercício</a>
      <span>|</span>
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Ranking</a>
      <span>|</span>
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Dúvidas</a>
    </nav>
    <button className="text-white ml-auto">
      <FaSignOutAlt size={24} />
    </button>
  </div>
);


const SelectField = ({ label, options }: { label: string; options: string[] }) => (
  <div className="mb-8">
    <label className="block text-gray-700 text-lg mb-2">{label}</label>
    <div className="flex justify-center mt-2">
      <select className="border rounded px-3 py-2 w-40">
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);

const TextareaField = () => (
  <div className="mb-8">
    <label className="block text-gray-700 text-lg mb-2">Escreva suas dúvidas:</label>
    <textarea
      rows={4}
      className="w-full border rounded px-3 py-2 resize-none"
      placeholder="Digite aqui sua dúvida sobre o exercício..."
    />
  </div>
);

// Página principal
export default function AnaliseJuiz() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar />

      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-16 rounded-xl shadow-lg w-[700px] text-center">
          <h2 className="text-4xl font-bold text-[#4F85A6] mb-6 tracking-wide">
            Retire suas dúvidas sobre o exercício
          </h2>

          <SelectField
            label="Escolha o exercício:"
            options={[...'ABCDEFGHIJ']}
          />

          <SelectField
            label="Escolha a Linguagem:"
            options={["C", "C++", "C#", "Java", "PHP", "Python"]}
          />

          <TextareaField />

          <StyledButton>
            Enviar
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
