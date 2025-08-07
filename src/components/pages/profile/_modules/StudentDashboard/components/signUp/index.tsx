"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Users, Calendar, Trophy, UserPlus, Clock } from "lucide-react"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/_ui/Card"
import Input from "@/components/_ui/Input"
import Label from "@/components/_ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/_ui/Select"
import { Badge } from "@/components/_ui/Badge"
import Navbar from "@/components/_ui/Navbar"
import SideMenu from "@/components/_ui/SideMenu"

const Inscricao: React.FC = () => {
  const [competitionName, setCompetitionName] = useState("")
  const [quantityStudents, setQuantityStudents] = useState(1)
  const [members, setMembers] = useState<string[]>([""])
  const [initialRegistration, setInitialRegistration] = useState("")
  const [registrationEnd, setRegistrationEnd] = useState("")
  const [maxMembers, setMaxMembers] = useState(3)
  const [groupName, setGroupName] = useState("")

  useEffect(() => {
    const fetchMaratonaConfig = async () => {
      const data = {
        nome: "Maratona de Programação 2024",
        initialRegistration: "2024-01-15",
        registrationEnd: "2024-02-15",
        maxMembers: 3,
      }
      setCompetitionName(data.nome)
      setInitialRegistration(data.initialRegistration)
      setRegistrationEnd(data.registrationEnd)
      setMaxMembers(data.maxMembers)
      setQuantityStudents(1)
      setMembers([""])
    }
    fetchMaratonaConfig()
  }, [])

  const handleQuantidadeChange = (value: string) => {
    const quantity = Number.parseInt(value, 10)
    setQuantityStudents(quantity)
    setMembers(Array(quantity).fill(""))
  }

  const handleIntegranteChange = (index: number, value: string) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { groupName, members, competitionName })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="flex">
        <SideMenu />

        <div className="flex-1">
          <div className="bg-white border-b border-slate-200 px-8 py-10 shadow-sm">
            <div className="max-w-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-[#4F85A6]" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-slate-900">Inscrição na Maratona</h1>
                  <p className="text-xl text-slate-600 mt-2">Registre sua equipe para a competição</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xl px-5 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  Inscrições Abertas
                </Badge>
                <span className="text-slate-600 text-xl">
                  Prazo até: {new Date(registrationEnd).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>

          <main className="px-8 py-10">
            <div className="max-w-screen-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                    <CardHeader className="bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg pb-8">
                      <CardTitle className="text-3xl text-[#4F85A6] flex items-center gap-4">
                        <Trophy className="h-7 w-7" />
                        Informações da Competição
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <Label htmlFor="competition-name" className="text-xl font-medium text-slate-700">
                            Nome da Maratona
                          </Label>
                          <Input
                            id="competition-name"
                            type="text"
                            value={competitionName}
                            readOnly
                            className="mt-2 text-xl p-4 bg-slate-50 cursor-not-allowed border-slate-200"
                          />
                        </div>
                        <div>
                          <Label className="text-xl font-medium text-slate-700">Máximo de Membros</Label>
                          <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-[#4F85A6]" />
                              <span className="text-xl font-semibold text-slate-900">{maxMembers} membros</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-slate-700 text-xl">Início das Inscrições</span>
                          </div>
                          <p className="text-xl font-semibold text-slate-900">
                            {new Date(initialRegistration).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 border border-red-100">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="h-5 w-5 text-red-600" />
                            <span className="text-xl text-slate-700 ">Fim das Inscrições</span>
                          </div>
                          <p className="text-xl font-semibold text-slate-900">
                            {new Date(registrationEnd).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                    <CardHeader className="bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg pb-8">
                      <CardTitle className="text-3xl text-[#4F85A6] flex items-center gap-4">
                        <Users className="h-7 w-7" />
                        Informações da Equipe
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                      <div>
                        <Label htmlFor="group-name" className="text-xl font-medium text-slate-700">
                          Nome do Grupo *
                        </Label>
                        <Input
                          id="group-name"
                          type="text"
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                          className="mt-2 text-lg p-4 border-slate-300 focus:border-[#4F85A6] focus:ring-[#4F85A6]"
                          placeholder="Digite o nome da sua equipe"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-xl font-medium text-slate-700">Quantidade de Alunos *</Label>
                        <Select value={quantityStudents.toString()} onValueChange={handleQuantidadeChange}>
                          <SelectTrigger className="mt-2 text-lg p-4 border-slate-300 focus:border-[#4F85A6] focus:ring-[#4F85A6]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(maxMembers)].map((_, num) => (
                              <SelectItem key={num + 1} value={(num + 1).toString()}>
                                {num + 1} {num + 1 === 1 ? "membro" : "membros"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Users className="h-6 w-6 text-[#4F85A6]" />
                          <h3 className="text-2xl font-semibold text-slate-900">Membros da Equipe</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {members.map((member, index) => (
                            <div key={index} className="space-y-2">
                              <Label htmlFor={`member-${index}`} className="text-xl font-medium text-slate-700">
                                {index === 0 ? "Líder da Equipe *" : `Integrante ${index + 1} *`}
                              </Label>
                              <div className="relative">
                                <Input
                                  id={`member-${index}`}
                                  type="text"
                                  value={member}
                                  onChange={(e) => handleIntegranteChange(index, e.target.value)}
                                  className="mt-2 text-base p-4 pl-12 border-slate-300 focus:border-[#4F85A6] focus:ring-[#4F85A6]"
                                  placeholder={
                                    index === 0 ? "Nome do líder da equipe" : `Nome do integrante ${index + 1}`
                                  }
                                  required
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                  {index === 0 ? (
                                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                      <span className="text-yellow-600 text-xs font-bold">L</span>
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
               
                <div className="flex justify-center pt-6">
                  <ButtonAdm
                    type="submit"
                    className="bg-[#4F85A6] hover:bg-[#3C6B88] text-white text-xl px-12 py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <UserPlus className="h-5 w-5 mr-3" />
                    Inscrever Equipe
                  </ButtonAdm>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Inscricao