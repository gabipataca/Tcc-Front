"use client";

import ExerciseService from "@/services/ExerciseService";
import { Exercise } from "@/types/Exercise";
import { useCallback, useEffect, useState } from "react";

const useLoadExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [maxPages, setMaxPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalExercises, setTotalExercises] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [search, setSearch] = useState("");
    const [loadSignal, setLoadSignal] = useState<AbortController | null>(null);

    const loadExercises = useCallback(
        async () => {
            const controller = new AbortController();
            setLoadSignal(controller);

            setIsLoading(true);
            try {
                const response = await ExerciseService.getExercises(
                    currentPage,
                    pageSize,
                    search,
                    controller.signal
                );
                setExercises(response.data?.items || []);
                setMaxPages(response.data?.totalPages || 1);
                setTotalExercises(response.data?.totalCount || 0);
            } catch (error) {
                console.error("Error loading exercises:", error);
            } finally {
                setIsLoading(false);
            }

            return () => {
                if (loadSignal) {
                    loadSignal.abort();
                    setLoadSignal(null);
                }
            };
        },
        [currentPage, loadSignal, pageSize, search]
    );

    const togglePage = useCallback(
        (newPage: number) => {
            setCurrentPage(newPage);
            loadExercises();
        },
        [loadExercises]
    );

    useEffect(() => {
        loadExercises();
    }, []);

    useEffect(() => {
        if(search == "") return;

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout(() => {
            loadExercises();
        }, 900));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return {
        exercises,
        isLoading,
        maxPages,
        pageSize,
        currentPage,
        search,
        togglePage,
        loadExercises,
        setSearch,
        totalExercises,
    };
};

export default useLoadExercises;
