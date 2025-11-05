import { useMemo } from "react";
import { useCompetitionHub } from "@/contexts/CompetitionHubContext";

/**
 * Hook for managing competition questions.
 * Provides filtered question data and actions.
 * Updated to work with new QuestionResponse structure (v1.2).
 */
export const useQuestions = () => {
    const { questions, sendQuestion, answerQuestion } = useCompetitionHub();

    /**
     * Get questions filtered by user ID.
     * @param userId - UUID of the user who asked the question
     */
    const getQuestionsByUser = useMemo(() => {
        return (userId: string) =>
            questions.filter((q) => q.userId === userId);
    }, [questions]);

    /**
     * Get questions filtered by exercise ID.
     * @param exerciseId - ID of the exercise
     */
    const getQuestionsByExercise = useMemo(() => {
        return (exerciseId: number) =>
            questions.filter((q) => q.exerciseId === exerciseId);
    }, [questions]);

    /**
     * Get questions filtered by competition ID.
     * @param competitionId - ID of the competition
     */
    const getQuestionsByCompetition = useMemo(() => {
        return (competitionId: number) =>
            questions.filter((q) => q.competitionId === competitionId);
    }, [questions]);

    /**
     * Get questions filtered by question type.
     * @param questionType - Type of the question (enum)
     */
    const getQuestionsByType = useMemo(() => {
        return (questionType: number) =>
            questions.filter((q) => q.questionType === questionType);
    }, [questions]);

    /**
     * Get all answered questions.
     */
    const answeredQuestions = useMemo(() => {
        return questions.filter((q) => q.answer !== null && q.answer !== undefined);
    }, [questions]);

    /**
     * Get all unanswered questions.
     */
    const unansweredQuestions = useMemo(() => {
        return questions.filter((q) => q.answer === null || q.answer === undefined);
    }, [questions]);

    /**
     * Get general questions (not related to any specific exercise).
     */
    const generalQuestions = useMemo(() => {
        return questions.filter((q) => q.exerciseId === null || q.exerciseId === undefined);
    }, [questions]);

    /**
     * Get exercise-specific questions.
     */
    const exerciseSpecificQuestions = useMemo(() => {
        return questions.filter((q) => q.exerciseId !== null && q.exerciseId !== undefined);
    }, [questions]);

    /**
     * Get a specific question by ID.
     * @param questionId - ID of the question
     */
    const getQuestionById = useMemo(() => {
        return (questionId: number) =>
            questions.find((q) => q.id === questionId);
    }, [questions]);

    /**
     * Get questions by user email.
     * @param email - Email of the user
     */
    const getQuestionsByEmail = useMemo(() => {
        return (email: string) =>
            questions.filter((q) => q.user.email === email);
    }, [questions]);

    /**
     * Get questions by user name.
     * @param name - Name of the user
     */
    const getQuestionsByName = useMemo(() => {
        return (name: string) =>
            questions.filter((q) => q.user.name.toLowerCase().includes(name.toLowerCase()));
    }, [questions]);

    /**
     * Count questions by status and other metrics.
     */
    const questionStats = useMemo(() => {
        return {
            total: questions.length,
            answered: answeredQuestions.length,
            unanswered: unansweredQuestions.length,
            general: generalQuestions.length,
            exerciseSpecific: exerciseSpecificQuestions.length,
            answerRate: questions.length > 0 
                ? ((answeredQuestions.length / questions.length) * 100).toFixed(1)
                : "0.0",
        };
    }, [
        questions.length,
        answeredQuestions.length,
        unansweredQuestions.length,
        generalQuestions.length,
        exerciseSpecificQuestions.length,
    ]);

    return {
        questions,
        sendQuestion,
        answerQuestion,
        getQuestionsByUser,
        getQuestionsByExercise,
        getQuestionsByCompetition,
        getQuestionsByType,
        getQuestionsByEmail,
        getQuestionsByName,
        answeredQuestions,
        unansweredQuestions,
        generalQuestions,
        exerciseSpecificQuestions,
        getQuestionById,
        questionStats,
    };
};
