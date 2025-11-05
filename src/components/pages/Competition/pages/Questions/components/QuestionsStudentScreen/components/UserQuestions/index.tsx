"use client"

import type React from "react"
import MuiButton from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

import { useState, useMemo } from "react"
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
import type { Question } from "@/components/pages/Competition/pages/Questions/types"
import { useQuestions } from "@/components/pages/Competition/contexts/QuestionsContext"
import { useUser } from "@/contexts/UserContext"

function QuestionRow({ question }: { question: Question }) {
  const [open, setOpen] = useState(false)

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Determine if question is answered
  const isAnswered = question.answer !== null && question.answer !== undefined;
  const answerText = typeof question.answer === 'string' 
    ? question.answer 
    : question.answer?.content;

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
          {question.title || `Pergunta #${question.id}`}
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
              backgroundColor: isAnswered ? "#c8e6c9" : "#ffeb3b",
              color: isAnswered ? "#2e7d32" : "#333",
            }}
          >
            {isAnswered ? "Respondida" : "Pendente"}
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
                  {question.content || question.question}
                </Typography>
              </Box>

              {isAnswered && answerText && (
                <Box sx={{ bgcolor: "#f1f8e9", p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#558b2f", mb: 1 }}>
                    Resposta:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#333" }}>
                    {answerText}
                  </Typography>
                  {typeof question.answer === 'object' && question.answer?.userName && (
                    <Typography variant="caption" sx={{ color: "#666", display: "block", mb: 0.5 }}>
                      Respondido por: {question.answer.userName}
                    </Typography>
                  )}
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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  // Use questions from SignalR context instead of mock data
  const { questions: allQuestions } = useQuestions()
  const { user } = useUser()
  
  // Filter questions from current user (by userId or userName)
  const questions = useMemo(() => {
    if (!user?.id) return [];
    return allQuestions.filter(q => 
      q.userId === user.id || 
      q.userName === user.name ||
      q.askedBy === user.name
    );
  }, [allQuestions, user])

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
              {paginatedQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ fontSize: "18px", py: 3 }}>
                    Nenhuma dúvida encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedQuestions.map((question: Question) => <QuestionRow key={question.id} question={question} />)
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
