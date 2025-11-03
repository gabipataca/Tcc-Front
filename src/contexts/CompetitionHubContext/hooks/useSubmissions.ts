import { useMemo } from "react";
import { useCompetitionHub } from "@/contexts/CompetitionHubContext";
import { JudgeResponseEnum } from "@/types/Exercise";

/**
 * Hook for managing exercise submissions.
 * Provides filtered and sorted submission data.
 */
export const useSubmissions = () => {
    const { submissions, sendExerciseAttempt } = useCompetitionHub();

    /**
     * Get submissions filtered by group ID.
     */
    const getSubmissionsByGroup = useMemo(() => {
        return (groupId: number) =>
            submissions.filter((s) => s.groupId === groupId);
    }, [submissions]);

    /**
     * Get submissions filtered by exercise ID.
     */
    const getSubmissionsByExercise = useMemo(() => {
        return (exerciseId: number) =>
            submissions.filter((s) => s.exerciseId === exerciseId);
    }, [submissions]);

    /**
     * Get all accepted submissions.
     */
    const acceptedSubmissions = useMemo(() => {
        return submissions.filter((s) => s.judgeResponse === JudgeResponseEnum.Accepted);
    }, [submissions]);

    /**
     * Get all rejected submissions.
     */
    const rejectedSubmissions = useMemo(() => {
        return submissions.filter((s) => s.judgeResponse !== JudgeResponseEnum.Accepted);
    }, [submissions]);

    /**
     * Get submissions by judge response type.
     */
    const getSubmissionsByJudgeResponse = useMemo(() => {
        return (judgeResponse: JudgeResponseEnum) =>
            submissions.filter((s) => s.judgeResponse === judgeResponse);
    }, [submissions]);

    /**
     * Get latest submission for a specific group and exercise.
     */
    const getLatestSubmission = useMemo(() => {
        return (groupId: number, exerciseId: number) => {
            const filtered = submissions.filter(
                (s) => s.groupId === groupId && s.exerciseId === exerciseId
            );
            return filtered.sort(
                (a, b) =>
                    new Date(b.submittedAt).getTime() -
                    new Date(a.submittedAt).getTime()
            )[0];
        };
    }, [submissions]);

    /**
     * Get submission statistics for a group.
     */
    const getGroupStats = useMemo(() => {
        return (groupId: number) => {
            const groupSubmissions = submissions.filter(
                (s) => s.groupId === groupId
            );
            return {
                total: groupSubmissions.length,
                accepted: groupSubmissions.filter((s) => s.judgeResponse === JudgeResponseEnum.Accepted).length,
                rejected: groupSubmissions.filter((s) => s.judgeResponse !== JudgeResponseEnum.Accepted).length,
                totalPenalty: groupSubmissions.reduce(
                    (sum, s) => sum + s.penalty,
                    0
                ),
                totalPoints: groupSubmissions.reduce(
                    (sum, s) => sum + s.points,
                    0
                ),
            };
        };
    }, [submissions]);

    return {
        submissions,
        sendExerciseAttempt,
        getSubmissionsByGroup,
        getSubmissionsByExercise,
        acceptedSubmissions,
        rejectedSubmissions,
        getSubmissionsByJudgeResponse,
        getLatestSubmission,
        getGroupStats,
    };
};
