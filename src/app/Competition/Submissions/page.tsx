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
import Typography from "@mui/material/Typography";
import useSubmissions from "./hooks/useSubmissions";

const AdminTeamPage: React.FC = () => {
    const {
        page,
        rowsPerPage,
        currentTable,
        displayedRows,
        displayedColumns,
        title,
        handleChangePage,
        handleChangeRowsPerPage,
        setCurrentTable,
    } = useSubmissions();

    return (
        <NavRanking>
            <Box
                sx={{
                    bgcolor: "#f0f0f0",
                    minHeight: "calc(100vh - 64px - 48px)",
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    alignItems: "center",
                }}
            >
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

                <Box
                    sx={{
                        mb: 2,
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-start",
                        gap: 2,
                        mx: "auto",
                        maxWidth: "fit-content",
                        p: 1,
                        borderRadius: 4,
                        bgcolor: "#e0e0e0",
                        boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Button
                        variant={currentTable === "correct" ? "contained" : "text"}
                        onClick={() => {
                            setCurrentTable("correct");
                            handleChangePage(null, 0); // Reset page to 0
                        }}
                        sx={{
                            bgcolor:
                                currentTable === "correct" ? "#4F85A6" : "transparent",
                            color:
                                currentTable === "correct" ? "#fff" : "#4F85A6",
                            fontWeight: "bold",
                            borderRadius: 3,
                            px: 3,
                            py: 1.2,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                bgcolor:
                                    currentTable === "correct"
                                        ? "#3B6A82"
                                        : "rgba(79, 133, 166, 0.1)",
                                color:
                                    currentTable === "correct"
                                        ? "#fff"
                                        : "#3B6A82",
                            },
                        }}
                    >
                        Exercícios Corretos
                    </Button>
                    <Button
                        variant={currentTable === "wrong" ? "contained" : "text"}
                        onClick={() => {
                            setCurrentTable("wrong");
                            handleChangePage(null, 0); // Reset page to 0
                        }}
                        sx={{
                            bgcolor:
                                currentTable === "wrong" ? "#4F85A6" : "transparent",
                            color:
                                currentTable === "wrong" ? "#fff" : "#4F85A6",
                            fontWeight: "bold",
                            borderRadius: 3,
                            px: 3,
                            py: 1.2,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                                bgcolor:
                                    currentTable === "wrong"
                                        ? "#3B6A82"
                                        : "rgba(79, 133, 166, 0.1)",
                                color:
                                    currentTable === "wrong"
                                        ? "#fff"
                                        : "#3B6A82",
                            },
                        }}
                    >
                        Exercícios Errados
                    </Button>
                </Box>

                <Paper sx={{ width: "90%", overflow: "hidden", mx: "auto" }}>
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
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                {displayedColumns.map((column) => {
                                                    const value = row[column.id as keyof (CorrectTeamData | WrongTeamData)];
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