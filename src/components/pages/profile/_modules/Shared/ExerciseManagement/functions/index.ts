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
        input: s,
        exerciseId: null,
        orderId: idx,
    }));
    const outputs: CreateExerciseOutputRequest[] = outputStrings.map(
        (s, idx) => ({ output: s, exerciseId: null, orderId: idx })
    );

    return { inputs, outputs };
};


export const processEditExerciseValues = (
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

    const inputs: EditExerciseInputRequest[] = inputStrings.map((s, idx) => ({
        input: s,
        exerciseId: null,
        orderId: idx,
    }));
    const outputs: EditExerciseOutputRequest[] = outputStrings.map(
        (s, idx) => ({ output: s, exerciseId: null, orderId: idx })
    );

    return { inputs, outputs };
};


