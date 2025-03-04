import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSignOutAlt } from "react-icons/fa";

export default function Ranking() {
  const data = [
    { user: "Equipe 1", scores: ["🔵", "🟢", "", "", "🔵", "🟣", "🟡", "", "", ""], total: 100 },
    { user: "Equipe 2", scores: ["🟠", "🔵", "", "🟢", "", "🔴", "", "🟣", "", ""], total: 90 },
    { user: "Equipe 3", scores: ["", "🟢", "🟡", "", "🟠", "", "", "🔵", "", ""], total: 85 },
    { user: "Equipe 4", scores: ["🔴", "", "🔵", "", "", "", "🟢", "", "🟣", ""], total: 80 },
    { user: "Equipe 5", scores: ["", "🟠", "", "🟢", "", "", "", "🔵", "", ""], total: 75 },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-200">
      {/* Navbar Superior */}
      <div className="bg-[#4F85A6] text-white mb-4 flex justify-between items-center p-3 px-6">
        <nav className="flex space-x-6 text-lg">
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Home</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Enviar Exercício</a>
          <span>|</span>
          <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white">Ranking</a>
          <span>|</span>
        </nav>
        <button className="text-white ml-auto">
          <FaSignOutAlt size={24} />
        </button>
      </div>

      {/* Ranking Table */}
      <div className="bg-[#4F85A6] p-4 rounded-xl shadow-lg">
        <Table responsive bordered hover className="text-center">
          <thead className="bg-[#4F85A6] text-white">
            <tr>
              <th>#</th>
              <th>Equipe</th>
              {Array.from("ABCDEFGHIJ").map((letter) => (
                <th key={letter}>{letter}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="fw-bold">{index + 1}</td>
                <td>{item.user}</td>
                {item.scores.map((score, i) => (
                  <td key={i}>{score}</td>
                ))}
                <td className="fw-bold">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
