import React from "react";
import { User, IdCard, Mail, Lock, Layers } from "lucide-react";

const Cadastro: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Seção da esquerda (Logo e Texto) */}
      <div className="w-1/2 bg-[#4F85A6] flex flex-col justify-center items-center text-white p-10">
        <img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
        <h1 className="text-5xl font-bold mt-4">FHO</h1>
        <p className="text-lg text-center mb-6">
          Para acessar sua conta da Maratona de Programação
        </p>
        <button className="px-6 py-2 border border-white rounded-lg text-white hover:bg-white hover:text-[#4F85A6] transition">
          Login
        </button>
      </div>

      {/* Seção da direita (Formulário de Cadastro) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold text-[#4F85A6] mb-6">Crie sua conta</h2>

        <div className="w-full max-w-sm space-y-4">
          {/* Nome */}
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#4F85A6]">
              <User className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* RA do Aluno */}
          <div className="mb-4">
            <label className="block text-gray-700">RA do aluno</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#4F85A6]">
              <IdCard className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Digite seu RA"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* E-mail Institucional */}
          <div className="mb-4">
            <label className="block text-gray-700">E-mail Institucional</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#4F85A6]">
              <Mail className="text-gray-500 mr-2" size={20} />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#4F85A6]">
              <Lock className="text-gray-500 mr-2" size={20} />
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Ano de Ingresso */}
          <div className="mb-4">
            <label className="block text-gray-700">Ano de Ingresso</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#4F85A6]">
              <Layers className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Digite o ano de ingresso"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Botão Criar Conta */}
          <button className="w-full bg-[#4F85A6] text-white p-2 rounded-lg hover:bg-[#3C6B88] transition">
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
