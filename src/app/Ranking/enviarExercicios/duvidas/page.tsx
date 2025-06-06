import { FaSignOutAlt } from "react-icons/fa";

export default function AnaliseJuiz() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Navbar Superior */}
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
        <button className="text-white">
          <FaSignOutAlt size={24} />
        </button>
      </div>

      {/* Card Principal */}
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-16 rounded-xl shadow-lg w-[700px] text-center">
          <h2 className="text-4xl font-bold text-[#4F85A6] mb-6 tracking-wide">
            Retire suas dúvidas sobre o exercício
          </h2>

          {/* Escolha do exercício */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg mb-2">Escolha o exercício:</label>
            <div className="flex justify-center mt-2">
              <select className="border rounded px-3 py-2 w-40">
                {[...'ABCDEFGHIJ'].map((letter) => (
                  <option key={letter}>{letter}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Escolha da linguagem */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg mb-2">Escolha a Linguagem:</label>
            <select className="border rounded px-3 py-2 mt-2 w-40">
              {["C", "C++", "C#", "Java", "PHP", "Python"].map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Campo de dúvidas */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg mb-2">Escreva suas dúvidas:</label>
            <textarea
              rows={4}
              className="w-full border rounded px-3 py-2 resize-none"
              placeholder="Digite aqui sua dúvida sobre o exercício..."
            />
          </div>

          {/* Botão de envio */}
          <button className="bg-[#4F85A6] text-white px-6 py-3 rounded text-lg">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
