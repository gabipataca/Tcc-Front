import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { ChampionTeam, CompetitionHistory, GroupInfo } from "../types";
import { User } from "@/types/User";

export const useStudentDashboardData = () => {
    const { user } = useUser();

    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
    const [competitionHistory, setCompetitionHistory] = useState<
        CompetitionHistory[]
    >([]);
    const [championTeams, setChampionTeams] = useState<ChampionTeam[]>([]);

    return {
        groupInfo,
        competitionHistory,
        championTeams,
    };
};
