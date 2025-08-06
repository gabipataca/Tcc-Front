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