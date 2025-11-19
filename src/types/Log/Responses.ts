import type { PagedResult } from "../Global";

/**
 * Represents a log entry in the response.
 */
export interface LogResponse {
    /**
     * The unique identifier of the log entry.
     */
    id: number;

    /**
     * The type of action that was logged.
     */
    actionType: string;

    /**
     * The timestamp when the action occurred (ISO date string).
     */
    actionTime: string;

    /**
     * The IP address from which the action was performed.
     */
    ipAddress: string;

    /**
     * The RA (academic registration number) of the user who performed the action.
     */
    userId: string;

    /**
     * The ID of the group associated with the action.
     * @remarks Optional - only present for group-related actions.
     */
    groupId?: number;

    /**
     * The ID of the competition associated with the action.
     * @remarks Optional - only present for competition-related actions.
     */
    competitionId?: number;
}

/**
 * Represents a paginated response containing log entries.
 */
export type GetLogsResponse = PagedResult<LogResponse>;
