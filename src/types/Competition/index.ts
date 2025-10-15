

/**
 * Status of the competition.
 * @remarks
 * - 0 - Pending
 * - 1 - Open for inscriptions
 * - 2 - Closed for inscriptions
 * - 3 - Ongoing
 * - 4 - Finished
 * - 5 - Template Created
 */
export type CompetitionStatus = 0 | 1 | 2 | 3 | 4 | 5;
export interface Competition {
    /**
     * Unique identifier for the competition.
     */
    id: number;

    /**
     * Name of the competition.
     */
    name: string;

    /**
     * Description of the competition.
     */
    description: string;

    /**
     * Date when the competition starts.
     */
    startTime: Date;

    /**
     * Date when the competition ends.
     */
    endTime: Date | null;

    /**
     * Duration of the competition in seconds.
     */
    duration: number | null;

    /**
     * Date when the competition's ranking stops being updated.
     * @remarks This is the last moment when the ranking can change.
     */
    stopRanking: Date | null;

    /**
     * Date when the competition's submissions are blocked.
     * @remarks After this date, no new submissions will be accepted.
     */
    blockSubmissions: Date | null;

    /**
     * Penalty applied to the competition submissions.
     * @remarks This penalty is only applued if the submission is not accepted.
     */
    submissionPenalty: number;

    /**
     * Maximum number of exercises allowed in the competition.
     */
    maxExercises: number | null;

    /**
     * Maximum size of submissions in kb.
     */
    maxSubmissionSize: number;

    /**
     * Date when inscriptions for the competition start.
     */
    startInscriptions: Date | null;

    /**
     * Date when inscriptions for the competition end.
     */
    endInscriptions: Date | null;

    /**
     * Current status of the competition.
     */
    status: CompetitionStatus;
}

/**
 * Represents the ranking information for a group in a competition.
 */
export interface CompetitionRanking {
    /**
     * Unique identifier for the ranking entry.
     */
    id: number;

    /**
     * Identifier of the competition to which this ranking belongs.
     */
    competitionId: number;

    /**
     * Identifier of the group being ranked.
     */
    groupId: number;

    /**
     * Total points earned by the group in the competition.
     */
    points: number;

    /**
     * Total penalty points applied to the group.
     */
    penalty: number;

    /**
     * The order or position of the group in the ranking.
     */
    rankOrder: number;
}