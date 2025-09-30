"use client"

import { fromBase64 } from "@/libs/utils";
import ExerciseService from "@/services/ExerciseService";
import { Exercise, ExerciseType } from "@/types/Exercise";
import {
    CreateExerciseRequest,
    EditExerciseRequest,
} from "@/types/Exercise/Requests";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

const useLoadExercises = () => {
    const [loadingExercises, setLoadingExercises] = useState<boolean>(false);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [exerciseTypeFilter, setExerciseTypeFilter] =
        useState<ExerciseType | null>(null);
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

    const toggleExerciseTypeFilter = useCallback(
        (type: ExerciseType | null) => {
            setExerciseTypeFilter(type);
        },
        []
    );

    const toggleLoadingExercises = useCallback(() => {
        setLoadingExercises((prev) => !prev);
    }, []);

    const addExercise = useCallback(
        async (exercise: CreateExerciseRequest) => {
            try {
                setLoadingExercises(true);
                const response = await ExerciseService.createExercise(exercise);

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
            } finally {
                setLoadingExercises(false);
            }
        },
        [enqueueSnackbar]
    );

    const loadExercises = useCallback(
        async (searchTerm: string, exerciseType: ExerciseType | null) => {
            try {
                setLoadingExercises(true);
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
                    exerciseType,
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
                enqueueSnackbar("Erro ao carregar exercícios.", {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "bottom",
                    },
                });
            } finally {
                setLoadingExercises(false);
            }
        },
        [controllerSignal, currentPage, enqueueSnackbar]
    );

    const deleteExercise = useCallback(
        async (id: number) => {
            try {
                await ExerciseService.deleteExercise(id);
                setExercises((prev) => prev.filter((ex) => ex.id !== id));
            } catch (error) {
                console.error("Error deleting exercise:", error);
            }
        },
        [setExercises]
    );

    const updateExercise = useCallback(
        async (exercise: EditExerciseRequest) => {
            try {
                const data = await ExerciseService.updateExercise(exercise);
                const exercisesCopy = exercises.filter(
                    (ex) => ex.id !== data.id
                );
                exercisesCopy.push(data);
                exercisesCopy.sort((a, b) => (a.id! < b.id! ? -1 : 1));
                setExercises([...exercisesCopy]);
                enqueueSnackbar("Exercício atualizado com sucesso!", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 2500,
                });
            } catch (error) {
                console.error("Error updating exercise:", error);
                enqueueSnackbar("Erro ao tentar atualizar exercício!", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 2500,
                });
            }
        },
        [enqueueSnackbar, exercises]
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
        toggleExerciseTypeFilter,
        exerciseTypeFilter,
        loadingExercises,
        toggleLoadingExercises,
    };
};

export default useLoadExercises;
