import { ExerciseType } from "@/types/Exercise";

/**
 * Represents an exercise with its details and metadata.
 */
export interface EditExerciseRequestFormValues {
    /**
     * Unique identifier for the exercise.
     */
    id: number;

    /**
     * Title of the exercise.
     */
    title: string;

    /**
     * Type of the exercise.
     */
    exerciseType: ExerciseType;

    /**
     * Description of the exercise.
     */
    description: string;

    /**
     * Estimated time to complete the exercise, in seconds.
     */
    estimatedTime: number;

    /**
     * UUID of the judge associated with the exercise.
     */
    judgeUuid: string;

    /**
     * ISO string representing when the exercise was created.
     */
    createdAt: string;

    /**
     * List of inputs for the exercise.
     */
    inputs: string;

    /**
     * List of outputs for the exercise.
     */
    outputs: string;
}