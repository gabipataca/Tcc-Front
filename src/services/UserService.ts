
import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import { User } from "@/types/User";
import { GetUsersResponse } from "@/types/User/Responses";




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
            abortSignal: AbortSignal
        ): Promise<ServerSideResponse<GetUsersResponse>> {
            const response = await apiRequest<
                ServerSideResponse<GetUsersResponse>
            >(`/api/user`, {
                method: "GET",
                params: {
                    page,
                    pageSize,
                    search,
                },
                signal: abortSignal,
            });
    
            return response.data;
        }

    
}


export default UserService;