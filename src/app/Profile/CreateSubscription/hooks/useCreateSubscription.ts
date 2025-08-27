import { useState, useMemo, useCallback } from "react";

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

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const dataCompetition: CompetitionFormData = {
                name,
                description,
                maxMembers: Number(maxMembers),
                initialDate,
                initialRegistration,
                endRegistration,
                status,
            };
            alert("Maratona criada com sucesso!");
        },
        [
            name,
            description,
            maxMembers,
            initialDate,
            initialRegistration,
            endRegistration,
            status,
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
