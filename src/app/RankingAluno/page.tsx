"use client";

import Balao from "@/components/_ui/Balao";
import React from "react";
import NavbarRanking from "@/components/_ui/NavbarRanking"; 
import Table from "@/components/_ui/Table";
import TableHeader from "@/components/_ui/Table/components/TableHeader";
import TableBody from "@/components/_ui/Table/components/TableBody";
import TableHeaderItem from "@/components/_ui/Table/components/TableHeaderItem";
import TableRow from "@/components/_ui/Table/components/TableRow";
import TableCell from "@/components/_ui/Table/components/TableCell";
import { TableContainer as TableContainerMui } from "@mui/material";
import TableContainer from "@/components/_ui/Table/components/TableContainer"; 
import { StyledRankingCellContainer } from "@/components/pages/ranking/styles";

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

interface GroupRankingData {
  group: string;
  exercisesAccepteds: string[];
  times: { [key: string]: string };
  total: string;
  totalCount: number;
  totalScore: number;
}

const colors = [
  "#979797",
  "#33353a",
  "#d46314",
  "#db7271",
  "#5c3b22",
  "#d35de9",
  "#4500d4",
  "#478898",
  "#08b2cb",
  "#c42321",
  "#934383",
  "#EFAF10",
  "#F0C5C9",
  "#856EBC",
  "#80A582",
];

const data: GroupRankingData[] = [
  {
    group: "Equipe 1",
    exercisesAccepteds: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    times: {
      A: "2/64",
      B: "1/16",
      C: "1/99",
      D: "2/80",
      E: "1/31",
      F: "1/7",
      G: "1/162",
      H: "3/120",
      I: "1/88",
      J: "2/47",
    },
    total: "9 (740)",
    totalCount: 9,
    totalScore: 740,
  },
  {
    group: "Equipe 2",
    exercisesAccepteds: ["A", "B", "C", "D", "E", "F", "G", "H"],
    times: {
      A: "1/152",
      B: "1/113",
      C: "2/91",
      D: "1/185",
      E: "1/89",
      F: "2/76",
      G: "1/90",
      H: "1/77",
      I: "1/54",
      J: "1/39",
    },
    total: "8 (640)",
    totalCount: 8,
    totalScore: 640,
  },
  {
    group: "Equipe 3",
    exercisesAccepteds: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    times: {
      A: "2/64",
      B: "1/16",
      C: "1/99",
      D: "2/80",
      E: "1/31",
      F: "1/7",
      G: "1/162",
      H: "3/120",
      I: "1/88",
      J: "2/47",
    },
    total: "10 (480)",
    totalCount: 10,
    totalScore: 480,
  },
  {
    group: "Equipe 4",
    exercisesAccepteds: ["A", "B", "C", "D", "E", "F", "G"],
    times: {
      A: "1/152",
      B: "1/113",
      C: "2/91",
      D: "1/185",
      E: "1/89",
      F: "2/76",
      G: "1/90",
      H: "1/77",
      I: "1/54",
      J: "1/39",
    },
    total: "7 (520)",
    totalCount: 7,
    totalScore: 520,
  },
  {
    group: "Equipe 5",
    exercisesAccepteds: ["A", "B", "C", "E", "F", "H"],
    times: {
      A: "1/120",
      B: "2/110",
      C: "1/95",
      D: "",
      E: "1/80",
      F: "1/60",
      G: "",
      H: "2/70",
      I: "1/50",
      J: "",
    },
    total: "6 (500)",
    totalCount: 6,
    totalScore: 500,
  },
  {
    group: "Equipe 6",
    exercisesAccepteds: ["A", "C", "D", "E", "G", "H"],
    times: {
      A: "2/140",
      B: "",
      C: "1/100",
      D: "1/130",
      E: "2/85",
      F: "",
      G: "1/120",
      H: "1/90",
      I: "",
      J: "1/60",
    },
    total: "6 (240)",
    totalCount: 6,
    totalScore: 240,
  },
  {
    group: "Equipe 7",
    exercisesAccepteds: ["B", "C", "D", "F", "G", "I"],
    times: {
      A: "",
      B: "1/115",
      C: "2/105",
      D: "1/125",
      E: "",
      F: "1/65",
      G: "2/100",
      H: "",
      I: "1/55",
      J: "1/45",
    },
    total: "6 (352)",
    totalCount: 6,
    totalScore: 352,
  },
  {
    group: "Equipe 8",
    exercisesAccepteds: ["A", "B", "E", "F", "G", "H", "I"],
    times: {
      A: "1/135",
      B: "1/120",
      C: "",
      D: "",
      E: "2/95",
      F: "1/75",
      G: "1/110",
      H: "1/85",
      I: "2/60",
      J: "1/40",
    },
    total: "7 (400)",
    totalCount: 7,
    totalScore: 400,
  },
];

// Ordena as equipes por número de exercícios acertados (decrescente)
data.sort((a, b) => {
  const aCount = a.exercisesAccepteds.length;
  const bCount = b.exercisesAccepteds.length;

  if (aCount == bCount) {
    const aTime = a.totalScore;
    const bTime = b.totalScore;

    return aTime - bTime;
  }

  return bCount - aCount;
});

const tableHeaderColumns = ["Equipe", ...letras, "Total"];

const RankingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavbarRanking />
      <TableContainerMui component={TableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaderColumns.map((column, idx) => (
                <TableHeaderItem
                  key={`${column}-${idx}`}
                  item={{ content: column, space: 1 }}
                />
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((data, idx) => (
              <TableRow key={`${data.group}-${idx}`}>
                <TableCell>{data.group}</TableCell>

                {letras.map((l, index) => (
                  <TableCell key={`${l}-${index}`}>
                    {data.exercisesAccepteds.includes(l) ? (
                      <StyledRankingCellContainer
                        $fillColor={colors[index]}
                        $size={40}
                      >
                        <Balao />
                        {data.times[l]}
                      </StyledRankingCellContainer>
                    ) : (
                      " "
                    )}
                  </TableCell>
                ))}
                <TableCell key={`${data.total}-${idx}`}>
                  {data.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerMui>
    </div>
  );
};

export default RankingPage;