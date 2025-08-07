
import { apiRequest } from "@/libs/apiClient";
import { User } from "@/types/User";




class UserService {
    static async getUserInfoSSR(): Promise<User> {
        const response = await apiRequest<User>(`/User`, {
            method: "GET",
        });

        return response.data;
    }

    
}


export default UserService;