

export interface Competition {
    /**
     * Unique identifier for the competition.
     */
    id: number;

    /**
     * Date when the competition starts.
     */
    startTime: Date;

    /**
     * Date when the competition ends.
     */
    endTime: Date;

    /**
     * Duration of the competition in seconds.
     */
    duration: number;

    /**
     * Date when the competition's ranking stops being updated.
     * @remarks This is the last moment when the ranking can change.
     */
    stopRanking: Date;

    /**
     * Date when the competition's submissions are blocked.
     * @remarks After this date, no new submissions will be accepted.
     */
    blockSubmissions: Date;

    /**
     * Penalty applied to the competition submissions.
     * @remarks This penalty is only applued if the submission is not accepted.
     */
    submissionPenalty: number;

    /**
     * Maximum number of exercises allowed in the competition.
     */
    maxExercises: number;

    /**
     * Maximum size of submissions in kb.
     */
    maxSubmissionSize: number;

    /**
     * Date when inscriptions for the competition start.
     */
    startInscriptions: Date;

    /**
     * Date when inscriptions for the competition end.
     */
    endInscriptions: Date;
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