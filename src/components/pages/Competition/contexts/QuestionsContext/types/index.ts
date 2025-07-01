import { Question } from "@/components/pages/Competition/pages/Questions/types";

export interface QuestionsContextProps {
    questions: Question[];
    updateQuestion: (id: number, answerText: string) => Question | undefined;
    insertQuestion: (question: Question) => Question | undefined;
    deleteQuestion: (id: number) => void;
    getQuestionById: (id: number) => Question | undefined;
    editQuestion: (updatedQuestion: Question) => void;
}
