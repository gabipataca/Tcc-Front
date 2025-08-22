import { Exercise, ExerciseType } from "@/types/Exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { EditExerciseRequestFormValues } from "../types";
import { exerciseTypeOptions } from "../constants";
import { GetExercisesResponse } from "@/types/Exercise/Responses";
import { CreateExerciseRequest } from "@/types/Exercise/Requests";
import useLoadExercises from "./useLoadExercises";

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
    } = useLoadExercises();

    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<ExerciseType>(1);
    const [description, setDescription] = useState<string>("");
    const [inputValues, setInputValues] = useState<string>("");
    const [outputValues, setOutputValues] = useState<string>("");

    const [filter, setFilter] = useState<string>("Todos");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const {
        control: editExerciseControl,
        handleSubmit: handleEditSubmit,
        setError,
        setValue,
        register,
        watch,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            id: 0,
            title: "",
            exerciseType: 1,
            description: "",
            estimatedTime: 0,
            judgeUuid: "",
            createdAt: "",
            inputs: "",
            outputs: "",
        },
        mode: "onBlur",
        // @ts-expect-error : Irrelevant
        resolver: zodResolver(schema),
    });

    // @ts-expect-error : Irrelevant
    const editingExercise: EditExerciseRequestFormValues = watch();

    const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);


    const filterOptions = useMemo(
        () => ["Todos", ...exerciseTypeOptions.map(x => x.label)],
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

        const newExercise: CreateExerciseRequest = {
            title,
            exerciseType: type,
            description,
            estimatedTime: 0,
            judgeUuid: null,
            inputs: [],
            outputs: [],
        };

        await addExercise(newExercise);
        setTitle("");
        setType(1);
        setDescription("");
        setInputValues("");
        setOutputValues("");
    }, [title, type, description, inputValues, outputValues, addExercise]);

    const handleRemoveExercise = useCallback((indexToRemove: number) => {
        try {
            deleteExercise(exercises[indexToRemove].id);
        } catch (error) {
            console.error("Error removing exercise:", error);
        }
    }, [deleteExercise, exercises]);

    const startEdit = useCallback(
        (index: number, exercise: Exercise) => {
            toggleEditExerciseModal();
            setValue("id", exercise.id);
        },
        [toggleEditExerciseModal, setValue]
    );

    const saveEdit = useCallback(() => {
        if (editingExercise.id == -1) return;

        
        setValue("id", -1);
        toggleEditExerciseModal();
    }, [editingExercise, toggleEditExerciseModal, setValue]);

    const handleLoadExercises = useCallback(async () => {
        await loadExercises(searchTerm);
    }, [loadExercises, searchTerm]);

    const cancelEdit = useCallback(() => {
        setValue("id", -1);
        toggleEditExerciseModal();
    }, [toggleEditExerciseModal, setValue]);

    const filteredExercises = useMemo(() => {
        return exercises.filter((exercise) => {
            const matchesFilter =
                filter === "Todos" || exercise.exerciseType === exerciseTypeOptions.find(x => x.label === filter)?.value;
            const matchesSearch = exercise.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [exercises, filter, searchTerm]);

    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            setSearchTimeout(null);
        }

        setSearchTimeout(setTimeout(() => {
            handleLoadExercises();
        }, 1000));
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
        editExerciseControl,
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
