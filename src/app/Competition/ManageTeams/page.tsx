"use client"

import type React from "react"
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import BlockIcon from "@mui/icons-material/Block"
import DeleteIcon from "@mui/icons-material/Delete"
import useManageTeams from './hooks/useManageTeams';
import NavRanking from "@/components/_ui/NavbarRankingAdm"



const ManageTeamsPage: React.FC = () => {
  const {
    page,
    rowsPerPage,
    teams,
    columns,
    handleChangePage,
    handleChangeRowsPerPage,
    handleToggleStatus,
    handleDeleteTeam,
  } = useManageTeams()

  return (
    <NavRanking>


        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 2, textAlign: "center", color: "#4F85A6", fontWeight: "bold", fontSize: "32px" }}
        >
          Gerenciamento de Equipes
        </Typography>

        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#4F85A6",
                        color: "#fff",
                        fontSize: "25px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((team) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={team.id}>
                      {columns.map((column) => {
                        const value = team[column.id as keyof typeof team]
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              fontSize: "20px",
                            }}
                          >
                            {column.id === "status" ? (
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {team.status === "active" ? (
                                  <>
                                    <CheckCircleIcon color="success" sx={{ mr: 0.5 }} /> Ativo
                                  </>
                                ) : (
                                  <>
                                    <BlockIcon color="error" sx={{ mr: 0.5 }} /> Bloqueado
                                  </>
                                )}
                              </Box>
                            ) : column.id === "actions" ? (
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                <Button
                                  variant="outlined"
                                  color={team.status === "active" ? "error" : "success"}
                                  onClick={() => handleToggleStatus(team.id)}
                                  startIcon={team.status === "active" ? <BlockIcon /> : <CheckCircleIcon />}
                                  size="small"
                                >
                                  {team.status === "active" ? "Bloquear" : "Ativar"}
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => handleDeleteTeam(team.id)}
                                  startIcon={<DeleteIcon />}
                                  size="small"
                                >
                                  Excluir
                                </Button>
                              </Box>
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={teams.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage="Linhas por página:"
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
     
    </NavRanking>
  )
}

export default ManageTeamsPage
