import { apiRequest } from "@/libs/apiClient";
import { Competition } from "@/types/Competition";
import {
    CreateCompetitionRequest,
    UpdateCompetitionRequest,
} from "@/types/Competition/Requests";
import {
    CreateCompetitionResponse,
    UpdateCompetitionResponse,
} from "@/types/Competition/Responses";
import { ServerSideResponse } from "@/types/Global";

class CompetitionService {
    static async getExistentCompetition() {
        const response = await apiRequest<ServerSideResponse<Competition>>(
            "/api/competition",
            {
                method: "GET",
            }
        );

        return response.data;
    }

    static async createCompetition(data: CreateCompetitionRequest) {
        const response = await apiRequest<
            ServerSideResponse<CreateCompetitionResponse>,
            CreateCompetitionRequest
        >("/api/competition", {
            method: "POST",
            data: data,
        });

        return response.data;
    }

    static async updateCompetition(data: UpdateCompetitionRequest) {
        const response = await apiRequest<
            ServerSideResponse<UpdateCompetitionResponse>,
            UpdateCompetitionRequest
        >("/api/competition", {
            method: "PUT",
            data: data,
        });

        return response.data;
    }
}

export default CompetitionService;
