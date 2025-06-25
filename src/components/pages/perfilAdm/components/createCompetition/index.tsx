"use client"

import type React from "react"
import { useState } from "react"
import { Clock, Trophy, FileText, Settings, CheckCircle } from "lucide-react"
import SideMenu from "@/components/_ui/SideMenu"
import Navbar from "@/components/_ui/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/Card"
import Input from "@/components/_ui/Input"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import { Badge } from "@/components/_ui/Badge"
import { Checkbox } from "@/components/_ui/Checkbox"

const CreateCompetition: React.FC = () => {
  const [exerciseCount, setExerciseCount] = useState("2")
  const [exerciseTitleFilter, setExerciseTitleFilter] = useState("")
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  const [duration, setDuration] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [stopAnswering, setStopAnswering] = useState("")
  const [stopScoreboard, setStopScoreboard] = useState("")
  const [penalty, setPenalty] = useState("")
  const [maxFileSize, setMaxFileSize] = useState("")
  const [competitionName, setCompetitionName] = useState("")

  const exercisesMock = [
    "Exercício 1 - Título exemplo",
    "Exercício 2 - Título exemplo",
    "Exercício 3 - Título exemplo",
    "Exercício 4 - Outro exemplo",
    "Exercício 5 - Mais um título",
    "Exercício 6 - Desafio de lógica",
    "Exercício 7 - Algoritmo complexo",
    "Exercício 8 - Estruturas de dados",
    "Exercício 9 - Programação dinâmica",
    "Exercício 10 - Grafos",
    "Exercício 11 - Backtracking",
    "Exercício 12 - Geometria computacional",
    "Exercício 13 - Teoria dos números",
    "Exercício 14 - Strings e regex",
    "Exercício 15 - Programação orientada a objetos",
  ]

  const toggleExercise = (exercise: string) => {
    setSelectedExercises((prev) => (prev.includes(exercise) ? prev.filter((e) => e !== exercise) : [...prev, exercise]))
  }

  const filteredExercises = exercisesMock
    .filter((ex) => ex.toLowerCase().includes(exerciseTitleFilter.toLowerCase()))
    .slice(0, Number.parseInt(exerciseCount))

  const handleCreateCompetition = () => {
    console.log("Configurações da Maratona:")
    console.log("Nome da Maratona:", competitionName)
    console.log("Quantidade de Exercícios:", exerciseCount)
    console.log("Exercícios Selecionados:", selectedExercises)
    console.log("Data de Início:", startDate)
    console.log("Hora de Início:", startTime)
    console.log("Duração:", duration, "minutos")
    console.log("Parar Respostas em:", stopAnswering, "minutos")
    console.log("Parar Placar em:", stopScoreboard, "minutos")
    console.log("Penalidade:", penalty, "minutos")
    console.log("Tamanho Máximo do Arquivo:", maxFileSize, "KB")

    alert("Maratona configurada (verifique o console para os dados)!")
  }

  const isFormValid =
    selectedExercises.length === Number.parseInt(exerciseCount) &&
    competitionName &&
    startDate &&
    startTime &&
    duration &&
    stopAnswering &&
    stopScoreboard &&
    penalty &&
    maxFileSize

  return (
    <div className="min-h-screen bg-[#e9edee]">
      <Navbar />

      <div className="flex">
        <SideMenu />

        <div className="flex-1">
          <div className="container mx-auto p-8 space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold text-[#3f3c40] flex items-center gap-6">
                  <Trophy className="h-16 w-16 text-[#4F85A6]" />
                  Criar Maratona
                </h1>
                <p className="text-2xl text-[#4F85A6] mt-4">Configure uma nova competição de programação</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-12">
                {/* Basic Information */}
                <Card className="bg-white border-[#e9edee] shadow-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                      <FileText className="h-8 w-8 text-[#4F85A6]" />
                      Informações Básicas
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Configure os dados principais da maratona
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4">Nome da Maratona</label>
                      <Input
                        type="text"
                        placeholder="Ex: XII Olimpíada de Raciocínio Lógico"
                        value={competitionName}
                        onChange={(e) => setCompetitionName(e.target.value)}
                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">Data de Início</label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">Hora de Início</label>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Time Configuration */}
                <Card className="bg-white border-[#e9edee] shadow-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                      <Clock className="h-8 w-8 text-[#4F85A6]" />
                      Configurações de Tempo
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Defina os tempos da competição em minutos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                          Duração da Maratona (min)
                        </label>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Ex: 90"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                          Parar de Responder (min)
                        </label>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Ex: 85"
                          value={stopAnswering}
                          onChange={(e) => setStopAnswering(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">Parar Placar (min)</label>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Ex: 80"
                          value={stopScoreboard}
                          onChange={(e) => setStopScoreboard(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">Penalidade (min)</label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Ex: 30"
                          value={penalty}
                          onChange={(e) => setPenalty(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Configuration */}
                <Card className="bg-white border-[#e9edee] shadow-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                      <Settings className="h-8 w-8 text-[#4F85A6]" />
                      Configurações do Sistema
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Configurações técnicas da competição
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                          Quantidade de Exercícios (2-15)
                        </label>
                        <Input
                          type="number"
                          min={2}
                          max={15}
                          value={exerciseCount}
                          onChange={(e) => setExerciseCount(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                          Tamanho Máximo do Arquivo (KB)
                        </label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Ex: 100"
                          value={maxFileSize}
                          onChange={(e) => setMaxFileSize(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Exercise Selection */}
                <Card className="bg-white border-[#e9edee] shadow-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                      <CheckCircle className="h-8 w-8 text-[#4F85A6]" />
                      Seleção de Exercícios
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Escolha {exerciseCount} exercícios para a competição
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4">Filtrar por Título</label>
                      <Input
                        type="text"
                        placeholder="Digite o título do exercício"
                        value={exerciseTitleFilter}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExerciseTitleFilter(e.target.value)}
                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                      />
                    </div>

                    <div className="max-h-96 overflow-y-auto border border-[#e9edee] rounded-lg p-8 space-y-6">
                      {filteredExercises.map((exercise) => (
                        <div key={exercise} className="flex items-center space-x-6 p-4 hover:bg-[#e9edee]/50 rounded">
                          <Checkbox
                            checked={selectedExercises.includes(exercise)}
                            onCheckedChange={() => toggleExercise(exercise)}
                            className="border-[#4F85A6] data-[state=checked]:bg-[#4F85A6] w-6 h-6"
                          />
                          <label className="text-xl text-[#3f3c40] cursor-pointer flex-1">{exercise}</label>
                        </div>
                      ))}
                    </div>

                    {selectedExercises.length !== Number.parseInt(exerciseCount) && (
                      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xl text-red-600">
                          Você deve selecionar exatamente {exerciseCount} exercícios. Atualmente selecionados:{" "}
                          {selectedExercises.length}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div className="space-y-12">
                <Card className="bg-white border-[#e9edee] shadow-sm sticky top-6">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl text-[#3f3c40]">Resumo da Configuração</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Nome:</span>
                        <span className="text-lg text-[#3f3c40] font-medium">{competitionName || "Não definido"}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Data:</span>
                        <span className="text-lg text-[#3f3c40] font-medium">{startDate || "Não definida"}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Hora:</span>
                        <span className="text-lg text-[#3f3c40] font-medium">{startTime || "Não definida"}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Duração:</span>
                        <span className="text-lg text-[#3f3c40] font-medium">
                          {duration ? `${duration} min` : "Não definida"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Exercícios:</span>
                        <Badge
                          variant={
                            selectedExercises.length === Number.parseInt(exerciseCount) ? "default" : "secondary"
                          }
                          className={
                            selectedExercises.length === Number.parseInt(exerciseCount)
                              ? "bg-[#4F85A6] text-white text-lg px-4 py-2"
                              : "bg-[#e9edee] text-[#3f3c40] text-lg px-4 py-2"
                          }
                        >
                          {selectedExercises.length}/{exerciseCount}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-[#e9edee]">
                      <ButtonAdm
                        onClick={handleCreateCompetition}
                        disabled={!isFormValid}
                        className="w-full bg-[#4F85A6] hover:bg-[#3f3c40] text-white disabled:opacity-50 disabled:cursor-not-allowed text-xl h-10"
                      >
                        <Trophy className="w-6 h-6 mr-3" />
                        Criar Maratona
                      </ButtonAdm>
                    </div>

                    {!isFormValid && (
                      <div className="text-lg text-[#4F85A6] space-y-3">
                        <p>Para criar a maratona, complete:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {!competitionName && <li>Nome da maratona</li>}
                          {!startDate && <li>Data de início</li>}
                          {!startTime && <li>Hora de início</li>}
                          {!duration && <li>Duração</li>}
                          {selectedExercises.length !== Number.parseInt(exerciseCount) && (
                            <li>Seleção de exercícios</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCompetition
