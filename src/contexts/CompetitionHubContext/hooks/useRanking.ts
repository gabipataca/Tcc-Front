import { useMemo } from "react";
import { useCompetitionHub } from "@/contexts/CompetitionHubContext";
import { JudgeResponseEnum } from "@/types/Exercise";

/**
 * Hook for managing competition ranking.
 * Uses real-time ranking updates from server via ReceiveRankingUpdate event.
 */
export const useRanking = () => {
    const { ranking, submissions } = useCompetitionHub();

    /**
     * Get current ranking sorted by position.
     */
    const liveRanking = useMemo(() => {
        return [...ranking].sort((a, b) => a.rankOrder - b.rankOrder);
    }, [ranking]);

    /**
     * Get ranking position for a specific group.
     */
    const getGroupRank = useMemo(() => {
        return (groupId: number) =>
            liveRanking.find((r) => r.group.id === groupId);
    }, [liveRanking]);

    /**
     * Get top N groups.
     */
    const getTopGroups = useMemo(() => {
        return (count: number) => liveRanking.slice(0, count);
    }, [liveRanking]);

    /**
     * Check if a group has solved a specific exercise.
     */
    const hasGroupSolvedExercise = useMemo(() => {
        return (groupId: number, exerciseId: number) => {
            return submissions.some(
                (s) =>
                    s.groupId === groupId &&
                    s.exerciseId === exerciseId &&
                    s.judgeResponse === JudgeResponseEnum.Accepted
            );
        };
    }, [submissions]);

    /**
     * Get total attempts for a group on a specific exercise.
     */
    const getExerciseAttempts = useMemo(() => {
        return (groupId: number, exerciseId: number) => {
            const groupRanking = getGroupRank(groupId);
            if (!groupRanking) return 0;
            
            const attempt = groupRanking.exerciseAttempts.find(
                (a) => a.exerciseId === exerciseId
            );
            return attempt?.attempts || 0;
        };
    }, [getGroupRank]);

    return {
        liveRanking,
        getGroupRank,
        getTopGroups,
        hasGroupSolvedExercise,
        getExerciseAttempts,
    };
};
