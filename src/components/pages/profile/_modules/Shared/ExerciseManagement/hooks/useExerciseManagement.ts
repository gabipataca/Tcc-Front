import { useState, useMemo, useCallback } from "react";

interface Exercise {
    title: string;
    type: string;
    description: string;
    inputValues: string;
    outputValues: string;
}

interface EditingExercise extends Exercise {
    originalIndex: number;
}

export const useExerciseManagement = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("Estruturas de Dados");
    const [description, setDescription] = useState<string>("");
    const [inputValues, setInputValues] = useState<string>("");
    const [outputValues, setOutputValues] = useState<string>("");

    const [filter, setFilter] = useState<string>("Todos");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [editingExercise, setEditingExercise] =
        useState<EditingExercise | null>(null);

    const exerciseTypes = useMemo(
        () => [
            "Estruturas de Dados",
            "Algoritmos",
            "Matemática Computacional",
            "Grafos",
            "Programação Dinâmica",
            "Geometria Computacional",
            "Teoria dos Números",
        ],
        []
    );
    const filterOptions = useMemo(
        () => ["Todos", ...exerciseTypes],
        [exerciseTypes]
    );

    const getTypeColor = useCallback((exerciseType: string) => {
        switch (exerciseType) {
            case "Estruturas de Dados":
                return "bg-blue-100 text-blue-800";
            case "Algoritmos":
                return "bg-green-100 text-green-800";
            case "Matemática Computacional":
                return "bg-purple-100 text-purple-800";
            case "Grafos":
                return "bg-red-100 text-red-800";
            case "Programação Dinâmica":
                return "bg-indigo-100 text-indigo-800";
            case "Geometria Computacional":
                return "bg-pink-100 text-pink-800";
            case "Teoria dos Números":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }, []);

    const addExercise = useCallback(() => {
        if (!title.trim() || !type) {
            alert(
                "Por favor, preencha o título e selecione o tipo do exercício."
            );
            return;
        }

        const newExercise: Exercise = {
            title,
            type,
            description,
            inputValues,
            outputValues,
        };

        setExercises((prev) => [...prev, newExercise]);
        setTitle("");
        setType("Estruturas de Dados");
        setDescription("");
        setInputValues("");
        setOutputValues("");
    }, [title, type, description, inputValues, outputValues]);

    const removeExercise = useCallback((indexToRemove: number) => {
        setExercises((prev) => prev.filter((_, i) => i !== indexToRemove));
    }, []);

    const startEdit = useCallback((index: number, exercise: Exercise) => {
        setEditingExercise({ ...exercise, originalIndex: index });
    }, []);

    const saveEdit = useCallback(() => {
        if (editingExercise === null) return;

        setExercises((prevExercises) =>
            prevExercises.map((ex, i) =>
                i === editingExercise.originalIndex
                    ? {
                          title: editingExercise.title,
                          type: editingExercise.type,
                          description: editingExercise.description,
                          inputValues: editingExercise.inputValues,
                          outputValues: editingExercise.outputValues,
                      }
                    : ex
            )
        );
        setEditingExercise(null);
    }, [editingExercise]);

    const cancelEdit = useCallback(() => {
        setEditingExercise(null);
    }, []);

    const filteredExercises = useMemo(() => {
        return exercises.filter((exercise) => {
            const matchesFilter =
                filter === "Todos" || exercise.type === filter;
            const matchesSearch = exercise.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [exercises, filter, searchTerm]);

    return {
        title,
        setTitle,
        type,
        setType,
        filter,
        setFilter,
        searchTerm,
        editingExercise,
        setEditingExercise,
        addExercise,
        removeExercise,
        startEdit,
        saveEdit,
        cancelEdit,
        exerciseTypes,
        filterOptions,
        filteredExercises,
        getTypeColor,
        description,
        setDescription,
        inputValues,
        setInputValues,
        outputValues,
        setOutputValues,
    };
};
