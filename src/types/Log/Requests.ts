import type { ActionType } from ".";

export interface CreateLogRequest {
    actionType: ActionType;
    ipAddress: string;
    userId: string;
    groupId?: number;
    competitionId?: number;
}
