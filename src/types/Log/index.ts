/**
 * Represents the type of action performed by a user in the system.
 */
export type ActionType =
    | "Login"
    | "Logout"
    | "SubmitExercise"
    | "CreateQuestion"
    | "AnswerQuestion"
    | "ViewRanking"
    | "Other";

/**
 * Represents a log entry in the system tracking user actions.
 */
export interface Log {
    /**
     * The unique identifier of the log entry.
     */
    id: number;

    /**
     * The type of action that was performed.
     */
    actionType: ActionType;

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
 * Represents team activity information for monitoring purposes.
 */
export interface TeamActivity {
    /**
     * The name of the team.
     */
    teamName: string;

    /**
     * The IP address used by the team.
     */
    ip: string;

    /**
     * The timestamp of the last login (ISO date string).
     */
    lastLogin: string;

    /**
     * The timestamp of the last logout (ISO date string).
     */
    lastLogout: string;

    /**
     * Comma-separated list of team member names.
     */
    members: string;

    /**
     * The timestamp of the last action performed (ISO date string).
     */
    lastActionTime: string;

    /**
     * Description of the last action performed.
     */
    lastAction: string;
}
