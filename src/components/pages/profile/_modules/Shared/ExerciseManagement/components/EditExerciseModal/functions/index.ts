import { Exercise } from "@/types/Exercise";
import { EditExerciseRequestFormValues } from "../../../types";

export const processExercise = (exercise: Exercise): EditExerciseRequestFormValues => {
    const inputs = exercise.inputs;
    const outputs = exercise.outputs;

    inputs.sort((a, b) => a.id - b.id);
    outputs.sort((a, b) => a.id - b.id);

    const inputsString = inputs.map(input => input.input).join("\n");
    const outputsString = outputs.map(output => output.output).join("\n");

    return {
        id: exercise.id,
        title: exercise.title,
        description: exercise.description,
        createdAt: exercise.createdAt,
        estimatedTime: exercise.estimatedTime,
        exerciseType: exercise.exerciseTypeId,
        judgeUuid: exercise.judgeUuid!,
        inputs: inputsString,
        outputs: outputsString,
    };
}