export interface CreateQuestionRequest {
    competitionId: number;
    exerciseId: number;
    languageId?: number;
    title: string;
    content: string;
    questionType: number;
}

export interface AnswerQuestionRequest {
    content: string;
}
