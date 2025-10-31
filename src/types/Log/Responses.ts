import type { PagedResult } from "../Global";

export interface LogResponse {
    id: number;
    actionType: string;
    actionTime: string;
    ipAddress: string;
    userId: string;
    groupId?: number;
    competitionId?: number;
}

export type GetLogsResponse = PagedResult<LogResponse>;
