import { apiRequest } from "@/libs/apiClient";
import type { ServerSideResponse } from "@/types/Global";
import type { UserEditRequest } from "@/types/User/Requests";
import type { GetUsersResponse } from "@/types/User/Responses";
import type { GenericUserInfo } from "@/types/User";

class UserService {
    public async GetUsers(page: number, pageSize: number, search?: string) {
        const response = await apiRequest<ServerSideResponse<GetUsersResponse>>(
            "/api/user",
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

    public async GetUserById(id: string) {
        const response = await apiRequest<ServerSideResponse<GenericUserInfo>>(
            `/api/user/${id}`,
            {
                method: "GET",
            }
        );
        return response.data;
    }

    public async UpdateUser(id: string, request: UserEditRequest) {
        const response = await apiRequest<ServerSideResponse<GenericUserInfo>>(
            `/api/user/${id}`,
            {
                method: "PUT",
                data: request,
            }
        );
        return response.data;
    }

    public async DeleteUser(id: string) {
        const response = await apiRequest<ServerSideResponse<void>>(
            `/api/user/${id}`,
            {
                method: "DELETE",
            }
        );
        return response.data;
    }
}

export default UserService;
