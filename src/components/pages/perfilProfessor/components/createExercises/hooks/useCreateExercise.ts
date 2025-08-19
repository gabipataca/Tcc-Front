import { useState, useMemo, useCallback } from "react";

interface Exercise {
    title: string;
    type: string;
}

interface UseCreateExercise {
    exercises: Exercise[];
    title: string;
    setTitle: (title: string) => void;
    type: string;
    setType: (type: string) => void;
    filter: string;
    setFilter: (filter: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    editingExercise: { index: number; title: string; type: string } | null;
    addExercise: () => void;
    removeExercise: (index: number) => void;
    startEdit: (index: number, exercise: Exercise) => void;
    saveEdit: () => void;
    cancelEdit: () => void;
    exerciseTypes: string[];
    filterOptions: string[];
    filteredExercises: Exercise[];
    getTypeColor: (type: string) => string;
}

export const useCreateExercise = (): UseCreateExercise => {
    // Nome do hook atualizado aqui
    const [exercises, setExercises] = useState<Exercise[]>([
        { title: "Exemplo de Exercício", type: "Lógico" },
    ]);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Lógico");
    const [filter, setFilter] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingExercise, setEditingExercise] = useState<{
        index: number;
        title: string;
        type: string;
    } | null>(null);

    const exerciseTypes = useMemo(
        () => [
            "Lógico",
            "Sequenciais",
            "Matemáticos",
            "Strings",
            "Grafos",
            "Matriz",
        ],
        []
    );
    const filterOptions = useMemo(
        () => ["Todos", ...exerciseTypes],
        [exerciseTypes]
    );

    const addExercise = useCallback(() => {
        if (title.trim()) {
            setExercises((prevExercises) => [
                ...prevExercises,
                { title, type },
            ]);
            setTitle("");
        }
    }, [title, type]);

    const removeExercise = useCallback((index: number) => {
        setExercises((prevExercises) =>
            prevExercises.filter((_, i) => i !== index)
        );
    }, []);

    const startEdit = useCallback((index: number, exercise: Exercise) => {
        setEditingExercise({
            index,
            title: exercise.title,
            type: exercise.type,
        });
    }, []);

    const saveEdit = useCallback(() => {
        if (editingExercise) {
            setExercises((prevExercises) => {
                const updatedExercises = [...prevExercises];
                updatedExercises[editingExercise.index] = {
                    title: editingExercise.title,
                    type: editingExercise.type,
                };
                return updatedExercises;
            });
            setEditingExercise(null);
        }
    }, [editingExercise]);

    const cancelEdit = useCallback(() => {
        setEditingExercise(null);
    }, []);

    const filteredExercises = useMemo(() => {
        return exercises.filter((ex) => {
            const matchesFilter = filter === "Todos" || ex.type === filter;
            const matchesSearch = ex.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [exercises, filter, searchTerm]);

    const getTypeColor = useCallback((exerciseType: string) => {
        const colors: { [key: string]: string } = {
            Lógico: "bg-[#4F85A6] text-white",
            Sequenciais: "bg-[#9abbd6] text-white",
            Matemáticos: "bg-[#3f3c40] text-white",
            Strings: "bg-[#4F85A6] text-white",
            Grafos: "bg-[#9abbd6] text-white",
            Matriz: "bg-[#3f3c40] text-white",
        };
        return colors[exerciseType] || "bg-[#e9edee] text-[#3f3c40]";
    }, []);

    return {
        exercises,
        title,
        setTitle,
        type,
        setType,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        editingExercise,
        addExercise,
        removeExercise,
        startEdit,
        saveEdit,
        cancelEdit,
        exerciseTypes,
        filterOptions,
        filteredExercises,
        getTypeColor,
    };
};
