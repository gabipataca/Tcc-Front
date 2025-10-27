import { useUser } from "@/contexts/UserContext";
import useLoadCompetitions from "@/providers/CompetitionContextProvider/hooks/useLoadCompetitions";
import { Competition } from "@/types/Competition";
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

export const useInscriptionForm = () => {
    const { user } = useUser();

    const [activeCompetition, setActiveCompetition] =
        useState<Competition | null>(null);

    const {
        openSubCompetitions,
        isSubCompetitionsLoading,
        loadOpenSubCompetitions,
    } = useLoadCompetitions();

    const [competitionName, setCompetitionName] = useState("");
    const [quantityStudents, setQuantityStudents] = useState(1);
    const [members, setMembers] = useState<string[] | null>(
        user?.group?.users.map((u) => u.name) || null
    );
    const [initialRegistration, setInitialRegistration] = useState("");
    const [registrationEnd, setRegistrationEnd] = useState("");
    const [maxMembers, setMaxMembers] = useState(3);
    const [groupName, setGroupName] = useState(user?.group?.name || null);

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
        if (!members || !groupName) return false;

        const allMembersFilled = members.every(
            (member) => member.trim() !== ""
        );
        return groupName.trim() !== "" && allMembersFilled;
    }, [groupName, members]);

    useEffect(() => {
        loadOpenSubCompetitions();
    }, [loadOpenSubCompetitions]);

    useEffect(() => {
        const res =
            openSubCompetitions.sort((a, b) => {
                if (!a.endInscriptions || !b.endInscriptions) return 0;

                return (
                    a.endInscriptions.getTime() - b.endInscriptions.getTime()
                );
            })[0] || null;

        if (res == null) {
            return;
        }

        setCompetitionName(res.name);
        setQuantityStudents(res.maxMembers!);
        setMaxMembers(res.maxMembers!);
        setInitialRegistration(res.startInscriptions!.toLocaleDateString());
        setRegistrationEnd(res.endInscriptions!.toLocaleDateString());
        setActiveCompetition(res);
    }, [openSubCompetitions]);

    return {
        isSubCompetitionsLoading,
        activeCompetition,
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
