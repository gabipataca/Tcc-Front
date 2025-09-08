import { useState, useEffect, useCallback, useMemo } from "react";

interface CompetitionConfig {
    nome: string;
    initialRegistration: string;
    registrationEnd: string;
    maxMembers: number;
}

interface InscricaoFormData {
    groupName: string;
    members: string[];
    competitionName: string;
}

export const useInscricaoForm = () => {
    const [competitionName, setCompetitionName] = useState("");
    const [quantityStudents, setQuantityStudents] = useState(1);
    const [members, setMembers] = useState<string[]>([""]);
    const [initialRegistration, setInitialRegistration] = useState("");
    const [registrationEnd, setRegistrationEnd] = useState("");
    const [maxMembers, setMaxMembers] = useState(3);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        const fetchMaratonaConfig = async () => {
            const data: CompetitionConfig = {
                nome: "Maratona de Programação 2024",
                initialRegistration: "2024-01-15",
                registrationEnd: "2024-02-15",
                maxMembers: 3,
            };
            setCompetitionName(data.nome);
            setInitialRegistration(data.initialRegistration);
            setRegistrationEnd(data.registrationEnd);
            setMaxMembers(data.maxMembers);
            setQuantityStudents(1);
            setMembers([""]);
        };
        fetchMaratonaConfig();
    }, []);

    const handleQuantidadeChange = useCallback((value: string) => {
        const quantity = Number.parseInt(value, 10);
        setQuantityStudents(quantity);
        setMembers(Array(quantity).fill(""));
    }, []);

    const handleIntegranteChange = useCallback(
        (index: number, value: string) => {
            const newMembers = [...members];
            newMembers[index] = value;
            setMembers(newMembers);
        },
        [members]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const dataInscricao: InscricaoFormData = {
                groupName,
                members,
                competitionName,
            };
            console.log("Form submitted:", dataInscricao);

            alert("Equipe inscrita com sucesso!");
        },
        [groupName, members, competitionName]
    );

    const isFormValid = useMemo(() => {
        const allMembersFilled = members.every(
            (member) => member.trim() !== ""
        );
        return groupName.trim() !== "" && allMembersFilled;
    }, [groupName, members]);

    return {
        competitionName,
        quantityStudents,
        members,
        initialRegistration,
        registrationEnd,
        maxMembers,
        groupName,
        setGroupName,
        handleQuantidadeChange,
        handleIntegranteChange,
        handleSubmit,
        isFormValid,
    };
};
