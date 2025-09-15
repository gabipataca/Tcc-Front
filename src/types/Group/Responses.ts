import { PagedResult } from "../Global";
import { GenericUserInfo, User } from "../User";



export interface CreateGroupResponse {
    id: number;
    name: string;
}

export interface GroupResponse {
    id: number;
    name: string;
    leaderId: number;
    users: GenericUserInfo[];
}

export interface UpdateGroupResponse {
    name: string;
    userIds: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetGroupsResponse extends PagedResult<GroupResponse> {

}