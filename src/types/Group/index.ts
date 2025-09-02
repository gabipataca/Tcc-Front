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

    users: User[];
}
