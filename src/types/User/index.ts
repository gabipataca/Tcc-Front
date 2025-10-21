import { Group } from "../Group";

export type UserRole = "Admin" | "Teacher" | "Student";


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
     * The department the user belongs to.
     */
    department: string | null;

    /**
     * The group ID associated with the user.
     */
    groupId?: number;

    /**
     * The group object associated with the user.
     */
    group?: Group | null;

    /**
     * The authentication token associated with the user.
     */
    token: string;

    /**
     * The role assigned to the user (Admin, Teacher, or Student).
     */
    role: UserRole;
}


export interface GenericUserInfo {
    id: string;
    ra: string;
    email: string;
    department: string | null;
    name: string;
    joinYear: number;
    createdAt: string;
    lastLoggedAt: string;
    group: Group | null;
}