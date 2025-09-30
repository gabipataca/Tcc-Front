


/**
 * Represents the request body for creating a competition.
 */
export interface CreateCompetitionRequest {
    /** The name of the competition. */
    name: string;
    /** The start time of the competition (ISO string). */
    startTime: string;
    /** The duration of the competition (as a string, e.g., "02:00:00"). */
    duration: string;
    /** The start date/time for inscriptions (ISO string). */
    startInscriptions: string | null;
    /** The end date/time for inscriptions (ISO string). */
    endInscriptions: string | null;
    /** The date/time when the ranking will be stopped (ISO string). */
    stopRanking: string;
    /** Optional. The date/time when submissions will be blocked (ISO string). */
    blockSubmissions?: string;
    /** The penalty time for submissions, represented as a string (e.g., "00:30:00"). */
    submissionPenalty: string;
    /** The maximum number of exercises allowed in the competition. */
    maxExercises: number;
    /** The maximum allowed submission size (in bytes). */
    maxSubmissionSize: number;
    /** The list of exercise IDs included in the competition. */
    exerciseIds: number[];
}

/**
 * Represents the request body for updating a competition.
 * Inherits all properties from CreateCompetitionRequest except 'exerciseIds', and adds the competition ID.
 */
export interface UpdateCompetitionRequest extends Omit<CreateCompetitionRequest, 'exerciseIds'> {
    /**
     * The unique identifier of the competition to update.
     */
    id: number;
}