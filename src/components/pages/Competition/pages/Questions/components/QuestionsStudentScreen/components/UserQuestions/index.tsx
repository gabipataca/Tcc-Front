"use client"

import type React from "react"
import MuiButton from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

import { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Collapse,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import type { Question } from "./questions-student-screen"

// Mock data para demonstração
const mockQuestions: Question[] = [
  {
    id: 1,
    title: "Dúvida sobre laço for no Exercício A",
    question: "Como faço para iterar sobre um array usando for?",
    askedBy: "João Silva",
    askedAt: "2024-01-15T10:30:00",
    status: "answered",
    answer: "Você pode usar for(int i = 0; i < array.length; i++) para iterar sobre o array.",
    answeredAt: "2024-01-15T14:20:00",
    language: "C",
  },
  {
    id: 2,
    title: "Problema com ponteiros em C",
    question: "Não estou conseguindo entender como funcionam os ponteiros.",
    askedBy: "João Silva",
    askedAt: "2024-01-16T09:15:00",
    status: "pending",
    language: "C",
  },
  {
    id: 3,
    title: "Erro de compilação no Exercício B",
    question: "Estou recebendo um erro de sintaxe na linha 15.",
    askedBy: "João Silva",
    askedAt: "2024-01-17T11:45:00",
    status: "answered",
    answer: "Você esqueceu de adicionar um ponto e vírgula no final da linha 14.",
    answeredAt: "2024-01-17T13:30:00",
    language: "Java",
  },
  {
    id: 4,
    title: "Como usar funções recursivas?",
    question: "Preciso de ajuda para entender recursão no Exercício C.",
    askedBy: "João Silva",
    askedAt: "2024-01-18T08:20:00",
    status: "pending",
    language: "Python",
  },
  {
    id: 5,
    title: "Dúvida sobre arrays multidimensionais",
    question: "Como declarar e usar matrizes em C++?",
    askedBy: "João Silva",
    askedAt: "2024-01-19T10:00:00",
    status: "answered",
    answer: "Use int matriz[linhas][colunas] para declarar uma matriz.",
    answeredAt: "2024-01-19T15:45:00",
    language: "C++",
  },
  {
    id: 6,
    title: "Problema com strings em C",
    question: "Como concatenar duas strings?",
    askedBy: "João Silva",
    askedAt: "2024-01-20T09:30:00",
    status: "pending",
    language: "C",
  },
  {
    id: 7,
    title: "Erro de lógica no Exercício D",
    question: "Meu código não está retornando o resultado esperado.",
    askedBy: "João Silva",
    askedAt: "2024-01-21T14:15:00",
    status: "answered",
    answer: "Você precisa inverter a condição do if na linha 20.",
    answeredAt: "2024-01-21T16:00:00",
    language: "Java",
  },
  {
    id: 8,
    title: "Como usar structs em C?",
    question: "Não entendi como criar e usar estruturas.",
    askedBy: "João Silva",
    askedAt: "2024-01-22T11:00:00",
    status: "pending",
    language: "C",
  },
]

function QuestionRow({ question }: { question: Question }) {
  const [open, setOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "16px" }}>
          {question.id}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "16px" }}>
          {question.title}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "16px" }}>
          {question.language || "-"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "16px" }}>
          {formatDate(question.askedAt)}
        </TableCell>
        <TableCell align="center">
          <Box
            component="span"
            sx={{
              p: 0.5,
              borderRadius: 1,
              fontWeight: "bold",
              backgroundColor: question.status === "pending" ? "#ffeb3b" : "#c8e6c9",
              color: question.status === "pending" ? "#333" : "#2e7d32",
            }}
          >
            {question.status === "pending" ? "Pendente" : "Respondida"}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Box sx={{ bgcolor: "#e3f2fd", p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}>
                  Pergunta:
                </Typography>
                <Typography variant="body2" sx={{ color: "#333" }}>
                  {question.question}
                </Typography>
              </Box>

              {question.status === "answered" && question.answer && (
                <Box sx={{ bgcolor: "#f1f8e9", p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#558b2f", mb: 1 }}>
                    Resposta:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#333" }}>
                    {question.answer}
                  </Typography>
                  {question.answeredAt && (
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Respondido em: {formatDate(question.answeredAt)}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const UserQuestions = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        // In production, replace with actual API call:
        // const response = await fetch('/api/questions')
        // const data = await response.json()
        // setQuestions(data)
        setQuestions(mockQuestions)
      } catch (error) {
        enqueueSnackbar("Erro ao carregar as perguntas. Tente novamente.", {
          variant: "error",
          autoHideDuration: 2500,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [enqueueSnackbar])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedQuestions = questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 3,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1500px",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#4F85A6",
            fontWeight: "bold",
            fontSize: "32px",
            flex: 1,
            textAlign: "center",
          }}
        >
          Minhas Dúvidas
        </Typography>

        {onOpenModal && (
          <MuiButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onOpenModal}
            sx={{
              bgcolor: "#4F85A6",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 3,
              px: 3,
              py: 1.2,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "#3B6A82",
                transform: "translateY(-2px)",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Fazer Pergunta
          </MuiButton>
        )}
      </Box>

      <Paper sx={{ width: "100%", maxWidth: "1500px" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
          <Table stickyHeader aria-label="collapsible questions table" sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#4F85A6" }} />
                <TableCell
                  style={{
                    width: "8%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    width: "40%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Título
                </TableCell>
                <TableCell
                  style={{
                    width: "12%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Linguagem
                </TableCell>
                <TableCell
                  style={{
                    width: "22%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Data/Hora
                </TableCell>
                <TableCell
                  style={{
                    width: "18%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ fontSize: "18px", py: 3 }}>
                    Carregando perguntas...
                  </TableCell>
                </TableRow>
              ) : paginatedQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ fontSize: "18px", py: 3 }}>
                    Nenhuma dúvida encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedQuestions.map((question) => <QuestionRow key={question.id} question={question} />)
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </Box>
  )
}

export default UserQuestions
