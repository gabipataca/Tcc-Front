"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useSnackbar } from "notistack";
import {
    OnConnectionResponse,
    ExerciseSubmissionResponse,
    QuestionResponse,
    AnswerResponse,
    CompetitionRankingResponse,
} from "@/types/SignalR";
import {
    GroupExerciseAttemptRequest,
    CreateGroupQuestionRequest,
    AnswerGroupQuestionRequest,
    RevokeGroupSubmissionRequest,
    BlockGroupSubmissionRequest,
    UnblockGroupSubmissionRequest,
} from "@/types/SignalR/Requests";
import { JudgeResponseEnum } from "@/types/Exercise";

/**
 * Context type for Competition Hub functionality.
 */
interface CompetitionHubContextType {
    /**
     * Current ongoing competition data.
     */
    ongoingCompetition: OnConnectionResponse;

    /**
     * List of all submissions in real-time.
     */
    submissions: ExerciseSubmissionResponse[];

    /**
     * List of all questions in real-time.
     */
    questions: QuestionResponse[];

    /**
     * Current competition ranking.
     */
    ranking: CompetitionRankingResponse[];

    /**
     * Whether the hub is connected and ready.
     */
    isConnected: boolean;

    /**
     * Send an exercise submission.
     */
    sendExerciseAttempt: (request: GroupExerciseAttemptRequest) => Promise<void>;

    /**
     * Send a question during competition.
     */
    sendQuestion: (request: CreateGroupQuestionRequest) => Promise<void>;

    /**
     * Answer a question (Admin/Teacher only).
     */
    answerQuestion: (request: AnswerGroupQuestionRequest) => Promise<void>;

    /**
     * Manually change a submission's judge response (Admin/Teacher only).
     */
    changeJudgeResponse: (request: RevokeGroupSubmissionRequest) => Promise<void>;

    /**
     * Block a group from submitting (Admin/Teacher only).
     */
    blockGroupSubmission: (request: BlockGroupSubmissionRequest) => Promise<void>;

    /**
     * Unblock a group's submission capability (Admin/Teacher only).
     */
    unblockGroupSubmission: (request: UnblockGroupSubmissionRequest) => Promise<void>;

    /**
     * Ping the hub for health check.
     */
    ping: () => Promise<void>;
}

const CompetitionHubContext = createContext<CompetitionHubContextType | null>(null);

/**
 * Provider component for Competition Hub context.
 */
export const CompetitionHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { webSocketConnection } = useWebSocketContext();
    const { enqueueSnackbar } = useSnackbar();

    const [ongoingCompetition, setOngoingCompetition] = useState<OnConnectionResponse>(null);
    const [submissions, setSubmissions] = useState<ExerciseSubmissionResponse[]>([]);
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [ranking, setRanking] = useState<CompetitionRankingResponse[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    // ==================== Event Listeners ====================

    useEffect(() => {
        if (!webSocketConnection) return;

        // Connection established - receive competition data
        webSocketConnection.on("OnConnectionResponse", (data: OnConnectionResponse) => {
            console.log("📡 OnConnectionResponse:", data);
            setRanking(data?.competitionRankings || []);
            console.log(data?.competitionRankings);
            setOngoingCompetition(data);
            setIsConnected(true);
        });

        // Pong response for health check
        webSocketConnection.on("Pong", (response: { message: string }) => {
            console.log("🏓 Pong:", response.message);
        });

        // Exercise submission error - validation failed before processing
        webSocketConnection.on("ReceiveExerciseAttemptError", (error: { message: string }) => {
            console.error("❌ ReceiveExerciseAttemptError:", error);
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 5000,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        });

        // Exercise submission responses - for the student who submitted
        webSocketConnection.on("ReceiveExerciseAttemptResponse", (submission: ExerciseSubmissionResponse | null) => {
            console.log("📝 ReceiveExerciseAttemptResponse:", submission);
            if (submission) {
                setSubmissions((prev) => {
                    const exists = prev.find(s => s.id === submission.id);
                    if (exists) {
                        return prev.map(s => s.id === submission.id ? submission : s);
                    }
                    return [...prev, submission];
                });

                const statusText = submission.judgeResponse == JudgeResponseEnum.Accepted ? "aceita" : "rejeitada";
                enqueueSnackbar(`Submissão ${statusText}!`, {
                    variant: submission.judgeResponse == JudgeResponseEnum.Accepted ? "success" : "error",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        });

        // Exercise submission notifications - for admins/teachers
        webSocketConnection.on("ReceiveExerciseAttempt", (submission: ExerciseSubmissionResponse) => {
            console.log("📝 ReceiveExerciseAttempt (Admin/Teacher):", submission);
            setSubmissions((prev) => {
                const exists = prev.find(s => s.id === submission.id);
                if (exists) {
                    return prev.map(s => s.id === submission.id ? submission : s);
                }
                return [...prev, submission];
            });
        });

        // Ranking update - broadcast to all participants
        webSocketConnection.on("ReceiveRankingUpdate", (rankingUpdate: CompetitionRankingResponse) => {
            console.log("🏆 ReceiveRankingUpdate:", rankingUpdate);
            setRanking((prev) => {
                const exists = prev.find(r => r.group.id === rankingUpdate.group.id);
                if (exists) {
                    return prev.map(r => r.group.id === rankingUpdate.group.id ? rankingUpdate : r)
                        .sort((a, b) => a.rankOrder - b.rankOrder);
                }
                return [...prev, rankingUpdate].sort((a, b) => a.rankOrder - b.rankOrder);
            });
        });

        // Question creation response - for the student who asked
        webSocketConnection.on("ReceiveQuestionCreationResponse", (question: QuestionResponse | null) => {
            console.log("❓ ReceiveQuestionCreationResponse:", question);
            if (question) {
                setQuestions((prev) => {
                    const exists = prev.find(q => q.id === question.id);
                    if (exists) return prev;
                    return [...prev, question];
                });

                enqueueSnackbar("Pergunta enviada com sucesso!", {
                    variant: "success",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        });

        // Question creation notification - for admins/teachers
        webSocketConnection.on("ReceiveQuestionCreation", (question: QuestionResponse) => {
            console.log("❓ ReceiveQuestionCreation (Admin/Teacher):", question);
            setQuestions((prev) => {
                const exists = prev.find(q => q.id === question.id);
                if (exists) return prev;
                return [...prev, question];
            });

            enqueueSnackbar("Nova pergunta recebida!", {
                variant: "info",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        });

        // Answer response - for the person who answered
        webSocketConnection.on("ReceiveQuestionAnswerResponse", (answer: AnswerResponse | null) => {
            console.log("💬 ReceiveQuestionAnswerResponse:", answer);
            if (answer) {
                setQuestions((prev) =>
                    prev.map((q) =>
                        q.id === answer.questionId ? { ...q, answer } : q
                    )
                );

                enqueueSnackbar("Resposta enviada com sucesso!", {
                    variant: "success",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        });

        // Answer notification - for admins/teachers
        webSocketConnection.on("ReceiveQuestionAnswer", (answer: AnswerResponse) => {
            console.log("💬 ReceiveQuestionAnswer (Admin/Teacher):", answer);
            setQuestions((prev) =>
                prev.map((q) =>
                    q.id === answer.questionId ? { ...q, answer } : q
                )
            );
        });

        // Judge response change result
        webSocketConnection.on("ReceiveChangeJudgeSubmissionResponse", (success: boolean) => {
            console.log("⚖️ ReceiveChangeJudgeSubmissionResponse:", success);
            if (success) {
                enqueueSnackbar("Resposta do juiz alterada com sucesso!", {
                    variant: "success",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } else {
                enqueueSnackbar("Falha ao alterar resposta do juiz.", {
                    variant: "error",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        });

        // Block group submission result
        webSocketConnection.on("ReceiveBlockGroupSubmissionResponse", (success: boolean) => {
            console.log("🚫 ReceiveBlockGroupSubmissionResponse:", success);
            if (success) {
                enqueueSnackbar("Grupo bloqueado com sucesso!", {
                    variant: "success",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } else {
                enqueueSnackbar("Falha ao bloquear grupo.", {
                    variant: "error",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        });

        // Unblock group submission result
        webSocketConnection.on("ReceiveUnblockGroupSubmissionResponse", (success: boolean) => {
            console.log("✅ ReceiveUnblockGroupSubmissionResponse:", success);
            if (success) {
                enqueueSnackbar("Grupo desbloqueado com sucesso!", {
                    variant: "success",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } else {
                enqueueSnackbar("Falha ao desbloquear grupo.", {
                    variant: "error",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        });

        return () => {
            // Cleanup listeners
            webSocketConnection.off("OnConnectionResponse");
            webSocketConnection.off("Pong");
            webSocketConnection.off("ReceiveExerciseAttemptError");
            webSocketConnection.off("ReceiveExerciseAttemptResponse");
            webSocketConnection.off("ReceiveExerciseAttempt");
            webSocketConnection.off("ReceiveRankingUpdate");
            webSocketConnection.off("ReceiveQuestionCreationResponse");
            webSocketConnection.off("ReceiveQuestionCreation");
            webSocketConnection.off("ReceiveQuestionAnswerResponse");
            webSocketConnection.off("ReceiveQuestionAnswer");
            webSocketConnection.off("ReceiveChangeJudgeSubmissionResponse");
            webSocketConnection.off("ReceiveBlockGroupSubmissionResponse");
            webSocketConnection.off("ReceiveUnblockGroupSubmissionResponse");
        };
    }, [webSocketConnection, enqueueSnackbar]);

    // ==================== Hub Methods ====================

    const sendExerciseAttempt = useCallback(
        async (request: GroupExerciseAttemptRequest) => {
            if (!webSocketConnection) {
                enqueueSnackbar("Conexão WebSocket não estabelecida.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
                return;
            }

            try {
                await webSocketConnection.invoke("SendExerciseAttempt", request);
                enqueueSnackbar("Submissão enviada para processamento...", {
                    variant: "info",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } catch (error) {
                console.error("Error sending exercise attempt:", error);
                enqueueSnackbar("Erro ao enviar submissão.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [webSocketConnection, enqueueSnackbar]
    );

    const sendQuestion = useCallback(
        async (request: CreateGroupQuestionRequest) => {
            if (!webSocketConnection) {
                enqueueSnackbar("Conexão WebSocket não estabelecida.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
                return;
            }

            try {
                await webSocketConnection.invoke("SendCompetitionQuestion", request);
            } catch (error) {
                console.error("Error sending question:", error);
                enqueueSnackbar("Erro ao enviar pergunta.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [webSocketConnection, enqueueSnackbar]
    );

    const answerQuestion = useCallback(
        async (request: AnswerGroupQuestionRequest) => {
            if (!webSocketConnection) {
                enqueueSnackbar("Conexão WebSocket não estabelecida.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
                return;
            }

            try {
                await webSocketConnection.invoke("AnswerQuestion", request);
            } catch (error) {
                console.error("Error answering question:", error);
                enqueueSnackbar("Erro ao responder pergunta.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [webSocketConnection, enqueueSnackbar]
    );

    const changeJudgeResponse = useCallback(
        async (request: RevokeGroupSubmissionRequest) => {
            if (!webSocketConnection) {
                enqueueSnackbar("Conexão WebSocket não estabelecida.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
                return;
            }

            try {
                await webSocketConnection.invoke("ChangeJudgeSubmissionResponse", request);
            } catch (error) {
                console.error("Error changing judge response:", error);
                enqueueSnackbar("Erro ao alterar resposta do juiz.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [webSocketConnection, enqueueSnackbar]
    );

    const blockGroupSubmission = useCallback(
        async (request: BlockGroupSubmissionRequest) => {
            if (!webSocketConnection) {
                enqueueSnackbar("Conexão WebSocket não estabelecida.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
                return;
            }

            try {
                await webSocketConnection.invoke("BlockGroupSubmission", request);
            } catch (error) {
                console.error("Error blocking group submission:", error);
                enqueueSnackbar("Erro ao bloquear grupo.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [webSocketConnection, enqueueSnackbar]
    );

    const unblockGroupSubmission = useCallback(
        async (request: UnblockGroupSubmissionRequest) => {
            if (!webSocketConnection) {
                enqueueSnackbar("Conexão WebSocket não estabelecida.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
                return;
            }

            try {
                await webSocketConnection.invoke("UnblockGroupSubmission", request);
            } catch (error) {
                console.error("Error unblocking group submission:", error);
                enqueueSnackbar("Erro ao desbloquear grupo.", {
                    variant: "error",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [webSocketConnection, enqueueSnackbar]
    );

    const ping = useCallback(async () => {
        if (!webSocketConnection) return;

        try {
            await webSocketConnection.invoke("Ping");
        } catch (error) {
            console.error("Error pinging hub:", error);
        }
    }, [webSocketConnection]);

    const value: CompetitionHubContextType = {
        ongoingCompetition,
        submissions,
        questions,
        ranking,
        isConnected,
        sendExerciseAttempt,
        sendQuestion,
        answerQuestion,
        changeJudgeResponse,
        blockGroupSubmission,
        unblockGroupSubmission,
        ping,
    };

    return (
        <CompetitionHubContext.Provider value={value}>
            {children}
        </CompetitionHubContext.Provider>
    );
};

/**
 * Hook to access Competition Hub context.
 * Must be used within CompetitionHubProvider.
 */
export const useCompetitionHub = () => {
    const context = useContext(CompetitionHubContext);

    if (!context) {
        throw new Error("useCompetitionHub must be used within CompetitionHubProvider");
    }

    return context;
};
