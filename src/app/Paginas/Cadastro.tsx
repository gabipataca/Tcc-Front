import React from "react";

const CadastroLogin: React.FC = () => {
  return (
    <div className="flex h-screen"
      /* Lado esquerdo - Login */
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">Logo FHO</h1>
        <p className="text-lg mb-6 text-center">
          Para acessar sua conta da Maratona de Programação
        </p>
        <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-blue-600 transition">
          Login
        </button>
      </div>

      /* Lado direito - Cadastro */
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Crie sua conta</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input type="text" placeholder="Nome" className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="RA do aluno" className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="E-mail Institucional" className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Senha" className="w-full p-3 border rounded-md" />
          </div>
          <div className="mb-6">
            <input type="text" placeholder="Ano de Ingresso" className="w-full p-3 border rounded-md" />
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroLogin;
