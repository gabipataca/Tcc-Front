import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Seção da esquerda (Login) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-8">LOGIN</h1>

        <div className="w-full max-w-sm">
          {/* Campo Usuário */}
          <div className="mb-4">
            <label className="block text-gray-700">Usuário</label>
            <input
              type="text"
              placeholder="Digite o RA do aluno"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite a senha do usuário"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Opções adicionais */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Lembre-me
            </label>
            <a href="#" className="text-blue-600 text-sm">Esqueceu a senha?</a>
          </div>

          {/* Botão Entrar */}
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Entrar
          </button>

          {/* Link para inscrição */}
          <p className="mt-4 text-sm text-center">
            Não tem uma conta? <a href="#" className="text-blue-600">Inscreva-se</a>
          </p>
        </div>
      </div>

      {/* Seção da direita (Logo) */}
      <div className="w-1/2 bg-blue-600 flex justify-center items-center text-white text-3xl">
        Logo Falcon
      </div>
    </div>
  );
};

export default Login;
