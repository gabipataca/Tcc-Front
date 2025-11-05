import type { QuestionResponse } from "@/types/SignalR";
import type { Question } from "@/components/pages/Competition/pages/Questions/types";

/**
 * Maps a SignalR QuestionResponse to the local Question format.
 * Provides backward compatibility with legacy UI fields.
 * 
 * @param signalRQuestion - The question response from SignalR hub
 * @returns Question object compatible with local context
 */
export function mapQuestionToDisplay(
    signalRQuestion: QuestionResponse
): Question {
    return {
        id: signalRQuestion.id,
        competitionId: signalRQuestion.competitionId,
        exerciseId: signalRQuestion.exerciseId,
        userId: signalRQuestion.userId,
        userName: signalRQuestion.user.name,
        userEmail: signalRQuestion.user.email,
        content: signalRQuestion.content,
        questionType: signalRQuestion.questionType,
        answerId: signalRQuestion.answerId,
        answer: signalRQuestion.answer ? {
            id: signalRQuestion.answer.id,
            content: signalRQuestion.answer.content,
            userId: signalRQuestion.answer.userId,
            userName: signalRQuestion.answer.user.name,
            userEmail: signalRQuestion.answer.user.email,
        } : null,
        
        // Backward compatibility fields for UI
        title: signalRQuestion.exerciseId 
            ? `Dúvida sobre exercício ${String.fromCharCode(64 + signalRQuestion.exerciseId)}`
            : `Pergunta geral #${signalRQuestion.id}`,
        question: signalRQuestion.content,
        askedBy: signalRQuestion.user.name,
        askedAt: signalRQuestion.user.createdAt,
        status: signalRQuestion.answer ? 'answered' : 'pending',
        answeredAt: signalRQuestion.answer?.user.lastLoggedAt,
        language: undefined, // Not provided by backend
    };
}

/**
 * Maps an array of SignalR QuestionResponse to local Question format.
 * 
 * @param signalRQuestions - Array of question responses from SignalR hub
 * @returns Array of Question objects compatible with local context
 */
export function mapQuestionsToDisplay(
    signalRQuestions: QuestionResponse[]
): Question[] {
    return signalRQuestions.map(mapQuestionToDisplay);
}
