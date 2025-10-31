import type { QuestionType } from ".";
import type { PagedResult } from "../Global";
import type { GenericUserInfo } from "../User";

export interface AnswerResponse {
    id: number;
    content: string;
    userId: string;
}

export interface QuestionResponse {
    id: number;
    competitionId: number;
    exerciseId?: number;
    userId: string;
    user: GenericUserInfo;
    content: string;
    answerId?: number;
    answer?: AnswerResponse;
    questionType: QuestionType;
}

export type GetQuestionsResponse = PagedResult<QuestionResponse>;

export interface CreateQuestionResponse {
    id: number;
    message: string;
}

export interface AnswerQuestionResponse {
    id: number;
    message: string;
}
