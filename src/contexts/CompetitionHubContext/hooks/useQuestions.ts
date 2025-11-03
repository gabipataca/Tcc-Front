import { useMemo } from "react";
import { useCompetitionHub } from "@/contexts/CompetitionHubContext";

/**
 * Hook for managing competition questions.
 * Provides filtered question data and actions.
 */
export const useQuestions = () => {
    const { questions, sendQuestion, answerQuestion } = useCompetitionHub();

    /**
     * Get questions filtered by group ID.
     */
    const getQuestionsByGroup = useMemo(() => {
        return (groupId: number) =>
            questions.filter((q) => q.groupId === groupId);
    }, [questions]);

    /**
     * Get questions filtered by exercise ID.
     */
    const getQuestionsByExercise = useMemo(() => {
        return (exerciseId: number) =>
            questions.filter((q) => q.exerciseId === exerciseId);
    }, [questions]);

    /**
     * Get all answered questions.
     */
    const answeredQuestions = useMemo(() => {
        return questions.filter((q) => q.isAnswered);
    }, [questions]);

    /**
     * Get all unanswered questions.
     */
    const unansweredQuestions = useMemo(() => {
        return questions.filter((q) => !q.isAnswered);
    }, [questions]);

    /**
     * Get a specific question by ID.
     */
    const getQuestionById = useMemo(() => {
        return (questionId: number) =>
            questions.find((q) => q.id === questionId);
    }, [questions]);

    /**
     * Count questions by status.
     */
    const questionStats = useMemo(() => {
        return {
            total: questions.length,
            answered: answeredQuestions.length,
            unanswered: unansweredQuestions.length,
        };
    }, [
        questions.length,
        answeredQuestions.length,
        unansweredQuestions.length,
    ]);

    return {
        questions,
        sendQuestion,
        answerQuestion,
        getQuestionsByGroup,
        getQuestionsByExercise,
        answeredQuestions,
        unansweredQuestions,
        getQuestionById,
        questionStats,
    };
};
