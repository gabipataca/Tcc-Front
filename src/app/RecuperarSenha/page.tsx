import React from "react";
import { Mail } from "lucide-react";

export default function RedefinirSenha() {
  return (
    <div className="flex h-screen">
      {/* Lado esquerdo */}
      <div className="w-1/2 bg-[#4f85a0] text-white flex flex-col items-center justify-center p-10">
        <img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
        <h1 className="text-5xl font-bold mt-4">FHO</h1>
        <p className="text-lg text-center mb-6">
          Caso já possua conta, clique abaixo para fazer login
        </p>
        <button className="px-6 py-2 border border-white rounded-lg text-white hover:bg-white hover:text-[#4f85a0] transition">
          Login
        </button>
      </div>

      {/* Lado direito */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold text-[#4f85a0] mb-4">Redefinição de senha</h2>
        <p className="text-gray-600 mb-6 text-center">
          Digite seu e-mail no campo abaixo para redefinir sua senha
        </p>
        <div className="w-full max-w-sm">
          {/* Campo de E-mail */}
          <div className="mb-4">
            <label className="block text-gray-700">E-mail Institucional</label>
            <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-[#4f85a0]">
              <Mail className="text-gray-500 mr-2" size={20} />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Botão Recuperar */}
          <button className="w-full py-3 px-6 rounded-lg text-white bg-[#4f85a0] hover:bg-[#42738e] transition">
            Recuperar
          </button>
        </div>
      </div>
    </div>
  );
}