export default function RedefinirSenha() {
    return (
      <div className="flex h-screen">
        {/* Lado esquerdo */}
        <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold mb-6">Logo FHO</h1>
          <p className="text-lg text-center mb-4">
            Caso já possua conta, clique abaixo para fazer login
          </p>
          <button className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition">
            Login
          </button>
        </div>
        
       { /* Lado direito */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Redefinição de senha</h2>
          <p className="text-gray-600 mb-6 text-center">
            Digite seu e-mail no campo abaixo para redefinir sua senha
          </p>
          <div className="w-full max-w-sm">
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                📧
              </span>
              <input
                type="email"
                placeholder="E-mail Institucional"
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Recuperar
            </button>
          </div>
        </div>
      </div>
    );
  }
  