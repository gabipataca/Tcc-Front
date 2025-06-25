"use client"

import type React from "react"
import { useState } from "react"
import { Trophy, Users, Calendar, CheckCircle, FileText } from "lucide-react"
import SideMenu from "@/components/_ui/SideMenu"
import Navbar from "@/components/_ui/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/Card"
import Input from "@/components/_ui/Input"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import { Badge } from "@/components/_ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/_ui/Select"

const CompetitionRegistration: React.FC = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [maxMembers, setMaxMembers] = useState("3")
  const [initialDate, setInitialDate] = useState("")
  const [initialRegistration, setInitialRegistration] = useState("")
  const [endRegistration, setEndRegistration] = useState("")
  const [status, setStatus] = useState("Fechado")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dataCompetition = {
      name,
      description,
      maxMembers: Number(maxMembers),
      initialDate,
      initialRegistration,
      endRegistration,
      status,
    }
    console.log(dataCompetition)
    alert("Maratona criada com sucesso!")
  }

  const isFormValid = name && description && initialDate && initialRegistration && endRegistration

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
                <h1 className="text-4xl font-bold text-[#3f3c40] flex items-center gap-6">
                  <Trophy className="h-14 w-14 text-[#4F85A6]" />
                  Modelo de Inscrição
                </h1>
                <p className="text-xl text-[#4F85A6] mt-4">Configure as inscrições para a maratona de programação</p>
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
                      Informações da Maratona
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Configure os dados principais da competição
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4">Nome da Maratona</label>
                      <Input
                        type="text"
                        placeholder="Ex: XII Olimpíada de Raciocínio Lógico"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4">Descrição</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva os objetivos e características da maratona..."
                        className="w-full min-h-32 border border-[#e9edee] rounded-md px-6 py-4 text-xl text-[#3f3c40] focus:border-[#4F85A6] focus:ring-2 focus:ring-[#4F85A6] focus:ring-offset-2 resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4">Status da Maratona</label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#e9edee]">
                          <SelectItem value="Aberto" className="text-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              Aberto
                            </div>
                          </SelectItem>
                          <SelectItem value="Fechado" className="text-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              Fechado
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Configuration */}
                <Card className="bg-white border-[#e9edee] shadow-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                      <Users className="h-8 w-8 text-[#4F85A6]" />
                      Configuração de Equipes
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Defina as regras para formação de grupos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                        Número Máximo de Integrantes por Grupo
                      </label>
                      <Select value={maxMembers} onValueChange={setMaxMembers}>
                        <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6">
                          <SelectValue placeholder="Selecione o número máximo" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#e9edee]">
                          {[1, 2, 3].map((num) => (
                            <SelectItem key={num} value={num.toString()} className="text-lg">
                              <div className="flex items-center gap-3">
                                <Users className="h-4 w-4 text-[#4F85A6]" />
                                {num} {num === 1 ? "integrante" : "integrantes"}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Date Configuration */}
                <Card className="bg-white border-[#e9edee] shadow-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                      <Calendar className="h-8 w-8 text-[#4F85A6]" />
                      Configuração de Datas
                    </CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6] mt-2">
                      Defina o cronograma da competição
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">Início das Inscrições</label>
                        <Input
                          type="date"
                          value={initialRegistration}
                          onChange={(e) => setInitialRegistration(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">Fim das Inscrições</label>
                        <Input
                          type="date"
                          value={endRegistration}
                          onChange={(e) => setEndRegistration(e.target.value)}
                          className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xl font-medium text-[#3f3c40] mb-4 text-center">
                        Data da Maratona
                      </label>
                      <div className="flex justify-center">
                        <Input
                          type="date"
                          value={initialDate}
                          onChange={(e) => setInitialDate(e.target.value)}
                          className="w-1/2 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                          required
                        />
                      </div>
                    </div>
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
                        <span className="text-lg text-[#3f3c40] font-medium">{name || "Não definido"}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Status:</span>
                        <Badge
                          variant={status === "Aberto" ? "default" : "secondary"}
                          className={
                            status === "Aberto"
                              ? "bg-green-500 text-white text-lg px-4 py-2"
                              : "bg-red-500 text-white text-lg px-4 py-2"
                          }
                        >
                          {status}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Max. Integrantes:</span>
                        <Badge
                          variant="outline"
                          className="border-[#9abbd6] text-[#4F85A6] bg-[#9abbd6]/10 text-lg px-4 py-2"
                        >
                          {maxMembers} {Number(maxMembers) === 1 ? "pessoa" : "pessoas"}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg text-[#4F85A6]">Data da Maratona:</span>
                        <span className="text-lg text-[#3f3c40] font-medium">
                          {initialDate
                            ? new Date(initialDate + "T00:00:00").toLocaleDateString("pt-BR")
                            : "Não definida"}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg text-[#4F85A6]">Inscrições:</span>
                        </div>
                        <div className="text-sm text-[#3f3c40] space-y-1">
                          <div>
                            Início:{" "}
                            {initialRegistration
                              ? new Date(initialRegistration + "T00:00:00").toLocaleDateString("pt-BR")
                              : "Não definido"}
                          </div>
                          <div>
                            Fim:{" "}
                            {endRegistration
                              ? new Date(endRegistration + "T00:00:00").toLocaleDateString("pt-BR")
                              : "Não definido"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-[#e9edee]">
                      <ButtonAdm
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className="w-full bg-[#4F85A6] hover:bg-[#3f3c40] text-white disabled:opacity-50 disabled:cursor-not-allowed text-xl h-16"
                      >
                        <CheckCircle className="w-6 h-6 mr-3" />
                        Liberar Inscrição
                      </ButtonAdm>
                    </div>

                    {!isFormValid && (
                      <div className="text-lg text-[#4F85A6] space-y-3">
                        <p>Para liberar as inscrições, complete:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {!name && <li>Nome da maratona</li>}
                          {!description && <li>Descrição</li>}
                          {!initialDate && <li>Data da maratona</li>}
                          {!initialRegistration && <li>Início das inscrições</li>}
                          {!endRegistration && <li>Fim das inscrições</li>}
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

export default CompetitionRegistration
