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

export interface GroupInvitation {
    id: number;
    groupId: number;
    userId: string;
    group: Group;
}

/**
 * Represents a request to edit a group.
 */
export interface GroupEditRequest {
    /**
     * Unique identifier for the group to edit.
     */
    id: number;

    /**
     * New name for the group (optional).
     */
    name?: string;

    /**
     * New leader ID for the group (optional).
     */
    leaderId?: string;

    /**
     * Updated list of users in the group (optional).
     */
    users?: User[];
}
