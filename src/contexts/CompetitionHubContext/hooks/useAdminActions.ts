import { useCompetitionHub } from "@/contexts/CompetitionHubContext";

/**
 * Hook for admin/teacher actions.
 * Only authorized users should use these actions.
 */
export const useAdminActions = () => {
    const {
        changeJudgeResponse,
        blockGroupSubmission,
        unblockGroupSubmission,
    } = useCompetitionHub();

    return {
        /**
         * Manually change a submission's judge response.
         * Admin/Teacher only.
         */
        changeJudgeResponse,

        /**
         * Block a group from making submissions.
         * Admin/Teacher only.
         */
        blockGroupSubmission,

        /**
         * Unblock a previously blocked group.
         * Admin/Teacher only.
         */
        unblockGroupSubmission,
    };
};
