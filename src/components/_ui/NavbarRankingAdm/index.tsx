
import { FaSignOutAlt } from "react-icons/fa";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function NavRanking({ children }: Props) {
  return (
    <div className="flex flex-col max-h-screen bg-gray-200">
      {/* Navbar fixa no topo */}
      <div className="bg-[#4F85A6] text-white flex justify-between items-center p-4 px-6">
        <nav className="flex space-x-6 text-lg">
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Home</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Usuários</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Logs</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Tasks</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Configurações</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Duvidas</a>
           <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Correção</a>
        </nav>
        <button className="text-white">
          <FaSignOutAlt size={24} />
        </button>
      </div>

      {/* Conteúdo da página */}
      <main className="flex-1 p-4 flex overflow-auto">
        {children}
      </main>
    </div>
  );
}
