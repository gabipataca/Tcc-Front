import { useUser } from "@/contexts/UserContext";
import { parseDate } from "@/libs/utils";
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

    console.log(openSubCompetitions);

    const [groupExists] = useState(!!user?.group);
    const [initialMembers] = useState<string[] | null>(
        user?.group?.users.map((u) => u.name) || null
    );

    const [competitionName, setCompetitionName] = useState("");
    const [quantityStudents, setQuantityStudents] = useState(
        initialMembers?.length || 0
    );
    const [members, setMembers] = useState<string[] | null>(initialMembers);
    const [initialRegistration, setInitialRegistration] = useState("");
    const [registrationEnd, setRegistrationEnd] = useState("");
    const [maxMembers, setMaxMembers] = useState(3);
    const [groupName, setGroupName] = useState(user?.group?.name || null);
    const [groupSizeError, setGroupSizeError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInscriptionsOpen, setIsInscriptionsOpen] = useState(true);

    const isFormValid = useMemo(() => {
        return groupExists && !groupSizeError && isInscriptionsOpen;
    }, [groupExists, groupSizeError, isInscriptionsOpen]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!isFormValid) return;

            const dataInscricao = {
                groupName,
                members,
                competitionName,
            };
            console.log("Form submitted:", dataInscricao);

            setIsSuccess(true);
        },
        [groupName, members, competitionName, isFormValid]
    );

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
            setIsInscriptionsOpen(false);
            return;
        }

        const now = new Date();
        const endDate = new Date(parseDate(res.endInscriptions));
        res.endInscriptions = new Date(parseDate(res.endInscriptions));
        res.startInscriptions = new Date(parseDate(res.startInscriptions))

        const isOpen = endDate ? now < endDate : false;
        setIsInscriptionsOpen(isOpen);

        setCompetitionName(res.name);
        setMaxMembers(res.maxMembers!);
        setInitialRegistration(
            res.startInscriptions?.toLocaleDateString() || "N/A"
        );
        setRegistrationEnd(endDate?.toLocaleDateString() || "N/A");
        setActiveCompetition(res);

        if (initialMembers) {
            if (res.maxMembers! < initialMembers.length) {
                setGroupSizeError(true);
            } else {
                setGroupSizeError(false);
            }
            setQuantityStudents(initialMembers.length);
            setMembers(initialMembers);
        } else {
            setGroupSizeError(false);
            setQuantityStudents(0);
            setMembers([]);
        }
    }, [openSubCompetitions, initialMembers]);

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
        handleSubmit,
        isFormValid,
        groupExists,
        groupSizeError,
        isSuccess,
        setIsSuccess,
        isInscriptionsOpen,
    };
};
