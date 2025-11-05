"use client";

import React, { useState } from "react";
import { useSubmissions } from "@/contexts/CompetitionHubContext/hooks";
import { useUser } from "@/contexts/UserContext";
import { useCompetitionStatus } from "@/contexts/CompetitionHubContext/hooks";
import { GroupExerciseAttemptRequest } from "@/types/SignalR/Requests";

/**
 * Example component demonstrating how to submit an exercise solution.
 */
export const ExerciseSubmissionForm: React.FC<{
    exerciseId: number;
}> = ({ exerciseId }) => {
    const { user } = useUser();
    const { sendExerciseAttempt } = useSubmissions();
    const { canSubmit, ongoingCompetition } = useCompetitionStatus();

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState<number>(71); // Python default (Judge0 ID)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.group?.id || !ongoingCompetition) {
            alert("Você precisa estar em um grupo e em uma competição ativa.");
            return;
        }

        if (!canSubmit) {
            alert("Submissões não estão permitidas no momento.");
            return;
        }

        setIsSubmitting(true);

        const request: GroupExerciseAttemptRequest = {
            groupId: user.group.id,
            exerciseId,
            code,
            languageId: language,
            competitionId: ongoingCompetition.id,
        };

        try {
            await sendExerciseAttempt(request);
            setCode(""); // Clear form on success
        } catch (error) {
            console.error("Submit error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block mb-2">Linguagem:</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    <option value={51}>C#</option>
                    <option value={62}>Java</option>
                    <option value={63}>JavaScript</option>
                    <option value={60}>Go</option>
                    <option value={71}>Python</option>
                    <option value={50}>C</option>
                    <option value={54}>C++</option>
                    <option value={68}>PHP</option>
                </select>
            </div>

            <div>
                <label className="block mb-2">Código:</label>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-2 border rounded font-mono"
                    placeholder="Cole seu código aqui..."
                    required
                />
            </div>

            <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >
                {isSubmitting ? "Enviando..." : "Submeter Solução"}
            </button>

            {!canSubmit && (
                <p className="text-red-600">
                    Submissões não estão permitidas no momento.
                </p>
            )}
        </form>
    );
};
