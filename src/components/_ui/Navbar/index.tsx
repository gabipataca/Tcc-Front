import { FaSignOutAlt } from "react-icons/fa";



const Navbar = () => {
    return (
        <div className = "bg-[#4F85A6] text-white flex justify-between items-center p-3 px-6">
          <nav className="flex space-x-6 text-lg">
            <a href="#" className="hover:underline">Home</a>
            <span>|</span>
            <a href="#" className="hover:underline">Inscrições</a>
            <span>|</span>
            <a href="#" className="hover:underline">Criar Maratona</a>
            <span>|</span>
            <a href="#" className="hover:underline">Estatísticas</a>
            <span>|</span>
            <a href="#" className="hover:underline">Ranking</a>
            <span>|</span>
          </nav>
          <button className="text-white ml-auto">
            <FaSignOutAlt size={24} />
          </button>
        </div>
    );
}

export default Navbar;