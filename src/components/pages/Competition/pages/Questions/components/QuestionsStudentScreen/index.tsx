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
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import CodeIcon from "@mui/icons-material/Code";
import TitleIcon from "@mui/icons-material/Title";
import UserQuestions from "./components/UserQuestions";

interface InputFieldProps {
    label: string;
    placeholder: string;
    icon?: React.ReactNode;
}

const InputField = ({ label, placeholder, icon }: InputFieldProps) => (
    <Box sx={{ mb: 4 }}>
        <TextField
            fullWidth
            label={label}
            placeholder={placeholder}
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            InputProps={{
                startAdornment: icon ? (
                    <InputAdornment position="start">{icon}</InputAdornment>
                ) : null,
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&.Mui-focused fieldset": {
                        borderColor: "#4F85A6",
                    },
                },
                "& .MuiInputLabel-root": {
                    color: "#4F85A6",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4F85A6",
                },
            }}
        />
    </Box>
);

const TextareaField = () => (
    <Box sx={{ mb: 4 }}>
        <TextField
            fullWidth
            multiline
            rows={5}
            label="Escreva suas dúvidas:"
            placeholder="Digite aqui sua dúvida sobre o exercício..."
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&.Mui-focused fieldset": {
                        borderColor: "#4F85A6",
                    },
                },
                "& .MuiInputLabel-root": {
                    color: "#4F85A6",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4F85A6",
                },
            }}
        />
    </Box>
);

interface MuiSelectFieldProps {
    label: string;
    options: string[];
    placeholder?: string;
    icon?: React.ReactNode;
}

const MuiSelectField = ({
    label,
    options,
    placeholder,
    icon,
}: MuiSelectFieldProps) => {
    return (
        <Box sx={{ mb: 4, width: "100%" }}>
            <Autocomplete
                disablePortal
                id={`autocomplete-${label.replace(/\s/g, "-")}`}
                options={options}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        placeholder={
                            placeholder || `Selecione ${label.toLowerCase()}`
                        }
                        variant="outlined"
                        slotProps={{ inputLabel: { shrink: true } }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: icon ? (
                                <InputAdornment position="start">
                                    {icon}
                                </InputAdornment>
                            ) : null,
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "&.Mui-focused fieldset": {
                                    borderColor: "#4F85A6",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "#4F85A6",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#4F85A6",
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
};

const AskQuestionsContent = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                py: 4,
                px: 2,
                width: "100%",
                flexGrow: 1,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 4, md: 8 },
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: "800px",
                    textAlign: "center",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        color: "#4F85A6",
                        mb: 6,
                        letterSpacing: "0.05em",
                    }}
                >
                    Retire suas dúvidas sobre o exercício
                </Typography>

                <MuiSelectField
                    label="Escolha o exercício:"
                    options={[..."ABCDEFGHIJ"]}
                    placeholder="Selecione o exercício"
                    icon={<BookIcon sx={{ color: "#4F85A6" }} />}
                />

                <MuiSelectField
                    label="Escolha a Linguagem:"
                    options={["C", "C++", "C#", "Java", "PHP", "Python"]}
                    placeholder="Selecione a linguagem"
                    icon={<CodeIcon sx={{ color: "#4F85A6" }} />}
                />

                <InputField
                    label="Título da Pergunta:"
                    placeholder="Ex: Dúvida sobre o laço for no Exercício A"
                    icon={<TitleIcon sx={{ color: "#4F85A6" }} />}
                />

                <TextareaField />

                <MuiButton
                    variant="contained"
                    endIcon={<FaPaperPlane />}
                    sx={{
                        bgcolor: "#4F85A6",
                        color: "#fff",
                        borderRadius: 8,
                        px: 5,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        mt: 2,
                        "&:hover": {
                            bgcolor: "#3B6A82",
                            transform: "translateY(-2px)",
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                        },
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    Enviar Pergunta
                </MuiButton>
            </Paper>
        </Box>
    );
};

export interface Question {
    id: number;
    title: string;
    question: string;
    askedBy: string;
    askedAt: string;
    status: "pending" | "answered";
    answer?: string;
    answeredAt?: string;
    language?: string;
}

const CentralDeDuvidas: FC = () => {
    const [visualizacaoAtiva, setVisualizacaoAtiva] = useState<
        "fazer" | "minhas"
    >("fazer");

    return (
        <>
            {/* Box que contém os botões "Fazer Pergunta" e "Minhas Dúvidas" */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mb: 4,
                    mx: "auto",
                    maxWidth: "fit-content",
                    p: 1,
                    borderRadius: 4,
                    bgcolor: "#fff",
                    boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
                    // Adicionado marginTop para criar um pequeno espaçamento visual abaixo da Navbar

                    marginTop: "20px",
                }}
            >
                <MuiButton
                    variant={
                        visualizacaoAtiva === "fazer" ? "contained" : "text"
                    }
                    onClick={() => setVisualizacaoAtiva("fazer")}
                    sx={{
                        bgcolor:
                            visualizacaoAtiva === "fazer"
                                ? "#4F85A6"
                                : "transparent",
                        color:
                            visualizacaoAtiva === "fazer" ? "#fff" : "#4F85A6",
                        fontWeight: "bold",
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                            bgcolor:
                                visualizacaoAtiva === "fazer"
                                    ? "#3B6A82"
                                    : "rgba(79, 133, 166, 0.1)",
                            color:
                                visualizacaoAtiva === "fazer"
                                    ? "#fff"
                                    : "#3B6A82",
                        },
                    }}
                >
                    Fazer Pergunta
                </MuiButton>
                <MuiButton
                    variant={
                        visualizacaoAtiva === "minhas" ? "contained" : "text"
                    }
                    onClick={() => setVisualizacaoAtiva("minhas")}
                    sx={{
                        bgcolor:
                            visualizacaoAtiva === "minhas"
                                ? "#4F85A6"
                                : "transparent",
                        color:
                            visualizacaoAtiva === "minhas" ? "#fff" : "#4F85A6",
                        fontWeight: "bold",
                        borderRadius: 3,
                        px: 3,
                        py: 1.2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                            bgcolor:
                                visualizacaoAtiva === "minhas"
                                    ? "#3B6A82"
                                    : "rgba(79, 133, 166, 0.1)",
                            color:
                                visualizacaoAtiva === "minhas"
                                    ? "#fff"
                                    : "#3B6A82",
                        },
                    }}
                >
                    Minhas Dúvidas
                </MuiButton>
            </Box>

            {visualizacaoAtiva === "fazer" ? (
                <AskQuestionsContent />
            ) : (
                <UserQuestions />
            )}
        </>
    );
};

export default CentralDeDuvidas;
