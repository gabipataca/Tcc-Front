import type { QuestionResponse } from "@/types/Question/Responses";
import type { QuestionDisplay } from "@/types/Question";

export function mapQuestionToDisplay(
    question: QuestionResponse
): QuestionDisplay {
    return {
        id: question.id,
        title: `Questão #${question.id}`, // Backend não tem title, usando ID como fallback
        question: question.content,
        askedBy: question.user.group.name,
        askedAt: new Date().toISOString(), // Backend não retorna createdAt, usando data atual como fallback
        status: question.answerId ? "answered" : "pending",
        answer: question.answer?.content,
        answeredAt: question.answer ? new Date().toISOString() : undefined, // Backend não retorna answeredAt
        language: undefined, // Backend não retorna language
    };
}

export function mapQuestionsToDisplay(
    questions: QuestionResponse[]
): QuestionDisplay[] {
    return questions.map(mapQuestionToDisplay);
}
