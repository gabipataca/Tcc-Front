
/**
 * Represents the possible response codes from the judge system.
 */
export enum JudgeResponseEnum {
    Accepted = 0,
    WrongAnswer = 1,
    RuntimeError = 2,
    CompilationError = 3,
    PresentationError = 4,
    TimeLimitExceeded = 5,
    MemoryLimitExceeded = 6,
    SecurityError = 7
}

/**
 * Represents the output generated for a specific exercise input by the judge system.
 */
export interface ExerciseOutput {
    /**
     * Unique identifier for the exercise output.
     */
    id: number;

    /**
     * Identifier of the exercise associated with this output.
     */
    exerciseId: number;

    /**
     * Identifier of the input used for this exercise output.
     */
    exerciseInputId: number;

    /**
     * UUID of the judge that processed the output, or null if not available.
     */
    judgeUuid: string | null;

    /**
     * The output string produced by the judge system.
     */
    output: string;
}

/**
 * Represents the input data for an exercise, used by the judge system.
 */
export interface ExerciseInput {
    /**
     * Unique identifier for the exercise input.
     */
    id: number;

    /**
     * Identifier of the exercise associated with this input.
     */
    exerciseId: number;

    /**
     * UUID of the judge that will process this input.
     */
    judgeUuid: string;

    /**
     * The input string provided to the exercise.
     */
    input: string;
}

/**
 * Represents an exercise with its details and metadata.
 */
export interface Exercise {
    /**
     * Unique identifier for the exercise.
     */
    id: number;

    /**
     * Title of the exercise.
     */
    title: string;

    /**
     * Description of the exercise.
     */
    description: string;

    /**
     * Estimated time to complete the exercise, in seconds.
     */
    estimatedTime: number;

    /**
     * UUID of the judge associated with the exercise, or null if not assigned.
     */
    judgeUuid: string | null;

    /**
     * ISO string representing when the exercise was created.
     */
    createdAt: string;
}


/**
 * Represents the relationship between an exercise and a competition.
 */
export interface ExerciseInCompetition {
    /**
     * Identifier of the exercise included in the competition.
     */
    exerciseId: number;

    /**
     * Identifier of the competition containing the exercise.
     */
    competitionId: number;
}