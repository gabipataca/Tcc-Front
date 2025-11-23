"use client";

import type React from "react";
import { useState, useMemo, useCallback } from "react";
import { useCompetition } from "@/contexts/CompetitionContext";
import { CreateCompetitionRequest } from "@/types/Competition/Requests";

export const useCompetitionForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [maxMembers, setMaxMembers] = useState("3");

    const [initialDate, setInitialDate] = useState("");
    const [initialDateTime, setInitialDateTime] = useState("");

    const [initialRegistration, setInitialRegistration] = useState("");
    const [initialRegistrationTime, setInitialRegistrationTime] = useState("");

    const [endRegistration, setEndRegistration] = useState("");
    const [endRegistrationTime, setEndRegistrationTime] = useState("");

    const [status, setStatus] = useState("Fechado");

    const { createCompetition } = useCompetition();

    const isStartAfterEnd = useMemo(() => {
        if (
            !initialRegistration ||
            !initialRegistrationTime ||
            !endRegistration ||
            !endRegistrationTime
        ) {
            return false;
        }
        const start = new Date(
            `${initialRegistration}T${initialRegistrationTime}`
        );
        const end = new Date(`${endRegistration}T${endRegistrationTime}`);
        return start > end;
    }, [
        initialRegistration,
        initialRegistrationTime,
        endRegistration,
        endRegistrationTime,
    ]);

    const isEndAfterMarathon = useMemo(() => {
        if (
            !endRegistration ||
            !endRegistrationTime ||
            !initialDate ||
            !initialDateTime
        ) {
            return false;
        }
        const end = new Date(`${endRegistration}T${endRegistrationTime}`);
        const marathon = new Date(`${initialDate}T${initialDateTime}`);
        return end > marathon;
    }, [endRegistration, endRegistrationTime, initialDate, initialDateTime]);

    const hasDateErrors = isStartAfterEnd || isEndAfterMarathon;

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (hasDateErrors) return;

            try {
                const startTimeISO = `${initialDate}T${initialDateTime}:00.000Z`;
                const startInscriptionsISO = `${initialRegistration}T${initialRegistrationTime}:00.000Z`;
                const endInscriptionsISO = `${endRegistration}T${endRegistrationTime}:00.000Z`;

                const dataCompetition: CreateCompetitionRequest = {
                    name,
                    description,
                    maxMembers: Number(maxMembers),
                    startTime: startTimeISO,
                    startInscriptions: startInscriptionsISO,
                    endInscriptions: endInscriptionsISO,
                    duration: "05:00:00",
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
            initialDateTime,
            initialRegistration,
            initialRegistrationTime,
            endRegistration,
            endRegistrationTime,
            createCompetition,
            hasDateErrors,
        ]
    );

    const isFormValid = useMemo(() => {
        return (
            name &&
            description &&
            initialDate &&
            initialDateTime &&
            initialRegistration &&
            initialRegistrationTime &&
            endRegistration &&
            endRegistrationTime &&
            !hasDateErrors
        );
    }, [
        name,
        description,
        initialDate,
        initialDateTime,
        initialRegistration,
        initialRegistrationTime,
        endRegistration,
        endRegistrationTime,
        hasDateErrors,
    ]);

    return {
        name,
        setName,
        description,
        setDescription,
        maxMembers,
        setMaxMembers,
        initialDate,
        setInitialDate,
        initialDateTime,
        setInitialDateTime,
        initialRegistration,
        setInitialRegistration,
        initialRegistrationTime,
        setInitialRegistrationTime,
        endRegistration,
        setEndRegistration,
        endRegistrationTime,
        setEndRegistrationTime,
        status,
        setStatus,
        handleSubmit,
        isFormValid,
        isStartAfterEnd,
        isEndAfterMarathon,
    };
};
