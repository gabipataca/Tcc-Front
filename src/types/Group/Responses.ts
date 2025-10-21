import { PagedResult } from "../Global";
import { GenericUserInfo, User } from "../User";



export interface CreateGroupResponse {
    id: number;
    name: string;
}
/**
 * Represents the response for creating a group.
 */
export interface CreateGroupResponse {
    /** The unique identifier of the group. */
    id: number;
    /** The name of the group. */
    name: string;

    leaderId: string;

    users: GenericUserInfo[];
}

export interface GroupResponse {
    id: number;
    name: string;
    leaderId: string;
    users: GenericUserInfo[];
}
/**
 * Represents the response for a group.
 */
export interface GroupResponse {
    /** The unique identifier of the group. */
    id: number;
    /** The name of the group. */
    name: string;
    /** The ID of the group leader. */
    leaderId: number;
    /** The list of users in the group. */
    users: GenericUserInfo[];
}

export interface UpdateGroupResponse {
    name: string;
    userIds: string[];
}
/**
 * Represents the response for updating a group.
 */
export interface UpdateGroupResponse {
    /** The new name of the group. */
    name: string;
    /** The list of user IDs in the group. */
    userIds: string[];
}

/**
 * Represents the response for getting groups.
 */
export type GetGroupsResponse = PagedResult<GroupResponse>


export interface InviteUserToGroupResponse {
    id: number;
    accepted: boolean;
    groupId: number;
    userId: string;
    group: GroupResponse;
}
/**
 * Represents the response for inviting a user to a group.
 */
export interface InviteUserToGroupResponse {
    /** The unique identifier of the invitation. */
    id: number;
    /** Indicates if the invitation was accepted. */
    accepted: boolean;
    /** The ID of the group. */
    groupId: number;
    /** The ID of the user invited. */
    userId: string;
    /** The group information. */
    group: GroupResponse;
}

export interface AcceptGroupInvitationResponse {
    id: number;
    accepted: boolean;
    groupId: number;
    userId: string;
    group: GroupResponse;
}
/**
 * Represents the response for accepting a group invitation.
 */
export interface AcceptGroupInvitationResponse {
    /** The unique identifier of the invitation. */
    id: number;
    /** Indicates if the invitation was accepted. */
    accepted: boolean;
    /** The ID of the group. */
    groupId: number;
    /** The ID of the user who accepted. */
    userId: string;
    /** The group information. */
    group: GroupResponse;
}