/**
 * Questions Provider that bridges CompetitionHubContext hooks with legacy QuestionsContext interface
 * This allows existing components to work with SignalR data without major refactoring
 */

"use client";

import React, { useMemo, useCallback } from "react";
import { QuestionsContext } from "./index";
import type { QuestionsContextProps } from "./types";
import type { Question } from "@/components/pages/Competition/pages/Questions/types";
import { useQuestions as useSignalRQuestions } from "@/contexts/CompetitionHubContext/hooks/useQuestions";
import { useUser } from "@/contexts/UserContext";
import { useCompetitionHub } from "@/contexts/CompetitionHubContext";
import { questionResponsesToLegacy, questionResponseToLegacy } from "@/components/pages/Competition/adapters/questionAdapter";
import type { AnswerGroupQuestionRequest } from "@/types/SignalR/Requests";

interface QuestionsProviderProps {
  children: React.ReactNode;
}

export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({ children }) => {
  const { user } = useUser();
  const { answerQuestion } = useCompetitionHub();
  const signalRQuestions = useSignalRQuestions();

  // Convert SignalR questions to legacy format
  const questions = useMemo(() => {
    return questionResponsesToLegacy(signalRQuestions.questions);
  }, [signalRQuestions.questions]);

  /**
   * Update question with an answer (Teacher/Admin only)
   */
  const updateQuestion = useCallback(
    (id: number, answerText: string): Question | undefined => {
      const question = signalRQuestions.getQuestionById(id);
      if (!question || !user) {
        console.error("[QuestionsProvider] Cannot answer: missing data", {
          hasQuestion: !!question,
          hasUser: !!user,
        });
        return undefined;
      }

      // Create answer request matching backend AnswerGroupQuestionRequest
      const request: AnswerGroupQuestionRequest = {
        questionId: id,
        answer: answerText.trim(),
      };

      // Send answer via SignalR
      answerQuestion(request);

      // Return optimistic update (actual update comes via SignalR event)
      return questionResponseToLegacy({
        ...question,
        answerId: 0, // Temporary ID, will be replaced by server response
        answer: {
          id: 0,
          content: answerText.trim(),
          userId: user.id,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString(),
            lastLoggedAt: new Date().toISOString(),
            ra: user.ra || "",
            joinYear: user.joinYear || new Date().getFullYear(),
            department: user.department || null,
            exercisesCreated: null,
          },
        },
      });
    },
    [signalRQuestions, answerQuestion, user]
  );

  /**
   * Insert a new question (not implemented - questions are created via form submission)
   */
  const insertQuestion = useCallback((): Question | undefined => {
    console.warn("[QuestionsProvider] insertQuestion called but not implemented. Use question form to submit.");
    return undefined;
  }, []);

  /**
   * Delete a question (not supported by backend)
   */
  const deleteQuestion = useCallback((): void => {
    console.warn("[QuestionsProvider] deleteQuestion called but not supported by backend API");
  }, []);

  /**
   * Get question by ID
   */
  const getQuestionById = useCallback(
    (id: number): Question | undefined => {
      const question = signalRQuestions.getQuestionById(id);
      return question ? questionResponseToLegacy(question) : undefined;
    },
    [signalRQuestions]
  );

  /**
   * Edit question (not supported - questions are immutable after creation)
   */
  const editQuestion = useCallback((): void => {
    console.warn("[QuestionsProvider] editQuestion called but questions are immutable after creation");
  }, []);

  const value: QuestionsContextProps = {
    questions,
    updateQuestion,
    insertQuestion,
    deleteQuestion,
    getQuestionById,
    editQuestion,
  };

  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
};
