"use client";

import React, { useState, FC } from "react";
import { FaPaperPlane } from "react-icons/fa";
import {
    Box,
    TextField,
    Autocomplete,
    Button as MuiButton,
    Typography,
    Paper,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Collapse,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BookIcon from "@mui/icons-material/Book";
import CodeIcon from "@mui/icons-material/Code";
import TitleIcon from "@mui/icons-material/Title";

export interface Question {
    id: number;
    title: string;
    exercise: string;
    question: string;
    askedAt: string;
    status: "pending" | "answered";
    answer?: string;
    language?: string;
}

const mockQuestions: Question[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Dúvida sobre o laço 'for' no Exercício ${String.fromCharCode(65 + (i % 5))}`,
    exercise: `Exercício ${String.fromCharCode(65 + (i % 5))}`,
    question: "Olá, não estou conseguindo fazer o loop funcionar como esperado. Ele está entrando em um loop infinito. Podem me ajudar a ver o que há de errado no meu código? Segue o trecho: for(i=0; i<10; i--)...",
    askedAt: `2025-10-0${(i % 3) + 1}T1${i % 10}:30:00`,
    status: i % 2 === 0 ? "answered" : "pending",
    answer: i % 2 === 0 ? "Claro! O problema está no incremento do seu laço, você usou `i--` ao invés de `i++`, o que causa o loop infinito. Tente corrigir isso." : undefined,
    language: "Python",
}));

interface InputFieldProps {
    label: string;
    placeholder: string;
    icon?: React.ReactNode;
}

const InputField = ({ label, placeholder, icon }: InputFieldProps) => (
    <Box sx={{ mb: 4 }}>
        <TextField fullWidth label={label} placeholder={placeholder} variant="outlined" InputLabelProps={{ shrink: true }}
            InputProps={{
                startAdornment: icon ? (<InputAdornment position="start">{icon}</InputAdornment>) : null,
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "&.Mui-focused fieldset": { borderColor: "#4F85A6" } }, "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": { color: "#4F85A6" } }}
        />
    </Box>
);

const TextareaField = () => (
    <Box sx={{ mb: 4 }}>
        <TextField fullWidth multiline rows={5} label="Escreva suas dúvidas:" placeholder="Digite aqui sua dúvida sobre o exercício..." variant="outlined" InputLabelProps={{ shrink: true }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "&.Mui-focused fieldset": { borderColor: "#4F85A6" } }, "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": { color: "#4F85A6" } }}
        />
    </Box>
);

interface MuiSelectFieldProps {
    label: string;
    options: string[];
    placeholder?: string;
    icon?: React.ReactNode;
}

const MuiSelectField = ({ label, options, placeholder, icon }: MuiSelectFieldProps) => (
    <Box sx={{ mb: 4, width: "100%" }}>
        <Autocomplete disablePortal id={`autocomplete-${label.replace(/\s/g, "-")}`} options={options} fullWidth
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder || `Selecione ${label.toLowerCase()}`} variant="outlined" InputLabelProps={{ shrink: true }}
                    InputProps={{ ...params.InputProps, startAdornment: icon ? (<InputAdornment position="start">{icon}</InputAdornment>) : null }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, "&.Mui-focused fieldset": { borderColor: "#4F85A6" } }, "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": { color: "#4F85A6" } }}
                />
            )}
        />
    </Box>
);

const AskQuestionsContent = () => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", py: 4, px: 2, width: "100%", flexGrow: 1 }}>
        <Paper elevation={6} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, width: "100%", maxWidth: "800px", textAlign: "center", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", color: "#4F85A6", mb: 6, letterSpacing: "0.05em" }}>
                Retire suas dúvidas sobre o exercício
            </Typography>
            <MuiSelectField label="Escolha o exercício:" options={[..."ABCDEFGHIJ"]} placeholder="Selecione o exercício" icon={<BookIcon sx={{ color: "#4F85A6" }} />} />
            <MuiSelectField label="Escolha a Linguagem:" options={["C", "C++", "C#", "Java", "PHP", "Python"]} placeholder="Selecione a linguagem" icon={<CodeIcon sx={{ color: "#4F85A6" }} />} />
            <InputField label="Título da Pergunta:" placeholder="Ex: Dúvida sobre o laço for no Exercício A" icon={<TitleIcon sx={{ color: "#4F85A6" }} />} />
            <TextareaField />
            <MuiButton variant="contained" endIcon={<FaPaperPlane />} sx={{ bgcolor: "#4F85A6", color: "#fff", borderRadius: 8, px: 5, py: 1.5, fontSize: "1.1rem", fontWeight: "bold", mt: 2, "&:hover": { bgcolor: "#3B6A82", transform: "translateY(-2px)", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }, transition: "all 0.3s ease-in-out" }}>
                Enviar Pergunta
            </MuiButton>
        </Paper>
    </Box>
);

const UserQuestionRow: FC<{ question: Question }> = ({ question }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{question.title}</TableCell>
                <TableCell align="center">{new Date(question.askedAt).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                    <Box
                        component="span"
                        sx={{
                            bgcolor: question.status === 'answered' ? '#D4EDDA' : '#FFF3CD',
                            color: question.status === 'answered' ? '#155724' : '#856404',
                            px: 2, py: 0.5, borderRadius: 4,
                            fontWeight: 'bold'
                        }}
                    >
                        {question.status === 'answered' ? 'Respondida' : 'Pendente'}
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalhes da Dúvida
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}><strong>Pergunta:</strong> {question.question}</Typography>
                            <Typography variant="body2" color={question.answer ? "text.primary" : "text.secondary"}>
                                <strong>Resposta:</strong> {question.answer || "Aguardando resposta do professor."}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const UserQuestions = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const questions = mockQuestions;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedQuestions = questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4, px: 2 }}>
            <Paper sx={{ width: '100%', maxWidth: '1200px', mb: 2, borderRadius: 4, overflow: 'hidden' }}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#4F85A6' }}>
                                <TableCell />
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Título da Pergunta</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Data</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedQuestions.map((question) => (
                                <UserQuestionRow key={question.id} question={question} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={questions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Dúvidas por página:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
            </Paper>
        </Box>
    );
};

const QuestionsStudentScreen: FC = () => {
    const [visualizacaoAtiva, setVisualizacaoAtiva] = useState<"fazer" | "minhas">("fazer");

    const commonButtonStyles = {
        fontWeight: "bold",
        borderRadius: 3,
        px: 3,
        py: 1.2,
        transition: "all 0.3s ease-in-out",
    };

    const getButtonStyles = (view: "fazer" | "minhas") => ({
        ...commonButtonStyles,
        bgcolor: visualizacaoAtiva === view ? "#4F85A6" : "transparent",
        color: visualizacaoAtiva === view ? "#fff" : "#4F85A6",
        "&:hover": {
            bgcolor: visualizacaoAtiva === view ? "#3B6A82" : "rgba(79, 133, 166, 0.1)",
            color: visualizacaoAtiva === view ? "#fff" : "#3B6A82",
        },
    });

    return (
        <Box sx={{ bgcolor: '#f0f0f0', minHeight: '100vh', width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, pt: 3, mx: "auto", maxWidth: "fit-content" }}>
                <Paper elevation={2} sx={{ display: 'flex', p: 1, borderRadius: 4, bgcolor: "#fff", boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
                    <MuiButton variant={visualizacaoAtiva === "fazer" ? "contained" : "text"} onClick={() => setVisualizacaoAtiva("fazer")} sx={getButtonStyles("fazer")}>
                        Fazer Pergunta
                    </MuiButton>
                    <MuiButton variant={visualizacaoAtiva === "minhas" ? "contained" : "text"} onClick={() => setVisualizacaoAtiva("minhas")} sx={getButtonStyles("minhas")}>
                        Minhas Dúvidas
                    </MuiButton>
                </Paper>
            </Box>

            {visualizacaoAtiva === "fazer" ? (
                <AskQuestionsContent />
            ) : (
                <UserQuestions />
            )}
        </Box>
    );
};

export default QuestionsStudentScreen;