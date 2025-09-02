/**
 * Represents a user in the system.
 */
export interface User {
    /**
     * Unique identifier for the user.
     */
    id: string;

    /**
     * The user's RA (academic registration number).
     */
    ra: string;

    /**
     * The name chosen by the user.
     */
    name: string;

    /**
     * The year the user joined the system.
     */
    joinYear: number;

    /**
     * The user's email address.
     */
    email: string;

    /**
     * The group ID associated with the user.
     */
    groupId?: number;

    /**
     * The authentication token associated with the user.
     */
    token: string;

    /**
     * The role assigned to the user (Admin, Teacher, or Student).
     */
    role: "Admin" | "Teacher" | "Student";
}
