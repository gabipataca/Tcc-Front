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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";


type ErrorType =
  | "Compilation Error"
  | "Runtime Error"
  | "Resources Exceeded"
  | "Time-limit Exceeded"
  | "Presentation Error"
  | "Wrong Answer";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number | string) => string;
}

const correctColumns: readonly Column[] = [
  { id: "time", label: "Tempo", minWidth: 300, align: "center" },
  { id: "points", label: "Pontos (min)", minWidth: 300, align: "center" },
  { id: "exerciseDescription", label: "Descrição", minWidth: 150, align: "center" }, // ALTERADO AQUI
  { id: "teamName", label: "Nome do Time", minWidth: 200, align: "center" },
];

const wrongColumns: readonly Column[] = [
  { id: "time", label: "Tempo", minWidth: 250, align: "center" },
  { id: "teamName", label: "Nome do Time", minWidth: 350, align: "center" },
  { id: "exerciseDescription", label: "Descrição do Erro", minWidth: 250, align: "center" }, // ALTERADO AQUI
  { id: "errorType", label: "Tipo de Erro", minWidth: 250, align: "center" },
];

interface CorrectTeamData {
  time: string;
  points: number;
  exerciseDescription: string;
  teamName: string;
}

interface WrongTeamData {
  time: string;
  exerciseDescription: string;
  teamName: string;
  errorType: ErrorType;
}

function createCorrectTeamData(
  time: string,
  points: number,
  exerciseDescription: string,
  teamName: string
): CorrectTeamData {
  return { time, points, exerciseDescription, teamName };
}

function createWrongTeamData(
  time: string,
  exerciseDescription: string,
  teamName: string,
  errorType: ErrorType
): WrongTeamData {
  return { time, exerciseDescription, teamName, errorType };
}

const correctRows: CorrectTeamData[] = [
  createCorrectTeamData("2025-06-15 - 10:00:15", 90, "Bit By Bit recebeu o Balão A por acertar o exercício A", "Bit By Bit"),
  createCorrectTeamData("2025-06-15 - 10:05:30", 120, "Byte Me recebeu o Balão C por acertar o exercício C", "Byte Me"),
  createCorrectTeamData("2025-06-15 - 10:10:00", 75, "Code Blooded recebeu o Balão B por acertar o exercício B", "Code Blooded"),
  createCorrectTeamData("2025-06-15 - 10:12:45", 160, "Ctrl+Alt+Elite recebeu o Balão E por acertar o exercício E", "Ctrl+Alt+Elite"),
  createCorrectTeamData("2025-06-15 - 10:18:20", 110, "Infinite Loopers recebeu o Balão D por acertar o exercício D", "Infinite Loopers"),
  createCorrectTeamData("2025-06-15 - 10:22:05", 85, "Null Pointers recebeu o Balão F por acertar o exercício F", "Null Pointers"),
  createCorrectTeamData("2025-06-15 - 10:25:50", 140, "Segmentation Fault recebeu o Balão G por acertar o exercício G", "Segmentation Fault"),
  createCorrectTeamData("2025-06-15 - 10:30:10", 95, "Syntax Error Slayers recebeu o Balão H por acertar o exercício H", "Syntax Error Slayers"),
  createCorrectTeamData("2025-06-15 - 10:33:40", 105, "The Recursive Raccoons recebeu o Balão I por acertar o exercício I", "The Recursive Raccoons"),
  createCorrectTeamData("2025-06-15 - 10:37:15", 130, "Binary Brains recebeu o Balão J por acertar o exercício J", "Binary Brains"),
  createCorrectTeamData("2025-06-15 - 10:40:00", 92, "Logic Lords recebeu o Balão A por acertar o exercício A", "Logic Lords"),
  createCorrectTeamData("2025-06-15 - 10:44:25", 115, "Algorithmic Alchemists recebeu o Balão B por acertar o exercício B", "Algorithmic Alchemists"),
  createCorrectTeamData("2025-06-15 - 10:48:10", 80, "Data Dynamos recebeu o Balão C por acertar o exercício C", "Data Dynamos"),
  createCorrectTeamData("2025-06-15 - 10:51:55", 150, "Quantum Coders recebeu o Balão D por acertar o exercício D", "Quantum Coders"),
  createCorrectTeamData("2025-06-15 - 10:55:30", 100, "Hacker's Delight recebeu o Balão E por acertar o exercício E", "Hacker's Delight"),
  createCorrectTeamData("2025-06-15 - 10:59:00", 70, "Kernel Kombatants recebeu o Balão F por acertar o exercício F", "Kernel Kombatants"),
  createCorrectTeamData("2025-06-15 - 11:02:30", 135, "Motherboard Mafia recebeu o Balão G por acertar o exercício G", "Motherboard Mafia"),
  createCorrectTeamData("2025-06-15 - 11:06:00", 88, "The Script Kiddies recebeu o Balão H por acertar o exercício H", "The Script Kiddies"),
  createCorrectTeamData("2025-06-15 - 11:09:30", 125, "Compile Time Heroes recebeu o Balão I por acertar o exercício I", "Compile Time Heroes"),
  createCorrectTeamData("2025-06-15 - 11:13:00", 98, "Run-Time Errors recebeu o Balão J por acertar o exercício J", "Run-Time Errors"),
];

const wrongRows: WrongTeamData[] = [
  createWrongTeamData("2025-06-15 - 10:01:00", "Code Blooded tentou o exercício A", "Code Blooded", "Compilation Error"),
  createWrongTeamData("2025-06-15 - 10:06:10", "Bit By Bit tentou o exercício C", "Bit By Bit", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 10:11:00", "Null Pointers tentou o exercício B", "Null Pointers", "Time-limit Exceeded"),
  createWrongTeamData("2025-06-15 - 10:13:30", "Algorithmic Alchemists tentou o exercício E", "Algorithmic Alchemists", "Runtime Error"),
  createWrongTeamData("2025-06-15 - 10:19:00", "Kernel Kombatants tentou o exercício D", "Kernel Kombatants", "Presentation Error"),
  createWrongTeamData("2025-06-15 - 10:23:00", "Binary Brains tentou o exercício F", "Binary Brains", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 10:26:40", "Run-Time Errors tentou o exercício G", "Run-Time Errors", "Resources Exceeded"),
  createWrongTeamData("2025-06-15 - 10:31:00", "Logic Lords tentou o exercício H", "Logic Lords", "Compilation Error"),
  createWrongTeamData("2025-06-15 - 10:34:30", "Infinite Loopers tentou o exercício I", "Infinite Loopers", "Time-limit Exceeded"),
  createWrongTeamData("2025-06-15 - 10:38:00", "Byte Me tentou o exercício J", "Byte Me", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 10:41:00", "Ctrl+Alt+Elite tentou o exercício A", "Ctrl+Alt+Elite", "Runtime Error"),
  createWrongTeamData("2025-06-15 - 10:45:15", "Hacker's Delight tentou o exercício B", "Hacker's Delight", "Presentation Error"),
  createWrongTeamData("2025-06-15 - 10:49:00", "Motherboard Mafia tentou o exercício C", "Motherboard Mafia", "Resources Exceeded"),
  createWrongTeamData("2025-06-15 - 10:52:40", "The Script Kiddies tentou o exercício D", "The Script Kiddies", "Compilation Error"),
  createWrongTeamData("2025-06-15 - 10:56:20", "Data Dynamos tentou o exercício E", "Data Dynamos", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 11:00:00", "Quantum Coders tentou o exercício F", "Quantum Coders", "Time-limit Exceeded"),
  createWrongTeamData("2025-06-15 - 11:03:40", "The Recursive Raccoons tentou o exercício G", "The Recursive Raccoons", "Runtime Error"),
  createWrongTeamData("2025-06-15 - 11:07:00", "Syntax Error Slayers tentou o exercício H", "Syntax Error Slayers", "Presentation Error"),
  createWrongTeamData("2025-06-15 - 11:10:20", "Null Pointers tentou o exercício I", "Null Pointers", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 11:14:00", "Bit By Bit tentou o exercício J", "Bit By Bit", "Resources Exceeded"),
];


const AdminTeamPage: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentTable, setCurrentTable] = React.useState<"correct" | "wrong">("correct");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = currentTable === "correct" ? correctRows : wrongRows;
  const displayedColumns = currentTable === "correct" ? correctColumns : wrongColumns;

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
        {/* Botões para alternar entre as tabelas */}
        <Box sx={{ mb: 2, display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <ButtonGroup variant="contained" aria-label="Table selection buttons">
            <Button
              onClick={() => {
                setCurrentTable("correct");
                setPage(0);
              }}
              disabled={currentTable === "correct"}
              sx={{
                bgcolor: currentTable === "correct" ? "#4F85A6" : "#A6D9F7",
                color: currentTable === "correct" ? "#fff" : "#333",
                '&:hover': {
                  bgcolor: "#4F85A6",
                  color: "#fff",
                },
              }}
            >
              Exercícios Corretos
            </Button>
            <Button
              onClick={() => {
                setCurrentTable("wrong");
                setPage(0);
              }}
              disabled={currentTable === "wrong"}
              sx={{
                bgcolor: currentTable === "wrong" ? "#4F85A6" : "#A6D9F7",
                color: currentTable === "wrong" ? "#fff" : "#333",
                '&:hover': {
                  bgcolor: "#4F85A6",
                  color: "#fff",
                },
              }}
            >
              Exercícios Errados
            </Button>
          </ButtonGroup>
        </Box>

       
        <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', color: '#4F85A6', fontWeight: 'bold' }}>
          {currentTable === "correct" ? "Relatório de Exercícios Corretos" : "Relatório de Exercícios Errados"}
        </Typography>

       
        <Paper sx={{ width: "90%", overflow: "hidden", mx: 'auto' }}>
          <TableContainer>
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
                {displayedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {displayedColumns.map((column) => {
                          let value: string | number = "";
                          if (currentTable === "correct") {
                            value = (row as CorrectTeamData)[column.id as keyof CorrectTeamData] as string | number;
                          } else {
                            value = (row as WrongTeamData)[column.id as keyof WrongTeamData] as string | number;
                          }
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
            count={displayedRows.length}
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