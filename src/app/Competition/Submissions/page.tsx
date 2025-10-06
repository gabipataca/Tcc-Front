"use client"

import type React from "react"
import { useState, useEffect } from "react"
import NavRanking from "@/components/_ui/NavbarRankingAdm"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import useSubmissions from "./hooks/useSubmissions"

const AdminTeamPage: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<"correct" | "wrong">("correct")

  const { rows, displayedColumns, title } = useSubmissions(currentTable)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    setPage(0)
  }, [rows])

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleTableChange = (table: "correct" | "wrong") => {
    setCurrentTable(table)
  }

  return (
    <NavRanking>
   
        <Typography
          variant="h5"
          component="div"
          sx={{
            mb: 2,
            textAlign: "center",
            color: "#4F85A6",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>

        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            gap: "16px",
            margin: "0 auto 24px",
            maxWidth: "fit-content",
            padding: "8px",
            borderRadius: "16px",
            backgroundColor: "#e0e0e0",
            boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Button
            variant={currentTable === "correct" ? "contained" : "text"}
            onClick={() => handleTableChange("correct")}
            sx={{
              bgcolor: currentTable === "correct" ? "#4F85A6" : "transparent",
              color: currentTable === "correct" ? "#fff" : "#4F85A6",
              fontWeight: "bold",
              borderRadius: 3,
              px: 3,
              py: 1.2,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: currentTable === "correct" ? "#3B6A82" : "rgba(79, 133, 166, 0.1)",
                color: currentTable === "correct" ? "#fff" : "#3B6A82",
              },
            }}
          >
            Exercícios Corretos
          </Button>
          <Button
            variant={currentTable === "wrong" ? "contained" : "text"}
            onClick={() => handleTableChange("wrong")}
            sx={{
              bgcolor: currentTable === "wrong" ? "#4F85A6" : "transparent",
              color: currentTable === "wrong" ? "#fff" : "#4F85A6",
              fontWeight: "bold",
              borderRadius: 3,
              px: 3,
              py: 1.2,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: currentTable === "wrong" ? "#3B6A82" : "rgba(79, 133, 166, 0.1)",
                color: currentTable === "wrong" ? "#fff" : "#3B6A82",
              },
            }}
          >
            Exercícios Errados
          </Button>
        </div>

        <Paper sx={{ width: "90%", mx: "auto" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {displayedColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#4F85A6",
                        color: "#fff",
                        fontSize: "18px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {displayedColumns.map((column) => {
                      const value = row[column.id as keyof typeof row]
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ fontSize: "19px" }}>
                          {column.format && typeof value === "number" ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Valores por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
          />
        </Paper>
      
    </NavRanking>
  )
}

export default AdminTeamPage
