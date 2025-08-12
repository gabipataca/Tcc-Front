import { useState, useCallback, useMemo } from "react";
import { Badge } from "@/components/_ui/Badge";
import { Check, X, AlertCircle } from "lucide-react";

interface ExerciseSubmission {
    id: string;
    groupName: string;
    submissionTime: string;
    status: "pending" | "approved" | "rejected";
    errorType: string | null;
    fileName: string;
    fileUrl: string;
}

const mockData: ExerciseSubmission[] = [
    {
        id: "1",
        groupName: "CyberKnights",
        submissionTime: "2025-06-26 14:30:15",
        status: "pending",
        errorType: null,
        fileName: "exercicio_1.py",
        fileUrl: "#",
    },
    {
        id: "2",
        groupName: "CodeMasters",
        submissionTime: "2025-06-26 14:25:42",
        status: "approved",
        errorType: null,
        fileName: "solucao.cpp",
        fileUrl: "#",
    },
    {
        id: "3",
        groupName: "BinaryBlazers",
        submissionTime: "2025-06-26 14:20:08",
        status: "rejected",
        errorType: "Erro de Sintaxe",
        fileName: "algoritmo.java",
        fileUrl: "#",
    },
    {
        id: "4",
        groupName: "AlgorithmicAvengers",
        submissionTime: "2025-06-26 14:15:33",
        status: "rejected",
        errorType: "Lógica Incorreta",
        fileName: "resposta.py",
        fileUrl: "#",
    },
    {
        id: "5",
        groupName: "SyntaxSyndicate",
        submissionTime: "2025-06-26 14:10:17",
        status: "pending",
        errorType: null,
        fileName: "exercicio_final.js",
        fileUrl: "#",
    },
    {
        id: "6",
        groupName: "The Debuggers",
        submissionTime: "2025-06-26 14:05:55",
        status: "approved",
        errorType: null,
        fileName: "solucao_otimizada.py",
        fileUrl: "#",
    },
    {
        id: "7",
        groupName: "BitBusters",
        submissionTime: "2025-06-26 14:00:22",
        status: "pending",
        errorType: null,
        fileName: "implementacao.c",
        fileUrl: "#",
    },
    {
        id: "8",
        groupName: "PixelPirates",
        submissionTime: "2025-06-26 13:55:41",
        status: "rejected",
        errorType: "Timeout de Execução",
        fileName: "algoritmo_lento.py",
        fileUrl: "#",
    },
];

const useManualCorrection = () => {
    const [submissions, setSubmissions] =
        useState<ExerciseSubmission[]>(mockData);
    const [selectedSubmission, setSelectedSubmission] =
        useState<ExerciseSubmission | null>(null);
    const [feedback, setFeedback] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleApprove = useCallback((id: string) => {
        setSubmissions((prev) =>
            prev.map((sub) =>
                sub.id === id
                    ? { ...sub, status: "approved", errorType: null }
                    : sub
            )
        );
    }, []);

    const handleReject = useCallback((id: string, errorType: string) => {
        setSubmissions((prev) =>
            prev.map((sub) =>
                sub.id === id ? { ...sub, status: "rejected", errorType } : sub
            )
        );
        setSelectedSubmission(null);
        setFeedback("");
    }, []);

    const handleDownload = useCallback((fileUrl: string, fileName: string) => {
        console.log(`Baixando arquivo: ${fileName} de ${fileUrl}`);
        alert(`Download iniciado: ${fileName}`);
    }, []);

    const getStatusBadge = useCallback(
        (status: ExerciseSubmission["status"]) => {
            if (status === "approved") {
                return Badge({
                    className: "bg-green-100 text-green-800 hover:bg-green-100",
                    children: "Aprovado",
                });
            }
            if (status === "rejected") {
                return Badge({
                    className: "bg-red-100 text-red-800 hover:bg-red-100",
                    children: "Reprovado",
                });
            }
            if (status === "pending") {
                return Badge({
                    className:
                        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                    children: "Pendente",
                });
            }
            return Badge({ variant: "secondary", children: "Desconhecido" });
        },
        []
    );

    const totalPages = useMemo(
        () => Math.ceil(submissions.length / itemsPerPage),
        [submissions.length, itemsPerPage]
    );
    const startIndex = useMemo(
        () => (currentPage - 1) * itemsPerPage,
        [currentPage, itemsPerPage]
    );
    const endIndex = useMemo(
        () => startIndex + itemsPerPage,
        [startIndex, itemsPerPage]
    );
    const currentSubmissions = useMemo(
        () => submissions.slice(startIndex, endIndex),
        [submissions, startIndex, endIndex]
    );

    const handleOpenRejectDialog = useCallback(
        (submission: ExerciseSubmission) => {
            setSelectedSubmission(submission);
            setFeedback("");
        },
        []
    );

    const handleCloseRejectDialog = useCallback(() => {
        setSelectedSubmission(null);
        setFeedback("");
    }, []);

    const handleConfirmReject = useCallback(() => {
        if (selectedSubmission && feedback.trim()) {
            handleReject(selectedSubmission.id, feedback.trim());
        }
    }, [selectedSubmission, feedback, handleReject]);

    return {
        submissions,
        selectedSubmission,
        feedback,
        setFeedback,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        handleApprove,
        handleDownload,
        getStatusBadge,
        totalPages,
        currentSubmissions,
        handleOpenRejectDialog,
        handleCloseRejectDialog,
        handleConfirmReject,
    };
};

export default useManualCorrection;
