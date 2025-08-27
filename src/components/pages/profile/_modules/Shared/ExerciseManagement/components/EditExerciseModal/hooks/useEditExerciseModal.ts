import { EditExerciseRequestFormValues } from "../../../types";
import z from "zod";
import { ExerciseType } from "@/types/Exercise";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { useCallback } from "react";

const schema = z.object({
    id: z.number().min(1),
    title: z.string().min(2).max(100),
    exerciseType: z.custom<ExerciseType>(),
    description: z.string().min(10).max(1000, "Descrição muito longa"),
    estimatedTime: z.number().min(1),
    judgeUuid: z.string().uuid(),
    createdAt: z.string(),
    inputs: z
        .string()
        .min(1, "O exercício deve ter pelo menos um input")
        .max(1000, "Input muito longo"),
    outputs: z
        .string()
        .min(1, "O exercício deve ter pelo menos um output")
        .max(1000, "Output muito longo"),
});

const useEditExerciseModal = (
    data: EditExerciseRequestFormValues,
    saveEdit: (exercise: EditExerciseRequestFormValues) => Promise<void>,
    cancelEdit: () => void,
    onClose: () => void,
) => {
    const {
        control: editExerciseControl,
        handleSubmit: handleEditSubmit,
        setError,
        reset,
        setValue,
        register,
        watch,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            id: data.id,
            title: data.title,
            exerciseType: data.exerciseType,
            description: data.description,
            estimatedTime: data.estimatedTime,
            judgeUuid: data.judgeUuid,
            createdAt: data.createdAt,
            inputs: data.inputs,
            outputs: data.outputs,
        },
        mode: "onBlur",
        // @ts-expect-error : Irrelevant
        resolver: zodResolver(schema),
    });

    const handleValidConfirm = useCallback(async (data: EditExerciseRequestFormValues) => {
        await saveEdit(data);
    }, [saveEdit]);

    const handleInvalidConfirm: SubmitErrorHandler<EditExerciseRequestFormValues> = useCallback(async (errors) => {
        
    }, []);

    const formValues = watch();

    return {
        editExerciseControl,
        formValues,
        handleValidConfirm,
        handleInvalidConfirm,
        handleEditSubmit,
    };
};

export default useEditExerciseModal;
