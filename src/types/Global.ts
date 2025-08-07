/**
 * Represents an error related to a specific form field.
 */
export interface FormError {
    /**
     * The name or identifier of the form field where the error occurred.
     */
    target: string;

    /**
     * The error message associated with the form field.
     */
    message: string;
}


/**
 * Represents a generic server-side response structure.
 *
 * @template T - The type of the data returned in the response.
 */
export interface ServerSideResponse<T> {
    /**
     * The HTTP status code of the response.
     */
    status: number;

    /**
     * Optional message providing additional information about the response.
     */
    message?: string;

    /**
     * The error message, if any, associated with the response.
     */
    error?: string;

    /**
     * Optional data payload returned by the server.
     */
    data?: T;
}