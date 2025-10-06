"use client";

import React, { useState, useCallback } from "react";
import Balao from "@/components/_ui/Balao";
import Table from "@/components/_ui/Table";
import TableHead from "@/components/_ui/Table/components/TableHeader";
import TableBody from "@/components/_ui/Table/components/TableBody";
import TableRow from "@/components/_ui/Table/components/TableRow";
import TableCell from "@/components/_ui/Table/components/TableCell";
import { TableContainer as TableContainerMui, Box, Paper, Typography, Modal } from "@mui/material";
import TableContainer from "@/components/_ui/Table/components/TableContainer";
import { StyledRankingCellContainer } from "@/components/pages/ranking/styles";
import Button from "@/components/_ui/Button";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

// ---------------- HOOK useSendExercise ----------------
const exercises = [..."ABCDEFGHIJ"];
const languages = ["C", "C++", "C#", "Java", "PHP", "Python"];

const useSendExercise = () => {
    const [selectedExercise, setSelectedExercise] = useState<string>(exercises[0]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0]);
    const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleExerciseChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExercise(event.target.value);
    }, []);

    const handleLanguageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    }, []);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setAttachedFileName(selectedFile.name);
        }
    }, []);

    const handleSubmitAnalysis = useCallback(async () => {
        if (!file) {
            alert("Por favor, anexe um arquivo antes de enviar.");
            return;
        }

        setIsSubmitting(true);
        console.log("Submetendo análise:", {
            selectedExercise,
            selectedLanguage,
            attachedFileName,
            file,
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Análise enviada com sucesso!");
            setAttachedFileName(null);
            setFile(null);
        } catch (error) {
            console.error("Erro ao submeter análise:", error);
            alert("Ocorreu um erro ao enviar a análise. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    }, [selectedExercise, selectedLanguage, attachedFileName, file]);

    return {
        selectedExercise,
        handleExerciseChange,
        selectedLanguage,
        handleLanguageChange,
        attachedFileName,
        handleFileChange,
        handleSubmitAnalysis,
        isSubmitting,
        exercises,
        languages,
    };
};

// ---------------- COMPONENTE AnaliseJuiz ----------------
const AnaliseJuiz: React.FC = () => {
    const {
        selectedExercise,
        handleExerciseChange,
        selectedLanguage,
        handleLanguageChange,
        attachedFileName,
        handleFileChange,
        handleSubmitAnalysis,
        isSubmitting,
        exercises,
        languages,
    } = useSendExercise();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                py: 4,
                px: 2,
                width: '100%',
                flexGrow: 1,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 4, md: 8 },
                    borderRadius: 4,
                    width: '100%',
                    maxWidth: '800px',
                    textAlign: 'center',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#4F85A6',
                        mb: 6,
                        letterSpacing: '0.05em',
                    }}
                >
                    Submeter a análise do Juíz
                </Typography>

                <div className="mb-8">
                    <label className="block text-gray-700 text-lg mb-2">
                        <Typography variant="body1" component="span" sx={{ color: '#4F85A6', fontWeight: 'bold' }}>
                            Escolha o exercício:
                        </Typography>
                    </label>
                    <div className="flex justify-center gap-4 mt-2 items-center">
                        <select
                            className="border rounded-lg px-4 py-2 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:border-transparent transition-all duration-200"
                            value={selectedExercise}
                            onChange={handleExerciseChange}
                            disabled={isSubmitting}
                        >
                            {exercises.map((letter: string) => (
                                <option key={letter} value={letter}>{letter}</option>
                            ))}
                        </select>

                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".c,.cpp,.cs,.java,.php,.py"
                        />
                        
                        <Button
                            className="bg-[#4F85A6] text-white px-6 py-10 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                            onClick={() => document.getElementById("file-upload")?.click()}
                        >
                            <FaUpload size={18} /> Anexar arquivo
                        </Button>
                    </div>
                    {attachedFileName && (
                        <Typography variant="body2" sx={{ mt: 2, color: '#4F85A6' }}>
                            Arquivo anexado: <span className="font-bold">{attachedFileName}</span>
                        </Typography>
                    )}
                </div>

                <div className="mb-8">
                    <label className="block text-gray-700 text-lg mb-2">
                        <Typography variant="body1" component="span" sx={{ color: '#4F85A6', fontWeight: 'bold' }}>
                            Escolha a Linguagem:
                        </Typography>
                    </label>
                    <select
                        className="border rounded-lg px-4 py-2 mt-2 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:border-transparent transition-all duration-200"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        disabled={isSubmitting}
                    >
                        {languages.map((lang: string) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>

                <Button
                    className={`bg-[#4F85A6] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-lg flex items-center justify-center mx-auto gap-2${isSubmitting || !attachedFileName ? ' opacity-50 pointer-events-none' : ''}`}
                    onClick={handleSubmitAnalysis}
                >
                    {isSubmitting ? 'Enviando...' : 'Enviar'} <FaPaperPlane size={18} />
                </Button>
            </Paper>
        </Box>
    );
};

// ---------------- COMPONENTE RankingPage ----------------
const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

interface GroupRankingData {
    group: string;
    exercisesAccepteds: string[];
    times: { [key: string]: string };
    total: string;
    totalCount: number;
    totalScore: number;
}

const colors = [
    "#979797", "#33353a", "#d46314", "#db7271", "#5c3b22",
    "#d35de9", "#4500d4", "#478898", "#08b2cb", "#c42321",
    "#934383", "#EFAF10", "#F0C5C9", "#856EBC", "#80A582",
];

const data: GroupRankingData[] = [
    { group: "Equipe 1", exercisesAccepteds: ["A","B","C","D","E","F","G","H","I"], times: { A:"2/64",B:"1/16",C:"1/99",D:"2/80",E:"1/31",F:"1/7",G:"1/162",H:"3/120",I:"1/88",J:"2/47"}, total:"9 (740)", totalCount:9, totalScore:740 },
    { group: "Equipe 2", exercisesAccepteds: ["A","B","C","D","E","F","G","H"], times: { A:"1/152",B:"1/113",C:"2/91",D:"1/185",E:"1/89",F:"2/76",G:"1/90",H:"1/77",I:"1/54",J:"1/39"}, total:"8 (640)", totalCount:8, totalScore:640 },
    { group: "Equipe 3", exercisesAccepteds: ["A","B","C","D","E","F","G","H","I","J"], times: { A:"2/64",B:"1/16",C:"1/99",D:"2/80",E:"1/31",F:"1/7",G:"1/162",H:"3/120",I:"1/88",J:"2/47"}, total:"10 (480)", totalCount:10, totalScore:480 },
    { group: "Equipe 4", exercisesAccepteds: ["A","B","C","D","E","F","G"], times: { A:"1/152",B:"1/113",C:"2/91",D:"1/185",E:"1/89",F:"2/76",G:"1/90",H:"1/77",I:"1/54",J:"1/39"}, total:"7 (520)", totalCount:7, totalScore:520 },
    { group: "Equipe 5", exercisesAccepteds: ["A","B","C","E","F","H"], times: { A:"1/120",B:"2/110",C:"1/95",D:"",E:"1/80",F:"1/60",G:"",H:"2/70",I:"1/50",J:""}, total:"6 (500)", totalCount:6, totalScore:500 },
    { group: "Equipe 6", exercisesAccepteds: ["A","C","D","E","G","H"], times: { A:"2/140",B:"",C:"1/100",D:"1/130",E:"2/85",F:"",G:"1/120",H:"1/90",I:"",J:"1/60"}, total:"6 (240)", totalCount:6, totalScore:240 },
    { group: "Equipe 7", exercisesAccepteds: ["B","C","D","F","G","I"], times: { A:"",B:"1/115",C:"2/105",D:"1/125",E:"",F:"1/65",G:"2/100",H:"",I:"1/55",J:"1/45"}, total:"6 (352)", totalCount:6, totalScore:352 },
    { group: "Equipe 8", exercisesAccepteds: ["A","B","E","F","G","H","I"], times: { A:"1/135",B:"1/120",C:"",D:"",E:"2/95",F:"1/75",G:"1/110",H:"1/85",I:"2/60",J:"1/40"}, total:"7 (400)", totalCount:7, totalScore:400 },
];

// Ordenação
data.sort((a, b) => {
    if (a.totalCount === b.totalCount) return a.totalScore - b.totalScore;
    return b.totalCount - a.totalCount;
});

const tableHeaderColumns = ["Equipe", ...letras, "Total"];

const RankingPage: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            {/* Botão no canto superior direito */}
            <div className="flex justify-end mb-4 mt-4">
                <Button
                    className="bg-[#4F85A6] text-white px-6 py-2 rounded-md font-bold hover:bg-[#3B6A82] transition"
                    onClick={() => setOpen(true)}
                >
                    Enviar Exercícios
                </Button>
            </div>

            {/* Tabela */}
            <TableContainerMui component={TableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeaderColumns.map((column, idx) => (
                                <TableCell
                                    key={`${column}-${idx}`}
                                    item={{ content: column, space: 1 }}
                                />
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((rowData, idx) => (
                            <TableRow key={`${rowData.group}-${idx}`}>
                                <TableCell>{rowData.group}</TableCell>
                                {letras.map((l, index) => (
                                    <TableCell key={`${l}-${index}`}>
                                        {rowData.exercisesAccepteds.includes(l) ? (
                                            <StyledRankingCellContainer
                                                $fillColor={colors[index]}
                                                $size={40}
                                            >
                                                <Balao />
                                                {rowData.times[l]}
                                            </StyledRankingCellContainer>
                                        ) : (
                                            " "
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>{rowData.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainerMui>

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: 2,
                        maxHeight: "90vh",
                        overflowY: "auto",
                    }}
                >
                    <AnaliseJuiz />
                </Box>
            </Modal>
        </div>
    );
};

export default RankingPage;
