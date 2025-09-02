import { Group } from "@/types/Group";

export interface GroupInfo extends Group {
    isLeader: boolean;
}

export interface CompetitionHistory {
    year: number;
    groupName: string;
    questions: string;
}

export interface ChampionTeam {
    year: number;
    teamName: string;
}
