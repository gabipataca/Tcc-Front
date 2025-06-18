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
  createCorrectTeamData("2025-06-15 - 10:00:15", 90, "Equipe Alpha recebeu o Balão A por acertar o exercício A", "Alpha"),
  createCorrectTeamData("2025-06-15 - 10:05:30", 120, "Equipe Beta recebeu o Balão C por acertar o exercício C", "Beta"),
  createCorrectTeamData("2025-06-15 - 10:10:00", 75, "Equipe Gamma recebeu o Balão B por acertar o exercício B", "Gamma"),
  createCorrectTeamData("2025-06-15 - 10:12:45", 160, "Equipe Delta recebeu o Balão E por acertar o exercício E", "Delta"),
  createCorrectTeamData("2025-06-15 - 10:18:20", 110, "Equipe Epsilon recebeu o Balão D por acertar o exercício D", "Epsilon"),
  createCorrectTeamData("2025-06-15 - 10:22:05", 85, "Equipe Zeta recebeu o Balão F por acertar o exercício F", "Zeta"),
  createCorrectTeamData("2025-06-15 - 10:25:50", 140, "Equipe Eta recebeu o Balão G por acertar o exercício G", "Eta"),
  createCorrectTeamData("2025-06-15 - 10:30:10", 95, "Equipe Theta recebeu o Balão H por acertar o exercício H", "Theta"),
  createCorrectTeamData("2025-06-15 - 10:33:40", 105, "Equipe Iota recebeu o Balão I por acertar o exercício I", "Iota"),
  createCorrectTeamData("2025-06-15 - 10:37:15", 130, "Equipe Kappa recebeu o Balão J por acertar o exercício J", "Kappa"),
  createCorrectTeamData("2025-06-15 - 10:40:00", 92, "Equipe Lambda recebeu o Balão A por acertar o exercício A", "Lambda"),
  createCorrectTeamData("2025-06-15 - 10:44:25", 115, "Equipe Mu recebeu o Balão B por acertar o exercício B", "Mu"),
  createCorrectTeamData("2025-06-15 - 10:48:10", 80, "Equipe Nu recebeu o Balão C por acertar o exercício C", "Nu"),
  createCorrectTeamData("2025-06-15 - 10:51:55", 150, "Equipe Xi recebeu o Balão D por acertar o exercício D", "Xi"),
  createCorrectTeamData("2025-06-15 - 10:55:30", 100, "Equipe Omicron recebeu o Balão E por acertar o exercício E", "Omicron"),
  createCorrectTeamData("2025-06-15 - 10:59:00", 70, "Equipe Pi recebeu o Balão F por acertar o exercício F", "Pi"),
  createCorrectTeamData("2025-06-15 - 11:02:30", 135, "Equipe Rho recebeu o Balão G por acertar o exercício G", "Rho"),
  createCorrectTeamData("2025-06-15 - 11:06:00", 88, "Equipe Sigma recebeu o Balão H por acertar o exercício H", "Sigma"),
  createCorrectTeamData("2025-06-15 - 11:09:30", 125, "Equipe Tau recebeu o Balão I por acertar o exercício I", "Tau"),
  createCorrectTeamData("2025-06-15 - 11:13:00", 98, "Equipe Upsilon recebeu o Balão J por acertar o exercício J", "Upsilon"),
];

const wrongRows: WrongTeamData[] = [
  createWrongTeamData("2025-06-15 - 10:01:00", "Equipe Gamma tentou o exercício A", "Gamma", "Compilation Error"),
  createWrongTeamData("2025-06-15 - 10:06:10", "Equipe Alpha tentou o exercício C", "Alpha", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 10:11:00", "Equipe Zeta tentou o exercício B", "Zeta", "Time-limit Exceeded"),
  createWrongTeamData("2025-06-15 - 10:13:30", "Equipe Mu tentou o exercício E", "Mu", "Runtime Error"),
  createWrongTeamData("2025-06-15 - 10:19:00", "Equipe Pi tentou o exercício D", "Pi", "Presentation Error"),
  createWrongTeamData("2025-06-15 - 10:23:00", "Equipe Kappa tentou o exercício F", "Kappa", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 10:26:40", "Equipe Upsilon tentou o exercício G", "Upsilon", "Resources Exceeded"),
  createWrongTeamData("2025-06-15 - 10:31:00", "Equipe Lambda tentou o exercício H", "Lambda", "Compilation Error"),
  createWrongTeamData("2025-06-15 - 10:34:30", "Equipe Epsilon tentou o exercício I", "Epsilon", "Time-limit Exceeded"),
  createWrongTeamData("2025-06-15 - 10:38:00", "Equipe Beta tentou o exercício J", "Beta", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 10:41:00", "Equipe Delta tentou o exercício A", "Delta", "Runtime Error"),
  createWrongTeamData("2025-06-15 - 10:45:15", "Equipe Omicron tentou o exercício B", "Omicron", "Presentation Error"),
  createWrongTeamData("2025-06-15 - 10:49:00", "Equipe Rho tentou o exercício C", "Rho", "Resources Exceeded"),
  createWrongTeamData("2025-06-15 - 10:52:40", "Equipe Sigma tentou o exercício D", "Sigma", "Compilation Error"),
  createWrongTeamData("2025-06-15 - 10:56:20", "Equipe Nu tentou o exercício E", "Nu", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 11:00:00", "Equipe Xi tentou o exercício F", "Xi", "Time-limit Exceeded"),
  createWrongTeamData("2025-06-15 - 11:03:40", "Equipe Iota tentou o exercício G", "Iota", "Runtime Error"),
  createWrongTeamData("2025-06-15 - 11:07:00", "Equipe Theta tentou o exercício H", "Theta", "Presentation Error"),
  createWrongTeamData("2025-06-15 - 11:10:20", "Equipe Zeta tentou o exercício I", "Zeta", "Wrong Answer"),
  createWrongTeamData("2025-06-15 - 11:14:00", "Equipe Alpha tentou o exercício J", "Alpha", "Resources Exceeded"),
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

        {/* Título da tabela dinâmico */}
        <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center', color: '#4F85A6', fontWeight: 'bold' }}>
          {currentTable === "correct" ? "Relatório de Exercícios Corretos" : "Relatório de Exercícios Errados"}
        </Typography>

        {/* Paper que contém a tabela - centralizado aqui */}
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
                              align={column.align} // Usa o alinhamento definido na coluna
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