export interface CreateGroupRequest {
    /**
     * The name of the group to be created.
     */
    name: string;
}
/**
 * Represents the request to create a new group.
 */
export interface CreateGroupRequest {
    /** The name of the group to be created. */
    name: string;
}


export interface UpdateGroupRequest {
    name: string;
    userIds: string[];
}
/**
 * Represents the request to update a group.
 */
export interface UpdateGroupRequest {
    /** The new name of the group. */
    name: string;
    /** The list of user IDs to be included in the group. */
    userIds: string[];
}

export interface InviteUserToGroupRequest {
    userId: string;
    groupId: number;
}
/**
 * Represents the request to invite a user to a group.
 */
export interface InviteUserToGroupRequest {
    /** The ID of the user to invite. */
    userId: string;
    /** The ID of the group to which the user is invited. */
    groupId: number;
}