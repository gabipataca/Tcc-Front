import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Seção da esquerda (Login) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold mb-8 text-[#4f85a0]">LOGIN</h1>

        <div className="w-full max-w-sm">
          {/* Campo Usuário */}
          <div className="mb-4">
            <label className="block text-gray-700">Usuário</label>
            <input
              type="text"
              placeholder="Digite o RA do aluno"
              className="w-full p-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#4f85a0]"
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite a senha do usuário"
              className="w-full p-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#4f85a0]"
            />
          </div>

          {/* Opções adicionais */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Lembre-me
            </label>
            <a href="#" className="text-[#4f85a0] text-sm">Esqueceu a senha?</a>
          </div>

          {/* Botão Entrar */}
          <button className="w-full bg-[#4f85a0] text-white p-2 rounded-lg hover:bg-[#42738e]">
            Entrar
          </button>

          {/* Link para inscrição */}
          <p className="mt-4 text-sm text-center">
            Não tem uma conta? <a href="#" className="text-[#4f85a0]">Inscreva-se</a>
          </p>
        </div>
      </div>

      {/* Seção da direita (Logo + Texto "FHO") */}
      <div className="w-1/2 bg-[#4f85a0] flex flex-col justify-center items-center">
        <img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
        <p className="text-white text-[60px] font-bold tracking-wider ml-10">FHO</p>  
      </div>
    </div>
  );
};

export default Login;
