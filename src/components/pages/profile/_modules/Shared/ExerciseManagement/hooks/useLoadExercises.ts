import ExerciseService from "@/services/ExerciseService";
import { Exercise } from "@/types/Exercise";
import {
    CreateExerciseRequest,
    EditExerciseRequest,
} from "@/types/Exercise/Requests";
import { useCallback, useState } from "react";

const useLoadExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [controllerSignal, setControllerSignal] =
        useState<AbortController | null>(null);

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

    const loadExercises = useCallback(
        async (searchTerm: string) => {
            try {
                if (controllerSignal) {
                    controllerSignal.abort();
                }
                const controller = new AbortController();
                setControllerSignal(controller);

                const response = await ExerciseService.getExercises(
                    currentPage,
                    10,
                    searchTerm,
                    controller.signal
                );

                console.log("API Response:", response);

                if (response && response.data) {
                    const data = response.data;

                    setExercises(data.items || []);
                    setTotalPages(data.totalPages || 1);
                } else {
                    setExercises([]);
                    setTotalPages(1);
                }
            } catch (error) {
                if ((error as any).name !== "AbortError") {
                    console.error("Error loading exercises:", error);
                    // Também define como vazio em caso de erro na chamada.
                    setExercises([]);
                    setTotalPages(1);
                }
            }
        },
        [currentPage, controllerSignal]
    );

    const addExercise = useCallback(
        async (exerciseData: FormData) => {
            try {
                await ExerciseService.createExercise(exerciseData);
                await loadExercises("");
            } catch (error) {
                console.error("Error adding exercise:", error);
                alert(
                    "Falha ao criar o exercício. Verifique o console para mais detalhes."
                );
            }
        },
        [loadExercises]
    );

    const deleteExercise = useCallback(
        async (id: number) => {
            try {
                await ExerciseService.deleteExercise(id);
                await loadExercises("");
            } catch (error) {
                console.error("Error deleting exercise:", error);
            }
        },
        [loadExercises]
    );

    const updateExercise = useCallback(
        async (exercise: EditExerciseRequest) => {
            try {
                await ExerciseService.updateExercise(exercise);
                await loadExercises("");
            } catch (error) {
                console.error("Error updating exercise:", error);
            }
        },
        [loadExercises]
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
    };
};

export default useLoadExercises;
