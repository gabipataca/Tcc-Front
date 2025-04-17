'use client';



import SideMenu from "@/components/_ui/SideMenu";
import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Inscricao: React.FC = () => {
  const [competitionName, setCompetitionName,] = useState("");
  const [quantityStudents, setQuantityStudents] = useState(1);
  const [members, setMembers] = useState<string[]>([""]);
  const [initialRegistration, setInitialRegistration] = useState("");
  const [registrationEnd, setRegistrationEnd] = useState("");
  const [maxMembers, setMaxMembers] = useState(3);
  

  useEffect(() => {
    const fetchMaratonaConfig = async () => {
      const response = await fetch("/api/maratona");
      const data = await response.json();
      setCompetitionName(data.nome);
      setInitialRegistration(data.initialRegistration);
      setRegistrationEnd(data.registrationEnd);
      setMaxMembers(data.maxMembers);
      setQuantityStudents(1);
      setMembers([""]);
    };
    //fetchMaratonaConfig();
  }, []);

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value, 10);
    setQuantityStudents(quantity);
    setMembers(Array(quantity).fill(""));
};

  const handleIntegranteChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };


  return (
    <div className="flex h-full mx-auto w-full">
      {/* Navbar Lateral */}
      <SideMenu />
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200 items-center">
        {/* Navbar Superior */}
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3 w-full">
          <div className="flex space-x-6 text-lg">
            <a href="#" className="hover:underline">Home</a>
            <span>|</span>
            <a href="#" className="hover:underline">Inscrições</a>
            <span>|</span>
            <a href="#" className="hover:underline">Maratona</a>
          </div>
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </div>

        <form className="max-w-3xl w-full mx-auto bg-white p-10 shadow-md rounded-lg mt-6">
          <h1 className="text-4xl font-bold text-[#4F85A6] text-center mb-6">Inscrição Maratona</h1>
          
          <div className="mb-6">
            <label className="block text-xl font-medium text-gray-700">Nome da Maratona</label>
            <input 
              type="text" 
              value={competitionName} 
              readOnly 
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg bg-gray-200 cursor-not-allowed" 
            />
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium text-gray-700">Nome do Grupo</label>
            <input type="text" className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg" required />
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium text-gray-700">Quantidade de Alunos</label>
            <select 
              value={quantityStudents} 
              onChange={handleQuantidadeChange} 
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg"
            >
              {[...Array(maxMembers)].map((_, num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          {members.map((_, index) => (
            <div key={index} className="mb-6">
              <label className="block text-xl font-medium text-gray-700">Nome do Integrante {index + 1}</label>
              <input 
                type="text" 
                value={members[index]} 
                onChange={(e) => handleIntegranteChange(index, e.target.value)} 
                className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg" 
                required 
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xl font-medium text-gray-700">Início das Inscrições</label>
              <input type="date" value={initialRegistration} readOnly className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg bg-gray-200" />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700">Fim das Inscrições</label>
              <input type="date" value={registrationEnd} readOnly className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-lg bg-gray-200" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#4F85A6] text-white py-3 text-xl rounded-lg hover:bg-[#3C6B88] transition mt-6">
            Inscrever
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscricao;
