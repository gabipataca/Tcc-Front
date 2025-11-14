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
  TablePagination,
  TableRow,
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

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f5f9",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#4F85A6",
              borderRadius: "10px",
              "&:hover": {
                background: "#3d6a87",
              },
            },
          }}
        >
          <Table stickyHeader aria-label="collapsible questions table" sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                  }}
                />
                <TableCell
                  sx={{
                    width: "4%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    textAlign: "center",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    width: "32%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    textAlign: "center",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  Título
                </TableCell>
                <TableCell
                  sx={{
                    width: "16%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    textAlign: "center",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    width: "12%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    textAlign: "center",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  Linguagem
                </TableCell>
                <TableCell
                  sx={{
                    width: "22%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    textAlign: "center",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  Data/Hora
                </TableCell>
                <TableCell
                  sx={{
                    width: "14%",
                    backgroundColor: "#4F85A6",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                    textAlign: "center",
                    py: 2.5,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
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
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: "14px",
              fontWeight: 500,
            },
            "& .MuiIconButton-root": {
              color: "#4F85A6",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(79, 133, 166, 0.1)",
              },
              "&.Mui-disabled": {
                color: "rgba(79, 133, 166, 0.3)",
              },
            },
          }}
        />
      </Paper>
    </Box>
  )
}

export default QuestionsTeacherScreen
