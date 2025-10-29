import { useUser } from "@/contexts/UserContext";
import { parseDate } from "@/libs/utils";
import useLoadCompetitions from "@/providers/CompetitionContextProvider/hooks/useLoadCompetitions";
import CompetitionService from "@/services/CompetitionService";
import { Competition } from "@/types/Competition";
import { InscribeGroupInCompetitionRequest } from "@/types/Competition/Requests";
import { useSnackbar } from "notistack";
import { useState, useEffect, useCallback, useMemo } from "react";

export const useInscriptionForm = (
    toggleMenu: (menu: "dashboard" | "inscription") => void
) => {
    const { user } = useUser();

    const { enqueueSnackbar } = useSnackbar();

    const [activeCompetition, setActiveCompetition] =
        useState<Competition | null>(null);

    const [blockedState, setBlockedState] = useState(false);

    const {
        openSubCompetitions,
        isSubCompetitionsLoading,
        loadOpenSubCompetitions,
    } = useLoadCompetitions();

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
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!isFormValid) return;
            const payload: InscribeGroupInCompetitionRequest = {
                competitionId: activeCompetition!.id,
                groupId: user!.group!.id,
            };

            try {
                const response =
                    await CompetitionService.inscribeGroupInCompetition(
                        payload
                    );

                if (response.status == 200) {
                    setIsSuccess(true);
                }

                if (response.status !== 200) {
                    enqueueSnackbar(response.data.message, {
                        variant: "warning",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        autoHideDuration: 3000,
                    });
                }
            } catch (error) {
                console.error("Error during inscription:", error);
                enqueueSnackbar("Erro ao inscrever o grupo na competição.", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 3000,
                });

                setIsSuccess(false);
            }
        },
        [isFormValid, activeCompetition, user, enqueueSnackbar]
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
        const endDate = parseDate(res.endInscriptions);
        res.endInscriptions = parseDate(res.endInscriptions);
        res.startInscriptions = parseDate(res.startInscriptions);

        const isOpen = endDate ? now < endDate : false;
        setIsInscriptionsOpen(isOpen);

        setCompetitionName(res.name);
        setMaxMembers(res.maxMembers!);
        setInitialRegistration(
            Intl.DateTimeFormat("pt-BR").format(
                res.startInscriptions || undefined
            ) || "N/A"
        );
        setRegistrationEnd(
            Intl.DateTimeFormat("pt-BR").format(endDate || undefined) || "N/A"
        );
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
