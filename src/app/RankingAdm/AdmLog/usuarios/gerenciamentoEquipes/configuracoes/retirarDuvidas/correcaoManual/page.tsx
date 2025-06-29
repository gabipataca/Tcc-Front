"use client"

import { useState } from "react"
import NavbarRankingAdm from "@/components/_ui/NavbarRankingAdm"
import { Card, CardContent } from "@/components/_ui/Card"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import { Badge } from "@/components/_ui/Badge"
import { Download, Check, X, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/TableAdm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/_ui/Dialog"
import { Textarea } from "@/components/_ui/Textarea"
import Label from "@/components/_ui/Label"

interface ExerciseSubmission {
  id: string
  groupName: string
  submissionTime: string
  status: "pending" | "approved" | "rejected"
  errorType: string | null
  fileName: string
  fileUrl: string
}

const mockData: ExerciseSubmission[] = [
  {
    id: "1",
    groupName: "CyberKnights",
    submissionTime: "2025-06-26 14:30:15",
    status: "pending",
    errorType: null,
    fileName: "exercicio_1.py",
    fileUrl: "#",
  },
  {
    id: "2",
    groupName: "CodeMasters",
    submissionTime: "2025-06-26 14:25:42",
    status: "approved",
    errorType: null,
    fileName: "solucao.cpp",
    fileUrl: "#",
  },
  {
    id: "3",
    groupName: "BinaryBlazers",
    submissionTime: "2025-06-26 14:20:08",
    status: "rejected",
    errorType: "Erro de Sintaxe",
    fileName: "algoritmo.java",
    fileUrl: "#",
  },
  {
    id: "4",
    groupName: "AlgorithmicAvengers",
    submissionTime: "2025-06-26 14:15:33",
    status: "rejected",
    errorType: "Lógica Incorreta",
    fileName: "resposta.py",
    fileUrl: "#",
  },
  {
    id: "5",
    groupName: "SyntaxSyndicate",
    submissionTime: "2025-06-26 14:10:17",
    status: "pending",
    errorType: null,
    fileName: "exercicio_final.js",
    fileUrl: "#",
  },
  {
    id: "6",
    groupName: "The Debuggers",
    submissionTime: "2025-06-26 14:05:55",
    status: "approved",
    errorType: null,
    fileName: "solucao_otimizada.py",
    fileUrl: "#",
  },
  {
    id: "7",
    groupName: "BitBusters",
    submissionTime: "2025-06-26 14:00:22",
    status: "pending",
    errorType: null,
    fileName: "implementacao.c",
    fileUrl: "#",
  },
  {
    id: "8",
    groupName: "PixelPirates",
    submissionTime: "2025-06-26 13:55:41",
    status: "rejected",
    errorType: "Timeout de Execução",
    fileName: "algoritmo_lento.py",
    fileUrl: "#",
  },
]

export default function ExerciseCorrectionPage() {
  const [submissions, setSubmissions] = useState<ExerciseSubmission[]>(mockData)
  const [selectedSubmission, setSelectedSubmission] = useState<ExerciseSubmission | null>(null)
  const [feedback, setFeedback] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "approved" as const, errorType: null } : sub)),
    )
  }

  const handleReject = (id: string, errorType: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: "rejected" as const, errorType } : sub)),
    )
  }

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Simular download do arquivo
    console.log(`Baixando arquivo: ${fileName} de ${fileUrl}`)
    alert(`Download iniciado: ${fileName}`)
  }

  const getStatusBadge = (status: ExerciseSubmission["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprovado</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Reprovado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const totalPages = Math.ceil(submissions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSubmissions = submissions.slice(startIndex, endIndex)

  return (
    <NavbarRankingAdm>
      <div className="w-full bg-gray-100 min-h-full p-4">
        <div className="max-w-7xl mx-auto">
          {/* Título da página */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#4F85A6] mb-2">Correção de Exercícios</h1>
            <p className="text-gray-600">Gerencie e avalie as submissões dos exercícios das equipes</p>
          </div>

          {/* Tabela de submissões */}
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#4F85A6] hover:bg-[#4F85A6]">
                      <TableHead className="text-white font-semibold text-center min-w-[150px]">
                        Nome do Grupo
                      </TableHead>
                      <TableHead className="text-white font-semibold text-center min-w-[180px]">
                        Horário de Envio
                      </TableHead>
                      <TableHead className="text-white font-semibold text-center min-w-[120px]">Status</TableHead>
                      <TableHead className="text-white font-semibold text-center min-w-[150px]">Tipo de Erro</TableHead>
                      <TableHead className="text-white font-semibold text-center min-w-[150px]">Arquivo</TableHead>
                      <TableHead className="text-white font-semibold text-center min-w-[200px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium text-lg">{submission.groupName}</TableCell>
                        <TableCell className="text-center text-lg">{submission.submissionTime}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-center text-lg">
                          {submission.errorType ? (
                            <div className="flex items-center justify-center gap-2">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-red-600">{submission.errorType}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <ButtonAdm
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(submission.fileUrl, submission.fileName)}
                            className="flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            {submission.fileName}
                          </ButtonAdm>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            {submission.status === "pending" && (
                              <>
                                <ButtonAdm
                                  size="sm"
                                  onClick={() => handleApprove(submission.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Aprovar
                                </ButtonAdm>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <ButtonAdm
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => setSelectedSubmission(submission)}
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Reprovar
                                    </ButtonAdm>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Reprovar Exercício</DialogTitle>
                                      <DialogDescription>
                                        Informe o motivo da reprovação para o grupo {submission.groupName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="error-type">Tipo de Erro</Label>
                                        <Textarea
                                          id="error-type"
                                          placeholder="Ex: Erro de sintaxe, lógica incorreta, timeout..."
                                          value={feedback}
                                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <ButtonAdm
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedSubmission(null)
                                          setFeedback("")
                                        }}
                                      >
                                        Cancelar
                                      </ButtonAdm>
                                      <ButtonAdm
                                        variant="destructive"
                                        onClick={() => {
                                          if (selectedSubmission && feedback.trim()) {
                                            handleReject(selectedSubmission.id, feedback.trim())
                                            setSelectedSubmission(null)
                                            setFeedback("")
                                          }
                                        }}
                                        disabled={!feedback.trim()}
                                      >
                                        Reprovar
                                      </ButtonAdm>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </>
                            )}
                            {submission.status !== "pending" && (
                              <span className="text-sm text-gray-500">
                                {submission.status === "approved" ? "Já aprovado" : "Já reprovado"}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginação */}
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, submissions.length)} de {submissions.length}{" "}
                  submissões
                </div>
                <div className="flex items-center gap-2">
                  <ButtonAdm
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </ButtonAdm>
                  <span className="text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  <ButtonAdm
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </ButtonAdm>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </NavbarRankingAdm>
  )
}
