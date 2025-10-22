import { GenericUserInfo, User } from "../User";
import { GroupResponse } from "./Responses";

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

    users: GenericUserInfo[];

    groupInvitations?: GroupInvitation[];
}

export interface GroupInvitation {
    id: number;
    userId: string;
    /**
     * The group associated with the invitation.
     * Can be null in certain contexts.
     */
    group: GroupResponse | null;
    user: GenericUserInfo;
    accepted: boolean;
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
