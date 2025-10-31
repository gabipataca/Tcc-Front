import { apiRequest } from "@/libs/apiClient";
import type { ServerSideResponse } from "@/types/Global";
import type { CreateLogRequest } from "@/types/Log/Requests";
import type { GetLogsResponse, LogResponse } from "@/types/Log/Responses";

class LogService {
    public async GetLogs(page: number, pageSize: number, search?: string) {
        const response = await apiRequest<ServerSideResponse<GetLogsResponse>>(
            "/api/log",
            {
                method: "GET",
                params: {
                    page,
                    pageSize,
                    search,
                },
            }
        );
        return response.data;
    }

    public async GetLogsByCompetition(
        competitionId: number,
        page: number,
        pageSize: number,
        search?: string
    ) {
        const response = await apiRequest<ServerSideResponse<GetLogsResponse>>(
            `/api/log/competition/${competitionId}`,
            {
                method: "GET",
                params: {
                    page,
                    pageSize,
                    search,
                },
            }
        );
        return response.data;
    }

    public async GetLogsByUser(
        userId: string,
        page: number,
        pageSize: number,
        search?: string
    ) {
        const response = await apiRequest<ServerSideResponse<GetLogsResponse>>(
            `/api/log/user/${userId}`,
            {
                method: "GET",
                params: {
                    page,
                    pageSize,
                    search,
                },
            }
        );
        return response.data;
    }

    public async GetLogsByGroup(
        groupId: number,
        page: number,
        pageSize: number,
        search?: string
    ) {
        const response = await apiRequest<ServerSideResponse<GetLogsResponse>>(
            `/api/log/group/${groupId}`,
            {
                method: "GET",
                params: {
                    page,
                    pageSize,
                    search,
                },
            }
        );
        return response.data;
    }

    public async CreateLog(request: CreateLogRequest) {
        const response = await apiRequest<ServerSideResponse<LogResponse>>(
            "/api/log",
            {
                method: "POST",
                data: request,
            }
        );
        return response.data;
    }

    public async GetLogById(id: number) {
        const response = await apiRequest<ServerSideResponse<LogResponse>>(
            `/api/log/${id}`,
            {
                method: "GET",
            }
        );
        return response.data;
    }
}

export default LogService;
