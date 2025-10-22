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
    
    /**
     * The list of user RAs (academic registration numbers) to be included in the group.
     */
    userRAs: string[];
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

/**
 * Represents the request to invite a user to a group.
 */
export interface InviteUserToGroupRequest {
    /** The RA of the user to invite. */
    ra: string;
    /** The ID of the group to which the user is invited. */
    groupId: number;
}