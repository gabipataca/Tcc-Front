"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material"
import { useQuestions } from "@/components/pages/Competition/contexts/QuestionsContext"
import TeacherQuestionRow from "@/components/pages/Competition/pages/Questions/components/QuestionsTeacherScreen/components/TeacherQuestionRow"

const QuestionsTeacherScreen: React.FC = () => {
  const { questions } = useQuestions()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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
      <Typography
        variant="h5"
        component="div"
        sx={{
          mb: 3,
          textAlign: "center",
          color: "#4F85A6",
          fontWeight: "bold",
          fontSize: "32px",
        }}
      >
        Caixa de Entrada de Dúvidas
      </Typography>

      <Paper sx={{ width: "100%", maxWidth: "1500px" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
          <Table stickyHeader aria-label="collapsible questions table" sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#4F85A6" }} />
                <TableCell
                  style={{
                    width: "4%",
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
                    width: "32%",
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
                    width: "16%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Time
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
                    width: "14%",
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
                  <TableCell colSpan={7} align="center" sx={{ fontSize: "18px", py: 3 }}>
                    Nenhuma dúvida encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedQuestions.map((question) => <TeacherQuestionRow key={question.id} question={question} />)
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

export default QuestionsTeacherScreen
