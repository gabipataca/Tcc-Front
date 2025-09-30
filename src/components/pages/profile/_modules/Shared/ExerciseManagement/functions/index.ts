import { toBase64 } from "@/libs/utils";
import { ExerciseInput, ExerciseOutput } from "@/types/Exercise";
import {
    CreateExerciseInputRequest,
    CreateExerciseOutputRequest,
    EditExerciseInputRequest,
    EditExerciseOutputRequest,
} from "@/types/Exercise/Requests";

export const processCreateExerciseValues = (
    inputValues: string,
    outputValues: string
) => {
    const inputStrings = inputValues
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    const outputStrings = outputValues
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    const inputs: CreateExerciseInputRequest[] = inputStrings.map((s, idx) => ({
        input: toBase64(s),
        exerciseId: null,
        orderId: idx,
    }));
    const outputs: CreateExerciseOutputRequest[] = outputStrings.map(
        (s, idx) => ({ output: toBase64(s), exerciseId: null, orderId: idx })
    );

    return { inputs, outputs };
};


export const processEditExerciseValues = (
    inputValues: ExerciseInput[],
    outputValues: ExerciseOutput[]
) => {
    const inputs = inputValues.map((x, idx) => {

        return {
            id: x.id,
            exerciseId: x.exerciseId,
            orderId: idx,
            input: toBase64(x.input)
        } satisfies EditExerciseInputRequest;
    });

    const outputs = outputValues.map((x, idx) => {

        return {
            id: x.id,
            exerciseId: x.exerciseId,
            exerciseInputId: x.exerciseInputId,
            orderId: idx,
            output: toBase64(x.output)
        } satisfies EditExerciseOutputRequest;
    });

    return { inputs, outputs };
};


