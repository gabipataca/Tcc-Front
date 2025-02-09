import { FaSignOutAlt } from "react-icons/fa";

export default function PerfilAluno() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-700 text-white flex flex-col items-center p-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
          <span className="text-black">📷</span>
        </div>
        <h2 className="text-xl font-bold">Nome</h2>
        <p>RA: xxxxx</p>
        <p>Ano de ingresso: XXXX</p>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-blue-700 p-4 rounded-lg text-white mb-4">
          <h1 className="text-xl font-bold">Perfil do Aluno</h1>
          <button className="text-white text-2xl">
            <FaSignOutAlt />
          </button>
        </div>

        {/* Informações do Aluno e Grupo */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-blue-700">Informações do Aluno</h2>
            <p>Nome: xxxxxxx</p>
            <p>Data de nascimento: xx/xx/xxxx</p>
            <p>E-mail: xxxxxxxxxxxxxx</p>
            <p>RA: xxxxxxxxxxx</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-blue-700">Informações do Grupo</h2>
            <p>Nome do grupo: xxxxxxx</p>
            <p>Lista de integrantes: xxxxxx</p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">Criar Grupo</button>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">Iniciar Maratona</button>
        </div>

        {/* Histórico de Competição e Equipe Campeã */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700">Histórico de Competição</h2>
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Ano</th>
                  <th className="border border-gray-300 p-2">Nome grupo</th>
                  <th className="border border-gray-300 p-2">Questões acertadas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">----</td>
                  <td className="border border-gray-300 p-2">----</td>
                  <td className="border border-gray-300 p-2">----</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700">Equipe Campeã</h2>
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Ano</th>
                  <th className="border border-gray-300 p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">----</td>
                  <td className="border border-gray-300 p-2">----</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
