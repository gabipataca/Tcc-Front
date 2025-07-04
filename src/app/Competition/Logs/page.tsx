"use client";

import React from "react";
import NavRanking from "@/components/_ui/NavbarRankingAdm";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Column {
  id: "teamName" | "ip" | "lastLogin" | "lastLogout" | "members" | "lastActionTime" | "lastAction";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "teamName", label: "Team Name", minWidth: 150, align: "center" },
  { id: "ip", label: "IP", minWidth: 100, align: "center" },
  {
    id: "lastLogin",
    label: "Last Login",
    minWidth: 170,
    align: "center",
  },
  {
    id: "lastLogout",
    label: "Last Logout",
    minWidth: 170,
    align: "center",
  },
  {
    id: "lastActionTime",
    label: "Hora Última Ação",
    minWidth: 180,
    align: "center",
  },
  {
    id: "lastAction",
    label: "Última Ação",
    minWidth: 250, 
    align: "center", 
  },
  { id: "members", label: "Integrantes", minWidth: 170, align: "center" },
];

interface TeamData {
  teamName: string;
  ip: string;
  lastLogin: string;
  lastLogout: string;
  members: string;
  lastActionTime: string;
  lastAction: string;
}

function createTeamData(
  teamName: string,
  ip: string,
  lastLogin: string,
  lastLogout: string,
  members: string,
  lastActionTime: string,
  lastAction: string
): TeamData {
  return { teamName, ip, lastLogin, lastLogout, members, lastActionTime, lastAction };
}

const rows = [
  createTeamData("CyberKnights", "192.168.1.1", "2025-06-15 - 10:00", "2025-06-15 18:00", "João, Maria, Pedro", "2025-06-15 - 18:00:10", "Time CyberKnights fez logoff."),
  createTeamData("CodeMasters", "192.168.1.2", "2025-06-15 - 09:30", "2025-06-15 17:45", "Ana, Carlos", "2025-06-15 - 17:45:05", "Time CodeMasters fez logoff."),
  createTeamData("BinaryBlazers", "192.168.1.3", "2025-06-15 - 11:00", "2025-06-15 19:00", "Sofia, Lucas, Beatriz, Rafael", "2025-06-15 - 11:05:20", "Time BinaryBlazers enviou um exercício."),
  createTeamData("AlgorithmicAvengers", "192.168.1.4", "2025-06-14 - 08:00", "2025-06-14 16:30", "Fernando", "2025-06-14 - 08:00:00", "Time AlgorithmicAvengers autenticou-se no sistema."),
  createTeamData("SyntaxSyndicate", "192.168.1.5", "2025-06-15 - 10:15", "2025-06-15 18:30", "Clara, Diego", "2025-06-15 - 10:15:30", "Time SyntaxSyndicate autenticou-se no sistema."),
  createTeamData("The Debuggers", "192.168.1.6", "2025-06-15 - 09:00", "2025-06-15 17:00", "Mariana, Gustavo", "2025-06-15 - 09:00:00", "Time The Debuggers autenticou-se no sistema."),
  createTeamData("BitBusters", "192.168.1.7", "2025-06-14 - 11:30", "2025-06-14 19:15", "Paula, Ricardo, Camila", "2025-06-14 - 11:30:00", "Time BitBusters autenticou-se no sistema."),
  createTeamData("PixelPirates", "192.168.1.8", "2025-06-15 - 10:45", "2025-06-15 18:50", "Daniela", "2025-06-15 - 10:45:00", "Time PixelPirates autenticou-se no sistema."),
  createTeamData("The Byte Meisters", "192.168.1.9", "2025-06-15 - 08:45", "2025-06-15 16:55", "Gabriel, Laura, Bruno", "2025-06-15 - 08:45:00", "Time The Byte Meisters autenticou-se no sistema."),
  createTeamData("Ctrl+Alt+Defeat", "192.168.1.10", "2025-06-14 - 09:00", "2025-06-14 17:00", "Carolina, Felipe", "2025-06-14 - 09:00:00", "Time Ctrl+Alt+Defeat autenticou-se no sistema."),
  createTeamData("The Glitch Mob", "192.168.1.11", "2025-06-15 - 12:00", "2025-06-15 20:00", "Vitor, Julia", "2025-06-15 - 12:00:00", "Time The Glitch Mob autenticou-se no sistema."),
  createTeamData("LevelUp", "192.168.1.12", "2025-06-15 - 13:00", "2025-06-15 21:00", "Alice, Enzo", "2025-06-15 - 13:00:00", "Time LevelUp enviou um exercício."),
  createTeamData("GameChangers", "192.168.1.13", "2025-06-15 - 14:00", "2025-06-15 22:00", "Luna, Miguel, Helena", "2025-06-15 - 14:00:00", "Time GameChangers autenticou-se no sistema."),
  createTeamData("The Console Cowboy", "192.168.1.14", "2025-06-14 - 07:00", "2025-06-14 15:00", "Benício", "2025-06-14 - 07:00:00", "Time The Console Cowboy autenticou-se no sistema."),
];

const AdminTeamPage: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <NavRanking>
      <Box
        sx={{
          bgcolor: "#f0f0f0",
          minHeight: "calc(100vh - 64px - 48px)",
          display: "flex",
          flexDirection: "column",
          p: 2,
          alignItems: 'center',
        }}
      >
        {/* Título da tabela */}
        <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', color: '#4F85A6', fontWeight: 'bold' }}>
          Informações das Equipes e Últimas Atividades
        </Typography>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
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
                        fontSize: "18px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.ip}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ fontSize: "19px" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
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
          />
        </Paper>
      </Box>
    </NavRanking>
  );
};

export default AdminTeamPage;