/**
 * Represents the payload required to register a new user.
 */
export interface RegisterUserRequest {

    /**
     * The user's display name.
     */
    name: string;

    /**
     * The user's registration or identification number.
     */
    ra: string;

    /**
     * The user's email address.
     */
    email: string;

    /**
     * The year the user joined, as a number.
     */
    joinYear: number | null;

    /**
     * The user's chosen password.
     */
    password: string;

    /**
     * The user's role, either "student" or "teacher".
     */
    role: "Student" | "Teacher";

    /**
     * The code required to access or register for the system.
     * @remarks Only required for teacher registration.
     */
    accessCode?: string;
}

/**
 * Represents the payload required to authenticate a user.
 */
export interface LoginUserRequest {
    /**
     * The user's unique RA (Registro Acadêmico).
     */
    ra: string;

    /**
     * The user's password.
     */
    password: string;
}

/**
 * Represents the request payload for recovering a user's password.
 */
export interface RecoverPasswordRequest {
    /**
     * The email address associated with the user's account.
     */
    email: string;
}