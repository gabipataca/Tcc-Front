"use client";

import type React from "react";

import { useState, useMemo, useCallback } from "react";
import { useCompetition } from "@/contexts/CompetitionContext";
import { CreateCompetitionRequest } from "@/types/Competition/Requests";

interface CompetitionFormData {
    name: string;
    description: string;
    maxMembers: number;
    initialDate: string;
    initialRegistration: string;
    endRegistration: string;
    status: string;
}

export const useCompetitionForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [maxMembers, setMaxMembers] = useState("3");
    const [initialDate, setInitialDate] = useState("");
    const [initialRegistration, setInitialRegistration] = useState("");
    const [endRegistration, setEndRegistration] = useState("");
    const [status, setStatus] = useState("Fechado");

    const { createCompetition } = useCompetition();

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            try {
                const dataCompetition: CreateCompetitionRequest = {
                    name,
                    description,
                    maxMembers: Number(maxMembers),
                    startTime: initialDate,
                    startInscriptions: initialRegistration,
                    endInscriptions: endRegistration,
                    duration: "00:00:00",
                    stopRanking: null,
                    submissionPenalty: "00:20:00",
                    maxExercises: null,
                    maxSubmissionSize: 20,
                    exerciseIds: [],
                    blockSubmissions: null,
                };

                await createCompetition(dataCompetition);
            } catch (error) {
                console.log(error);
            }
        },
        [
            name,
            description,
            maxMembers,
            initialDate,
            initialRegistration,
            endRegistration,
            createCompetition,
        ]
    );

    const isFormValid = useMemo(() => {
        return (
            name &&
            description &&
            initialDate &&
            initialRegistration &&
            endRegistration
        );
    }, [name, description, initialDate, initialRegistration, endRegistration]);

    return {
        name,
        setName,
        description,
        setDescription,
        maxMembers,
        setMaxMembers,
        initialDate,
        setInitialDate,
        initialRegistration,
        setInitialRegistration,
        endRegistration,
        setEndRegistration,
        status,
        setStatus,
        handleSubmit,
        isFormValid,
    };
};
