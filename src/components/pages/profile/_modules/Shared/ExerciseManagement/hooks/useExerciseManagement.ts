import { Exercise, ExerciseType } from "@/types/Exercise";
import { useState, useMemo, useCallback, useEffect } from "react";
import { EditExerciseRequestFormValues } from "../types";
import { exerciseTypeOptions } from "../constants";
import {
    CreateExerciseRequest,
} from "@/types/Exercise/Requests";
import useLoadExercises from "./useLoadExercises";
import { processCreateExerciseValues, processEditExerciseValues } from "../functions";



export const useExerciseManagement = () => {
    const {
        exercises,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        loadExercises,
        addExercise,
        deleteExercise,
        updateExercise,
    } = useLoadExercises();

    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<ExerciseType>(1);
    const [description, setDescription] = useState<string>("");
    const [inputValues, setInputValues] = useState<string>("");
    const [outputValues, setOutputValues] = useState<string>("");

    const [filter, setFilter] = useState<string>("Todos");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

    const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);

    const filterOptions = useMemo(
        () => ["Todos", ...exerciseTypeOptions.map((x) => x.label)],
        []
    );

    const toggleEditExerciseModal = useCallback(() => {
        setShowEditExerciseModal((prev) => !prev);
    }, []);

    const getTypeColor = useCallback((exerciseType: ExerciseType) => {
        switch (exerciseType) {
            case 1:
                return "bg-blue-100 text-blue-800";
            case 2:
                return "bg-green-100 text-green-800";
            case 3:
                return "bg-purple-100 text-purple-800";
            case 4:
                return "bg-red-100 text-red-800";
            case 5:
                return "bg-indigo-100 text-indigo-800";
            case 6:
                return "bg-pink-100 text-pink-800";
            case 7:
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }, []);

    const handleCreateExercise = useCallback(async () => {
        if (!title.trim() || !type) {
            alert(
                "Por favor, preencha o título e selecione o tipo do exercício."
            );
            return;
        }

        const { inputs, outputs } = processCreateExerciseValues(inputValues, outputValues);

        const newExercise: CreateExerciseRequest = {
            title,
            exerciseType: type,
            description,
            estimatedTime: 0,
            judgeUuid: null,
            inputs: inputs,
            outputs: outputs,
        };

        await addExercise(newExercise);
    }, [title, type, description, inputValues, outputValues, addExercise]);

    const handleRemoveExercise = useCallback(
        async (indexToRemove: number) => {
            try {
                await deleteExercise(exercises[indexToRemove].id);
            } catch (error) {
                console.error("Error removing exercise:", error);
            }
        },
        [deleteExercise, exercises]
    );

    const startEdit = useCallback(
        (exercise: Exercise) => {
            setEditingExercise({...exercise});
            toggleEditExerciseModal();
        },
        [toggleEditExerciseModal]
    );

    const saveEdit = useCallback(async (exercise: EditExerciseRequestFormValues) => {
        if (!editingExercise || editingExercise.id == -1) return;

        const {outputs, inputs} = processEditExerciseValues(exercise.inputs, exercise.outputs);

        await updateExercise({
            id: exercise.id,
            description: exercise.description,
            judgeUuid: exercise.judgeUuid,
            inputs: inputs,
            outputs: outputs,
            exerciseType: exercise.exerciseType,
            title: exercise.title,
            createdAt: exercise.createdAt,
            estimatedTime: exercise.estimatedTime,
        });

        
        toggleEditExerciseModal();
    }, [editingExercise, toggleEditExerciseModal, updateExercise]);

    const handleLoadExercises = useCallback(async () => {
        await loadExercises(searchTerm);
    }, [loadExercises, searchTerm]);

    const cancelEdit = useCallback(() => {
        toggleEditExerciseModal();
        setEditingExercise(null);
    }, [toggleEditExerciseModal]);

    const filteredExercises = useMemo(() => {
        return exercises.filter((exercise) => {
            const matchesFilter =
                filter === "Todos" ||
                exercise.exerciseType ===
                    exerciseTypeOptions.find((x) => x.label === filter)?.value;
            const matchesSearch = exercise.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [exercises, filter, searchTerm]);

    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            setSearchTimeout(null);
        }

        setSearchTimeout(
            setTimeout(() => {
                //handleLoadExercises();
            }, 1000)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleLoadExercises, searchTerm]);

    return {
        title,
        setTitle,
        type,
        setType,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        editingExercise,
        showEditExerciseModal,
        toggleEditExerciseModal,
        handleRemoveExercise,
        handleCreateExercise,
        startEdit,
        saveEdit,
        cancelEdit,
        filterOptions,
        filteredExercises,
        getTypeColor,
        description,
        setDescription,
        inputValues,
        setInputValues,
        outputValues,
        setOutputValues,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        handleLoadExercises,
    };
};
