import { RegisterUserResponse, ValidateTokenResponse } from "@/types/Auth/Responses";
import { apiRequest } from "@/libs/apiClient";
import { RegisterUserRequest } from "@/types/Auth/Requests";


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
  static async registerUser(
    payload: RegisterUserRequest
  ) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if(response.status === 201) {
      const data = await response.json() as RegisterUserResponse;

      return data;
    }
  }
}

export default AuthService;