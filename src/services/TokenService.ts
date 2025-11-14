import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { GetCurrentTokenResponse, UpdateCurrentTokenResponse } from "@/types/Token/Responses";

class TokenService {
    public static async getCurrentToken(): Promise<
        ServerSideResponse<GetCurrentTokenResponse>
    > {
        const res = await apiRequest<
            ServerSideResponse<GetCurrentTokenResponse>
        >("/api/token", {
            method: "GET",
        });

        return res.data;
    }

    public static async updateCurrentToken(): Promise<
        ServerSideResponse<UpdateCurrentTokenResponse>
    > {
        const res = await apiRequest<
            ServerSideResponse<UpdateCurrentTokenResponse>
        >("/api/token", {
            method: "PUT",
        });
        return res.data;
    }
}

export default TokenService;
