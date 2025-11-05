import { Competition } from "../Competition";
import { Group } from "../Group";
import { JudgeResponseEnum } from "../Exercise";

/**
 * Response received when connecting to the SignalR hub.
 * Contains the current ongoing competition data or null if no competition is active.
 */
export type OnConnectionResponse = Competition | null;

/**
 * Response for exercise submission after judge processing.
 */
export interface ExerciseSubmissionResponse {
    /**
     * Unique identifier for the submission.
     */
    id: number;

    /**
     * Identifier of the group that submitted.
     */
    groupId: number;

    /**
     * Identifier of the exercise.
     */
    exerciseId: number;

    /**
     * The source code submitted.
     */
    code: string;

    /**
     * The programming language ID used.
     */
    languageId: number;

    /**
     * Timestamp when submitted (ISO 8601).
     */
    submittedAt: string;

    /**
     * The judge's verdict.
     */
    judgeResponse: JudgeResponseEnum;

    /**
     * Execution time in milliseconds.
     */
    executionTime: number;

    /**
     * Memory used in KB.
     */
    memoryUsed: number;

    /**
     * Score obtained.
     */
    score: number;

    /**
     * Points obtained in this submission.
     */
    points: number;

    /**
     * Penalty applied (in minutes).
     */
    penalty: number;
}

/**
 * Generic user information returned in responses.
 */
export interface GenericUserInfoResponse {
    /**
     * User UUID.
     */
    id: string;

    /**
     * User's full name.
     */
    name: string;

    /**
     * User's email address.
     */
    email: string;

    /**
     * Account creation timestamp (ISO 8601).
     */
    createdAt: string;

    /**
     * Last login timestamp (ISO 8601).
     */
    lastLoggedAt: string;

    /**
     * Student registration number.
     */
    ra: string;

    /**
     * Year the student joined.
     */
    joinYear: number;

    /**
     * Department (nullable).
     */
    department: string | null;

    /**
     * Exercises created (nullable).
     */
    exercisesCreated: null;
}

/**
 * Question created during competition.
 */
export interface QuestionResponse {
    /**
     * Unique identifier for the question.
     */
    id: number;

    /**
     * Identifier of the competition.
     */
    competitionId: number;

    /**
     * Exercise ID if question is about a specific exercise (optional).
     */
    exerciseId?: number | null;

    /**
     * UUID of the user who created the question.
     */
    userId: string;

    /**
     * Complete user information of the person who asked.
     */
    user: GenericUserInfoResponse;

    /**
     * The question content/text.
     */
    content: string;

    /**
     * Answer ID if the question has been answered (optional).
     */
    answerId?: number | null;

    /**
     * Associated answer if available (optional).
     */
    answer?: AnswerResponse | null;

    /**
     * Type of the question (enum).
     */
    questionType: number;
}

/**
 * Answer to a question.
 */
export interface AnswerResponse {
    /**
     * Unique identifier for the answer.
     */
    id: number;

    /**
     * The answer content/text.
     */
    content: string;

    /**
     * UUID of the user who answered (teacher/admin).
     */
    userId: string;

    /**
     * Complete user information of the person who answered.
     */
    user: GenericUserInfoResponse;

    /**
     * Identifier of the question being answered (for reference).
     */
    questionId?: number;
}

/**
 * Summary of exercise attempts for a group.
 */
export interface ExerciseAttemptSummary {
    /**
     * Identifier of the group.
     */
    groupId: number;

    /**
     * Identifier of the exercise.
     */
    exerciseId: number;

    /**
     * Number of attempts made for this exercise.
     */
    attempts: number;
}

/**
 * Competition ranking entry broadcast after submissions.
 */
export interface CompetitionRankingResponse {
    /**
     * Unique identifier for the ranking entry.
     */
    id: number;

    /**
     * Total points accumulated.
     */
    points: number;

    /**
     * Total penalty in minutes.
     */
    penalty: number;

    /**
     * Position in ranking (1 = first place).
     */
    rankOrder: number;

    /**
     * Group details.
     */
    group: Group;

    /**
     * Summary of exercise attempts.
     */
    exerciseAttempts: ExerciseAttemptSummary[];
}
