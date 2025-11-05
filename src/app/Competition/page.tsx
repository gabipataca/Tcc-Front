"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import Balao from "@/components/_ui/Balao"
import { Box, Modal } from "@mui/material"
import Button from "@/components/_ui/Button"
import { StyledRankingCellContainer } from "@/components/pages/ranking/styles"
import AnaliseJuiz from "../Competition/analiseJugde"
import { useRanking } from "@/contexts/CompetitionHubContext/hooks/useRanking"
import { useCompetitionHub } from "@/contexts/CompetitionHubContext"

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

interface GroupRankingData {
  group: string
  exercisesAccepteds: string[]
  times: { [key: string]: string }
  total: string
  totalCount: number
  totalScore: number
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
]

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
    times: { A: "1/120", B: "2/110", C: "1/95", D: "", E: "1/80", F: "1/60", G: "", H: "2/70", I: "1/50", J: "" },
    total: "6 (500)",
    totalCount: 6,
    totalScore: 500,
  },
  {
    group: "Equipe 6",
    exercisesAccepteds: ["A", "C", "D", "E", "G", "H"],
    times: { A: "2/140", B: "", C: "1/100", D: "1/130", E: "2/85", F: "", G: "1/120", H: "1/90", I: "", J: "1/60" },
    total: "6 (240)",
    totalCount: 6,
    totalScore: 240,
  },
  {
    group: "Equipe 7",
    exercisesAccepteds: ["B", "C", "D", "F", "G", "I"],
    times: { A: "", B: "1/115", C: "2/105", D: "1/125", E: "", F: "1/65", G: "2/100", H: "", I: "1/55", J: "1/45" },
    total: "6 (352)",
    totalCount: 6,
    totalScore: 352,
  },
  {
    group: "Equipe 8",
    exercisesAccepteds: ["A", "B", "E", "F", "G", "H", "I"],
    times: { A: "1/135", B: "1/120", C: "", D: "", E: "2/95", F: "1/75", G: "1/110", H: "1/85", I: "2/60", J: "1/40" },
    total: "7 (400)",
    totalCount: 7,
    totalScore: 400,
  },
]

data.sort((a, b) => {
  if (a.totalCount === b.totalCount) return a.totalScore - b.totalScore
  return b.totalCount - a.totalCount
})

const RankingPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { liveRanking } = useRanking()
  const { requestRanking, isConnected } = useCompetitionHub()

  // Request ranking when the page loads and connection is ready
  useEffect(() => {
    if (isConnected) {
      requestRanking()
    }
  }, [isConnected, requestRanking])

  // Transform SignalR ranking data to component format
  const data = useMemo(() => {
    return liveRanking.map((rank) => {
      const exercisesAccepteds: string[] = []
      const times: { [key: string]: string } = {}

      // Process each exercise attempt
      rank.exerciseAttempts?.forEach((attempt) => {
        const exerciseLetter = letras[attempt.exerciseId - 1]
        if (!exerciseLetter) return

        // If there are attempts, the exercise was solved (accepted)
        if (attempt.attempts > 0 && !exercisesAccepteds.includes(exerciseLetter)) {
          exercisesAccepteds.push(exerciseLetter)
        }

        // Format: "attempts/time" (e.g., "2/64" means 2 attempts, 64 minutes)
        // Using a placeholder time since penalty is at ranking level, not per exercise
        times[exerciseLetter] = `${attempt.attempts}/-`
      })

      return {
        group: rank.group.name,
        exercisesAccepteds,
        times,
        total: `${rank.points} (${Math.round(rank.penalty)})`,
        totalCount: rank.points,
        totalScore: Math.round(rank.penalty),
      }
    })
  }, [liveRanking])

  return (
    <div className="relative flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {/* Botão que abre o modal */}
      <div className="flex justify-end mb-4 mt-4 w-full max-w-7xl">
        <Button
          className="bg-[#4F85A6] text-white px-6 py-2 rounded-md font-bold hover:bg-[#3B6A82] transition"
          onClick={() => setOpen(true)}
        >
          Enviar Exercícios
        </Button>
      </div>

      {/* Cabeçalho da Tabela */}
      <div className="w-full max-w-7xl">
        <div className="flex bg-[#4F85A6] text-white text-lg font-bold text-center rounded-t-2xl p-4">
          <div className="w-[8%]">#</div>
          <div className="w-[15%] text-left pl-2">Equipe</div>
          <div className="flex flex-1 justify-around">
            {letras.map((l) => (
              <div key={l} className="flex-1">
                {l}
              </div>
            ))}
          </div>
          <div className="w-[12%]">Total</div>
        </div>

        {/* Corpo da Tabela */}
        <div className="mt-4">
          {data.map((rowData, idx) => (
            <div
              key={`${rowData.group}-${idx}`}
              className="bg-white rounded-xl shadow-md mb-4 flex items-center p-4 transition-all duration-200 hover:shadow-xl cursor-pointer"
            >
              <div className="w-[8%] text-center">
                <span className="font-bold text-2xl text-gray-700">{idx + 1}º</span>
              </div>
              <div className="w-[15%] text-left pl-2">
                <span className="font-bold text-lg text-gray-800">{rowData.group}</span>
              </div>
              <div className="flex flex-1 justify-around">
                {letras.map((l, index) => (
                  <div key={`${l}-${index}`} className="flex-1 text-center flex flex-col items-center">
                    {rowData.exercisesAccepteds.includes(l) ? (
                      <StyledRankingCellContainer $fillColor={colors[index]} $size={60}>
                        <Balao />
                        <span className="text-sm mt-1">{rowData.times[l]}</span>
                      </StyledRankingCellContainer>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-[12%] text-center">
                <span className="font-bold text-lg text-gray-800">{rowData.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal com o componente separado */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <AnaliseJuiz />
        </Box>
      </Modal>
    </div>
  )
}

export default RankingPage
