/** @file Auth/Responses.ts
 * This file contains TypeScript interfaces that define the structure of responses related to user authentication.
 * It includes responses for validating tokens, renewing tokens, registering users, and logging in users.
 */


import { User } from "../User";
import { FormError } from "../Global";


/**
 * Represents the response returned after validating a user authentication token.
 */
export interface ValidateTokenResponse {
    /**
     * Indicates whether the provided token is valid.
     */
    valid: boolean;

    /**
     * The authentication token that was validated.
     */
    token: string;
}

/**
 * Represents the response returned after attempting to renew an authentication token.
 */
export interface RenewTokenResponse {
    /**
     * Indicates whether the renewed token is valid.
     */
    valid: boolean;

    /**
     * The renewed authentication token.
     */
    token: string;
}


/**
 * Represents the response returned after a user registration attempt.
 */
export interface RegisterUserResponse {
    /**
     * The registered user information.
     */
    user: User;

    /**
     * The authentication token generated for the registered user.
     */
    token: string;

    /**
     * Optional array of form errors encountered during registration.
     */
    errors?: FormError[];
}

/**
 * Represents the response returned after a user login attempt.
 */
export interface LoginUserResponse {
    /**
     * The authenticated user information.
     */
    user: User;

    /**
     * The authentication token generated for the logged-in user.
     */
    token: string;

    /**
     * Optional array of form errors encountered during login.
     */
    errors?: FormError[];
}

export interface LogoutUserResponse {
    
}