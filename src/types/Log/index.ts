export type ActionType =
    | "Login"
    | "Logout"
    | "SubmitExercise"
    | "CreateQuestion"
    | "AnswerQuestion"
    | "ViewRanking"
    | "Other";

export interface Log {
    id: number;
    actionType: ActionType;
    actionTime: string;
    ipAddress: string;
    userId: string;
    groupId?: number;
    competitionId?: number;
}

export interface TeamActivity {
    teamName: string;
    ip: string;
    lastLogin: string;
    lastLogout: string;
    members: string;
    lastActionTime: string;
    lastAction: string;
}
