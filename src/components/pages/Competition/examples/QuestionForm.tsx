"use client";

import React, { useState } from "react";
import { useQuestions } from "@/contexts/CompetitionHubContext/hooks";
import { useUser } from "@/contexts/UserContext";
import { useCompetitionStatus } from "@/contexts/CompetitionHubContext/hooks";
import { CreateGroupQuestionRequest } from "@/types/SignalR/Requests";

/**
 * Example component for asking questions during competition.
 */
export const QuestionForm: React.FC<{
    exerciseId?: number;
}> = ({ exerciseId }) => {
    const { user } = useUser();
    const { sendQuestion, questions } = useQuestions();
    const { ongoingCompetition } = useCompetitionStatus();

    const [questionText, setQuestionText] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.group?.id || !ongoingCompetition) {
            alert("Você precisa estar em um grupo e em uma competição ativa.");
            return;
        }

        setIsSending(true);

        const request: CreateGroupQuestionRequest = {
            groupId: user.group.id,
            competitionId: ongoingCompetition.id,
            exerciseId: exerciseId || null,
            questionText,
        };

        try {
            await sendQuestion(request);
            setQuestionText(""); // Clear form on success
        } catch (error) {
            console.error("Question send error:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-2">Sua Pergunta:</label>
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="w-full h-32 p-2 border rounded"
                        placeholder="Digite sua pergunta aqui..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSending}
                    className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
                >
                    {isSending ? "Enviando..." : "Enviar Pergunta"}
                </button>
            </form>

            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                    Minhas Perguntas ({questions.length})
                </h3>
                <div className="flex flex-col gap-3">
                    {questions
                        .filter((q) => q.groupId === user?.group?.id)
                        .map((question) => (
                            <div
                                key={question.id}
                                className="p-4 border rounded bg-gray-50"
                            >
                                <p className="font-semibold mb-2">
                                    {question.questionText}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Perguntado por: {question.askedBy} em{" "}
                                    {new Date(question.askedAt).toLocaleString()}
                                </p>
                                {question.isAnswered && question.answer ? (
                                    <div className="mt-3 p-3 bg-blue-50 rounded">
                                        <p className="font-semibold text-blue-800">
                                            Resposta de {question.answer.answeredBy}:
                                        </p>
                                        <p className="text-blue-900">
                                            {question.answer.answerText}
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Respondida em:{" "}
                                            {new Date(
                                                question.answer.answeredAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-yellow-600 mt-2">
                                        Aguardando resposta...
                                    </p>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
