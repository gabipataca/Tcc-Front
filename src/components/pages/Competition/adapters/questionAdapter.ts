/**
 * Adapter to convert between SignalR QuestionResponse and legacy Question types
 * This allows gradual migration from old context system to new SignalR hooks
 * Updated for v1.2 documentation (November 5, 2025)
 */

import type { QuestionResponse } from "@/types/SignalR";
import type { Question } from "@/components/pages/Competition/pages/Questions/types";

/**
 * Converts a SignalR QuestionResponse to the legacy Question format
 * used by the existing UI components.
 * 
 * @param questionResponse - Question from SignalR hub
 * @param exerciseLetters - Array of exercise letters for display
 * @returns Question in legacy format for UI components
 */
export function questionResponseToLegacy(
  questionResponse: QuestionResponse,
  exerciseLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
): Question {
  const exerciseId = questionResponse.exerciseId ?? 0;
  const exerciseLetter = exerciseId > 0 ? exerciseLetters[exerciseId - 1] || `Ex${exerciseId}` : "Geral";
  
  const legacyQuestion: Question = {
    // New structure fields
    id: questionResponse.id,
    competitionId: questionResponse.competitionId,
    exerciseId: questionResponse.exerciseId,
    userId: questionResponse.userId,
    userName: questionResponse.user.name,
    userEmail: questionResponse.user.email,
    content: questionResponse.content,
    questionType: questionResponse.questionType,
    answerId: questionResponse.answerId,
    answer: questionResponse.answer ? {
      id: questionResponse.answer.id,
      content: questionResponse.answer.content,
      userId: questionResponse.answer.userId,
      userName: questionResponse.answer.user.name,
      userEmail: questionResponse.answer.user.email,
    } : null,
    
    // Legacy fields for backward compatibility
    title: exerciseId > 0 
      ? `Dúvida sobre Exercício ${exerciseLetter}`
      : `Pergunta Geral #${questionResponse.id}`,
    question: questionResponse.content,
    askedBy: questionResponse.group?.name || questionResponse.user.name,
    askedAt: questionResponse.user.createdAt,
    status: questionResponse.answer ? "answered" : "pending",
    answeredAt: questionResponse.answer?.user.lastLoggedAt,
    language: undefined, // Not provided by SignalR backend
  };
  
  return legacyQuestion;
}

/**
 * Converts an array of SignalR QuestionResponse to legacy Question array.
 * 
 * @param questionResponses - Array of questions from SignalR hub
 * @returns Array of questions in legacy format
 */
export function questionResponsesToLegacy(
  questionResponses: QuestionResponse[]
): Question[] {
  return questionResponses.map((qr) => questionResponseToLegacy(qr));
}
