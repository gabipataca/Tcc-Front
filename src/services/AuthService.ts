import {
    LoginUserResponse,
    RegisterUserResponse,
    ValidateTokenResponse,
} from "@/types/Auth/Responses";
import { apiRequest } from "@/libs/apiClient";
import { LoginUserRequest, RegisterUserRequest } from "@/types/Auth/Requests";
import { ServerSideResponse } from "@/types/Global";

class AuthService {
    /**
     * Validate the authentication token in the context of SSR (Server-Side Rendering).
     *
     * @param cookies - string containing cookies sent in the request.
     * @returns A boolean value indicating if the token is valid.
     */
    static async validateTokenSSR(cookies: string): Promise<boolean> {
        const req = await apiRequest<ValidateTokenResponse>("/Auth/validate", {
            method: "GET",
            cookies,
        });

        return req.data.valid;
    }

    /**
     * Perform the registration of a new user.
     *
     * @param payload - Object containing the data required for the user registration.
     * @returns The object of response of the user registration if the registration is successful.
     */
    static async registerUser(payload: RegisterUserRequest) {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            next: { revalidate: false },
        });

        const data =
            (await response.json()) as ServerSideResponse<RegisterUserResponse>;
        return data;
    }

    static async loginUser(payload: LoginUserRequest) {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            next: { revalidate: false },
        });
        const data =
            (await response.json()) as ServerSideResponse<LoginUserResponse>;

        return data;
    }
}

export default AuthService;
