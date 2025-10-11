import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { GetQuestionsResponse } from "@/types/Question/Responses";




class QuestionService {
    public async GetQuestions(page: number, pageSize: number) {
        const response = await apiRequest<ServerSideResponse<GetQuestionsResponse>>("/api/question", {
            method: "GET",
            params: {
                page,
                pageSize
            }
        });

        return response.data;
    }


}


export default QuestionService;