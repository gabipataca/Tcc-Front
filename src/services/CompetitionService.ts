import { apiRequest } from "@/libs/apiClient";
import { Competition } from "@/types/Competition";
import {
    CreateCompetitionRequest,
    UpdateCompetitionRequest,
} from "@/types/Competition/Requests";
import {
    CompetitionResponse,
} from "@/types/Competition/Responses";
import { ServerSideResponse } from "@/types/Global";

class CompetitionService {
    static async getExistentCompetition() {
        const response = await apiRequest<ServerSideResponse<CompetitionResponse>>(
            "/api/competition",
            {
                method: "GET",
            }
        );

        return response.data;
    }

    static async getCompetitionTemplates() {
        const response = await apiRequest<ServerSideResponse<Competition[]>>(
            "/api/competition/template",
            {
                method: "GET",
            }
        );

        return response.data;
    }

    static async getCompetitionsOpenForInscription() {
        const response = await apiRequest<ServerSideResponse<Competition[]>>(
            "/api/competition/open",
            {
                method: "GET",
            }
        );

        return response.data;
    }

    static async createCompetition(data: CreateCompetitionRequest) {
        const response = await apiRequest<
            ServerSideResponse<CompetitionResponse>,
            CreateCompetitionRequest
        >("/api/competition", {
            method: "POST",
            data: data,
        });

        return response.data;
    }

    static async updateCompetition(data: UpdateCompetitionRequest) {
        const response = await apiRequest<
            ServerSideResponse<CompetitionResponse>,
            UpdateCompetitionRequest
        >(`/api/competition/${data.id}`, {
            method: "PUT",
            data: data,
        });

        return response.data;
    }
}

export default CompetitionService;
