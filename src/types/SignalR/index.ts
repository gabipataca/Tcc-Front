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
 * Question created during competition.
 */
export interface QuestionResponse {
    /**
     * Unique identifier for the question.
     */
    id: number;

    /**
     * Identifier of the group that asked.
     */
    groupId: number;

    /**
     * Identifier of the competition.
     */
    competitionId: number;

    /**
     * Exercise ID if question is about a specific exercise.
     */
    exerciseId?: number | null;

    /**
     * The question text.
     */
    questionText: string;

    /**
     * Timestamp when asked (ISO 8601).
     */
    askedAt: string;

    /**
     * Name of the user who asked.
     */
    askedBy: string;

    /**
     * Whether the question has been answered.
     */
    isAnswered: boolean;

    /**
     * Associated answer if available.
     */
    answer?: AnswerResponse | null;
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
     * Identifier of the question being answered.
     */
    questionId: number;

    /**
     * The answer text.
     */
    answerText: string;

    /**
     * Timestamp when answered (ISO 8601).
     */
    answeredAt: string;

    /**
     * Name of the teacher/admin who answered.
     */
    answeredBy: string;

    /**
     * ID of the teacher/admin who answered.
     */
    answeredById: string;

    /**
     * Whether answer is private to the asking group.
     */
    isPrivate: boolean;
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
