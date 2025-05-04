import Balao from "@/components/_ui/Balao";
import balaoVermelho from "../balaoList/balao-vermelho.svg";
import balaoLilas from "../balaoList/balao-lilas.svg";
import balaoVerde from "../balaoList/balao-verde.svg";
import balaoLaranja from "../balaoList/balao-laranja.svg";
import balaoRosa from "../balaoList/balao-rosa.svg";
import balaoCinza from "../balaoList/balao-cinza.svg";
import balaoVinho from "../balaoList/balao-vinho.svg";
import balaoVerdeAgua from "../balaoList/balao-verdeAgua.svg";
import balaoMarrom from "../balaoList/balao-marrom.svg";
import balaoPreto from "../balaoList/balao-preto.svg";
import { FaSignOutAlt } from "react-icons/fa";
import { ReactNode } from "react";

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const balaoPorLetra: Record<string, string> = {
  A: balaoVermelho,
  B: balaoLilas,
  C: balaoVerde,
  D: balaoLaranja,
  E: balaoMarrom,
  F: balaoRosa,
  G: balaoPreto,
  H: balaoCinza,
  I: balaoVerdeAgua,
  J: balaoVinho,
};

const data = [
  {
    user: "Equipe 1",
    acertos: ["A", "B", "C", "E", "F", "G", "I", "J"],
    tempos: {
      A: "2/64",
      B: "1/16",
      C: "1/99",
      E: "1/31",
      F: "1/7",
      G: "1/162",
      I: "1/88",
      J: "2/47",
    },
    total: 100,
  },
  {
    user: "Equipe 2",
    acertos: ["A", "B", "C", "D", "F", "H", "I", "J"],
    tempos: {
      A: "1/152",
      B: "1/113",
      C: "2/91",
      D: "1/185",
      F: "2/76",
      H: "1/77",
      I: "1/54",
      J: "1/39",
    },
    total: 90,
  },
];

function NavRanking({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      {/* Navbar Superior */}
      <div className="bg-[#4F85A6] text-white flex justify-between items-center p-4 px-6">
        <nav className="flex space-x-6 text-lg">
          <a href="#" className="hover:border-b-2 hover:border-white">Home</a>
          <span>|</span>
          <a href="#" className="hover:border-b-2 hover:border-white">Enviar Exercício</a>
          <span>|</span>
          <a href="#" className="hover:border-b-2 hover:border-white">Ranking</a>
          <span>|</span>
          <a href="#" className="hover:border-b-2 hover:border-white">Dúvidas</a>
        </nav>
        <button className="text-white">
          <FaSignOutAlt size={24} />
        </button>
      </div>

      {/* Conteúdo abaixo da navbar */}
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  );
}

export default function RankingPage() {
  return (
    <NavRanking>
      <table className="w-full text-center border border-[#4F85A6] border-collapse">
        <thead className="bg-[#4F85A6] text-white text-lg">
          <tr>
            <th className="border border-[#4F85A6]">#</th>
            <th className="border border-[#4F85A6]">Equipe</th>
            {letras.map((letra) => (
              <th key={letra} className="border border-[#4F85A6]">
                {letra}
              </th>
            ))}
            <th className="border border-[#4F85A6]">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((equipe, index) => (
            <tr key={index} className="text-base">
              <td className="border border-[#4F85A6]">{index + 1}</td>
              <td className="border border-[#4F85A6]">{equipe.user}</td>
              {letras.map((letra) => {
                const acertou = equipe.acertos.includes(letra);
                return (
                  <td key={letra} className="border border-[#4F85A6] py-2">
                    {acertou ? (
                      <Balao
                        src={balaoPorLetra[letra]}
                        alt={`Balão ${letra}`}
                        tempo={equipe.tempos[letra]}
                      />
                    ) : null}
                  </td>
                );
              })}
              <td className="border border-[#4F85A6] font-bold">{equipe.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </NavRanking>
  );
}
