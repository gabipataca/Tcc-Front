import { JudgeResponseEnum } from "../Exercise";

/**
 * Request to send an exercise submission attempt.
 */
export interface GroupExerciseAttemptRequest {
    /**
     * Identifier of the group submitting.
     */
    groupId: number;

    /**
     * Identifier of the exercise.
     */
    exerciseId: number;

    /**
     * Source code of the submission.
     */
    code: string;

    /**
     * Programming language ID.
     */
    languageId: number;

    /**
     * Identifier of the competition.
     */
    competitionId: number;
}

/**
 * Request to create a question during competition.
 */
export interface CreateGroupQuestionRequest {
    /**
     * Identifier of the group asking.
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
}

/**
 * Request to answer a question.
 */
export interface AnswerGroupQuestionRequest {
    /**
     * Identifier of the question to answer.
     */
    questionId: number;

    /**
     * The answer text.
     */
    answerText: string;

    /**
     * Whether answer is private to the asking group only.
     */
    isPrivate: boolean;
}

/**
 * Request to manually change a submission's judge response.
 */
export interface RevokeGroupSubmissionRequest {
    /**
     * Identifier of the submission to modify.
     */
    submissionId: number;

    /**
     * New judge response to apply.
     */
    newJudgeResponse: JudgeResponseEnum;
}

/**
 * Request to block a group from submitting.
 */
export interface BlockGroupSubmissionRequest {
    /**
     * Identifier of the group to block.
     */
    groupId: number;

    /**
     * Identifier of the competition.
     */
    competitionId: number;

    /**
     * Optional reason for blocking.
     */
    reason?: string;
}

/**
 * Request to unblock a group's submission capability.
 */
export interface UnblockGroupSubmissionRequest {
    /**
     * Identifier of the group to unblock.
     */
    groupId: number;

    /**
     * Identifier of the competition.
     */
    competitionId: number;
}
