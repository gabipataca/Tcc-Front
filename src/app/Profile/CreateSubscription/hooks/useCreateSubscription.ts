"use client";

import type React from "react";

import { useState, useMemo, useCallback } from "react";
import { useCompetition } from "@/contexts/CompetitionContext";
import { useSnackbar } from "notistack";

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

    const { addSubscription } = useCompetition();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            try {
                const dataCompetition: CompetitionFormData = {
                    name,
                    description,
                    maxMembers: Number(maxMembers),
                    initialDate,
                    initialRegistration,
                    endRegistration,
                    status,
                };

                addSubscription(dataCompetition);

                enqueueSnackbar("Inscrição liberada com sucesso", {
                    variant: "success",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } catch (error) {
                enqueueSnackbar("Erro ao liberar inscrição", {
                    variant: "error",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }
        },
        [
            name,
            description,
            maxMembers,
            initialDate,
            initialRegistration,
            endRegistration,
            status,
            addSubscription,
            enqueueSnackbar,
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
