import { fromBase64 } from "@/libs/utils";
import ExerciseService from "@/services/ExerciseService";
import { Exercise } from "@/types/Exercise";
import {
    CreateExerciseRequest,
    EditExerciseRequest,
} from "@/types/Exercise/Requests";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

const useLoadExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [controllerSignal, setControllerSignal] =
        useState<AbortController | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const nextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [currentPage, totalPages]);

    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentPage]);

    const addExercise = useCallback(
        async (exercise: CreateExerciseRequest) => {
            try {
                const response = await ExerciseService.createExercise(exercise);

                console.log(response.status);

                if (response.status !== 201) {
                    enqueueSnackbar("Erro ao tentar criar exercício.", {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            horizontal: "right",
                            vertical: "bottom",
                        },
                    });
                    return;
                }
                const data = response.data!;
                setExercises((prev) => [...prev, data]);

                enqueueSnackbar("Exercício criado com sucesso!", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { horizontal: "right", vertical: "bottom" },
                });
            } catch (error) {
                console.error("Error adding exercise:", error);
            }
        },
        [enqueueSnackbar]
    );

    const loadExercises = useCallback(
        async (searchTerm: string) => {
            try {
                if (controllerSignal) {
                    controllerSignal.abort();
                    setControllerSignal(null);
                }

                const controller = new AbortController();
                setControllerSignal(controller);

                const response = await ExerciseService.getExercises(
                    currentPage,
                    10,
                    searchTerm,
                    controller.signal
                );
                const data = response.data!;

                setExercises(
                    data.items.map((item) => ({
                        ...item,
                        inputs: item.inputs.map((input) => ({
                            ...input,
                            input: fromBase64(input.input),
                        })),
                        outputs: item.outputs.map((output) => ({
                            ...output,
                            output: fromBase64(output.output),
                        })),
                    }))
                );
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error loading exercises:", error);
            }
        },
        [currentPage, controllerSignal]
    );

    const deleteExercise = useCallback(async (id: number) => {
        try {
            await ExerciseService.deleteExercise(id);
            setExercises((prev) => prev.filter((ex) => ex.id !== id));
        } catch (error) {
            console.error("Error deleting exercise:", error);
        }
    }, []);

    const updateExercise = useCallback(
        async (exercise: EditExerciseRequest) => {
            try {
                const response = await ExerciseService.updateExercise(exercise);
                const data = response.data!;
                setExercises((prev) =>
                    prev.map((ex) =>
                        ex.id === exercise.id ? { ...ex, ...data } : ex
                    )
                );
            } catch (error) {
                console.error("Error updating exercise:", error);
            }
        },
        [setExercises]
    );

    return {
        exercises,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        loadExercises,
        addExercise,
        deleteExercise,
        updateExercise,
        controllerSignal,
        setControllerSignal,
    };
};

export default useLoadExercises;
