import { Exercise, ExerciseType } from "@/types/Exercise";
import { useState, useMemo, useCallback, useEffect, ChangeEvent } from "react";
import { EditExerciseRequestFormValues } from "../types";
import { exerciseTypeOptions } from "../constants";
import useLoadExercises from "./useLoadExercises";
import {
    processCreateExerciseValues,
    processEditExerciseValues,
} from "../functions";

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

    // Estados do formulário de criação
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<ExerciseType>(1);
    const [inputValues, setInputValues] = useState<string>("");
    const [outputValues, setOutputValues] = useState<string>("");
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    // Estados de filtro e busca
    const [filter, setFilter] = useState<string>("Todos");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    // Estados do modal de edição
    const [editingExercise, setEditingExercise] = useState<Exercise | null>(
        null
    );
    const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfFile(e.target.files[0]);
        }
    }, []);

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
        if (!title.trim() || !type || !pdfFile) {
            alert(
                "Por favor, preencha o título, selecione o tipo e anexe um arquivo PDF."
            );
            return;
        }
        const { inputs, outputs } = processCreateExerciseValues(
            inputValues,
            outputValues
        );
        const formData = new FormData();
        formData.append("title", title);
        formData.append("exerciseType", type.toString());
        formData.append("pdfAttachment", pdfFile);
        formData.append("inputs", JSON.stringify(inputs));
        formData.append("outputs", JSON.stringify(outputs));
        formData.append("estimatedTime", "0");

        await addExercise(formData);

        setTitle("");
        setType(1);
        setInputValues("");
        setOutputValues("");
        setPdfFile(null);
    }, [title, type, pdfFile, inputValues, outputValues, addExercise]);

    const handleRemoveExercise = useCallback(
        async (indexToRemove: number) => {
            if (exercises && exercises[indexToRemove]) {
                await deleteExercise(exercises[indexToRemove].id);
            }
        },
        [deleteExercise, exercises]
    );

    const startEdit = useCallback(
        (exercise: Exercise) => {
            setEditingExercise({ ...exercise });
            toggleEditExerciseModal();
        },
        [toggleEditExerciseModal]
    );

    const saveEdit = useCallback(
        async (exercise: EditExerciseRequestFormValues) => {
            if (!editingExercise) return;

            const { outputs, inputs } = processEditExerciseValues(
                exercise.inputs,
                exercise.outputs
            );

            await updateExercise({
                id: exercise.id,
                title: exercise.title,
                description: exercise.description,
                exerciseType: exercise.exerciseType,
                estimatedTime: exercise.estimatedTime,
                judgeUuid: exercise.judgeUuid,
                inputs: inputs,
                outputs: outputs,
                createdAt: exercise.createdAt,
            });

            toggleEditExerciseModal();
        },
        [editingExercise, toggleEditExerciseModal, updateExercise]
    );

    const cancelEdit = useCallback(() => {
        toggleEditExerciseModal();
        setEditingExercise(null);
    }, [toggleEditExerciseModal]);

    const filteredExercises = useMemo(() => {
        if (!Array.isArray(exercises)) {
            return [];
        }

        return exercises.filter((exercise) => {
            if (!exercise) return false;

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

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(
            setTimeout(() => {
                // Se a busca precisar recarregar os dados da API, descomente a linha abaixo
                // loadExercises(searchTerm);
            }, 500)
        );
    }, [searchTerm, loadExercises]);

    return {
        title,
        setTitle,
        type,
        setType,
        inputValues,
        setInputValues,
        outputValues,
        setOutputValues,
        pdfFile,
        handleFileChange,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        filteredExercises,
        editingExercise,
        showEditExerciseModal,
        toggleEditExerciseModal,
        handleCreateExercise,
        handleRemoveExercise,
        startEdit,
        saveEdit,
        cancelEdit,
        exercises,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        getTypeColor,
    };
};
