import { Question, QuestionType } from ".";
import { PagedResult } from "../Global";
import { GenericUserInfo } from "../User";


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