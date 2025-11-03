import { apiRequest } from "@/libs/apiClient";
import type { ServerSideResponse } from "@/types/Global";
import type { UserEditRequest } from "@/types/User/Requests";
import type { GetUsersResponse } from "@/types/User/Responses";
import type { GenericUserInfo, User, UserRole } from "@/types/User";

class UserService {
    static async getUserInfoSSR(): Promise<User> {
        const response = await apiRequest<User>(`/User`, {
            method: "GET",
        });

        return response.data;
    }

    static async GetUsers(
        page: number,
        pageSize: number,
        search: string,
        abortSignal: AbortSignal,
        role: UserRole
    ): Promise<ServerSideResponse<GetUsersResponse>> {
        const response = await apiRequest<ServerSideResponse<GetUsersResponse>>(
            `/api/user`,
            {
                method: "GET",
                params: {
                    page,
                    pageSize,
                    search,
                    role,
                },
                signal: abortSignal,
            }
        );

        return response.data;
    }

    static async GetTeacherUsers(
        page: number,
        pageSize: number,
        search: string,
        abortSignal: AbortSignal
    ): Promise<GetUsersResponse> {
        const response = await apiRequest<GetUsersResponse>(`/api/user`, {
            method: "GET",
            params: {
                page,
                pageSize,
                search,
                role: "Teacher",
            },
            signal: abortSignal,
        });

        return response.data;
    }

    static async updateUser(userId: string, request: UserEditRequest) {
        const response = await apiRequest<ServerSideResponse<GenericUserInfo>>(
            `/api/user/${userId}`,
            {
                method: "PUT",
                data: request,
            }
        );

        return response.data;
    }

    static async deleteUser(userId: string) {
        const response = await apiRequest<void>(`/api/user/${userId}`, {
            method: "DELETE",
        });

        return response.data;
    }
}

export default UserService;
