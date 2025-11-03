/**
 * Adapter to convert between SignalR QuestionResponse and legacy Question types
 * This allows gradual migration from old context system to new SignalR hooks
 */

import type { QuestionResponse } from "@/types/SignalR";
import type { Question } from "@/components/pages/Competition/pages/Questions/types";

/**
 * Converts a SignalR QuestionResponse to the legacy Question format
 * used by the existing UI components
 */
export function questionResponseToLegacy(
  questionResponse: QuestionResponse,
  exerciseLetters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
): Question {
  const exerciseId = questionResponse.exerciseId ?? 0;
  const exerciseLetter = exerciseLetters[exerciseId - 1] || `Ex${exerciseId}`;
  
  return {
    id: questionResponse.id,
    title: `Questão sobre Exercício ${exerciseLetter}`,
    question: questionResponse.questionText,
    askedBy: questionResponse.askedBy,
    askedAt: questionResponse.askedAt,
    status: questionResponse.isAnswered ? "answered" : "pending",
    answer: questionResponse.answer?.answerText,
    answeredAt: questionResponse.answer?.answeredAt,
    language: undefined, // Not provided by SignalR backend
  };
}

/**
 * Converts an array of SignalR QuestionResponse to legacy Question array
 */
export function questionResponsesToLegacy(
  questionResponses: QuestionResponse[]
): Question[] {
  return questionResponses.map((qr) => questionResponseToLegacy(qr));
}
