export interface CreateGroupRequest {
    /**
     * The name of the group to be created.
     */
    name: string;
}


export interface UpdateGroupRequest {
    name: string;
    userIds: string[];
}