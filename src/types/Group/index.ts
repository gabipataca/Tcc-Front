import { User } from "../User";

/**
 * Represents a group in the system.
 */
export interface Group {
    /**
     * Unique identifier for the group.
     */
    id: number;

    /**
     * Name of the group.
     */
    name: string;

    /**
     * Identifier of the group's leader (user ID).
     */
    leaderId: string;

    users: User[];
}
