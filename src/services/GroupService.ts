import { apiRequest } from "@/libs/apiClient";
import { ServerSideResponse } from "@/types/Global";
import {
    CreateGroupRequest,
    InviteUserToGroupRequest,
} from "@/types/Group/Requests";
import {
    AcceptGroupInvitationResponse,
    CreateGroupResponse,
    GetGroupsResponse,
    InviteUserToGroupResponse,
    UpdateGroupResponse,
} from "@/types/Group/Responses";
import { UpdateGroupRequest } from "../types/Group/Requests";

class GroupService {
    static async CreateGroup(
        groupName: string,
        abortSignal: AbortSignal
    ): Promise<ServerSideResponse<CreateGroupResponse>> {
        const response = await apiRequest<
            ServerSideResponse<CreateGroupResponse>,
            CreateGroupRequest
        >(`/api/group`, {
            method: "POST",
            data: {
                name: groupName,
            },
            signal: abortSignal,
        });

        return response.data;
    }

    static async UpdateGroup(
        groupId: number,
        payload: UpdateGroupRequest
    ): Promise<ServerSideResponse<UpdateGroupResponse>> {
        const response = await apiRequest<
            ServerSideResponse<UpdateGroupResponse>,
            UpdateGroupRequest
        >(`/api/group/${groupId}`, {
            method: "PUT",
            data: payload,
        });

        return response.data;
    }

    static async GetGroups(
        page: number,
        pageSize: number,
        search: string,
        abortSignal: AbortSignal
    ): Promise<ServerSideResponse<GetGroupsResponse>> {
        const response = await apiRequest<
            ServerSideResponse<GetGroupsResponse>
        >(`/api/group`, {
            method: "GET",
            params: {
                page,
                pageSize,
                search,
            },
            signal: abortSignal,
        });

        return response.data;
    }

    static async SendGroupInvitationToUser(
        request: InviteUserToGroupRequest
    ): Promise<ServerSideResponse<InviteUserToGroupResponse>> {
        const response = await apiRequest<
            ServerSideResponse<InviteUserToGroupResponse>,
            InviteUserToGroupRequest
        >(`/api/group/invite`, {
            method: "POST",
            data: request,
        });

        return response.data;
    }

    static async AcceptGroupInvitation(groupId: number) {
        const response = await apiRequest<
            ServerSideResponse<AcceptGroupInvitationResponse>
        >(`/api/group/accept/${groupId}`, {
            method: "POST",
        });

        return response.data;
    }
}

export default GroupService;
