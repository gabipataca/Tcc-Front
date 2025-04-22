import { FormError } from "./Form";
import { User } from "./User";

export interface RegisterUserRequest {
    username: string;
    ra: string;
    email: string;
    joinYear: string;
    password: string;
    role: "student" | "teacher";
    accessCode: string;
}

export interface RegisterUserResponse {
    user: User;
    token: string;
    errors?: FormError[];
}


export interface LoginUserRequest {
    ra: string;
    password: string;
}

export interface LoginUserResponse {
    user: User;
    token: string;
    errors?: FormError[];
}