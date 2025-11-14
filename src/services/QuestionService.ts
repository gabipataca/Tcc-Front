import { apiRequest } from "@/libs/apiClient";
import type { ServerSideResponse } from "@/types/Global";
import type {
    CreateQuestionRequest,
    AnswerQuestionRequest,
} from "@/types/Question/Requests";
import type {
    GetQuestionsResponse,
    CreateQuestionResponse,
    AnswerQuestionResponse,
} from "@/types/Question/Responses";

class QuestionService {
    public async GetQuestions(page: number, pageSize: number) {
        const response = await apiRequest<
            ServerSideResponse<GetQuestionsResponse>
        >("/api/question", {
            method: "GET",
            params: {
                page,
                pageSize,
            },
        });

        return response.data;
    }

    public async CreateQuestion(data: CreateQuestionRequest) {
        const response = await apiRequest<
            ServerSideResponse<CreateQuestionResponse>
        >("/api/question", {
            method: "POST",
            data,
        });

        return response.data;
    }

    public async AnswerQuestion(
        questionId: number,
        data: AnswerQuestionRequest
    ) {
        const response = await apiRequest<
            ServerSideResponse<AnswerQuestionResponse>
        >(`/api/question/${questionId}/answer`, {
            method: "POST",
            data,
        });

        return response.data;
    }
}

export default QuestionService;
