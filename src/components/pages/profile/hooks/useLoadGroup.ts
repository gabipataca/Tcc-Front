import { useState, useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { groupsData as initialGroups } from "./mockData";
import GroupService from "@/services/GroupService";

export interface Group {
    id: string;
    name: string;
    members: number;
    status: string;
    lastCompetition: string;
}

const useLoadGroups = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [groups, setGroups] = useState<Group[]>([]);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalGroups, setTotalGroups] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [controllerSignal, setControllerSignal] =
        useState<AbortController | null>(null);

    const itemsPerPage = 10;

    const loadGroups = useCallback(
        async (term = "") => {
            setLoadingGroups(true);
            try {
                const controller = new AbortController();
                setControllerSignal(controller);
                const res = await GroupService.GetGroups(
                    currentPage,
                    itemsPerPage,
                    term,
                    controller.signal
                );

                if (res.status != 200) {
                    throw new Error("Failed to fetch groups");
                }

                setGroups(res.data!.items as Group[]);
                setTotalPages(res.data!.totalPages);
                setTotalGroups(res.data!.totalCount);
            } catch {
                enqueueSnackbar("Falha ao carregar os grupos.", {
                    variant: "error",
                });
            } finally {
                setLoadingGroups(false);
            }
        },
        [currentPage, enqueueSnackbar]
    );

    useEffect(() => {
        loadGroups(searchTerm);
    }, [loadGroups, searchTerm]);

    const deleteGroup = async (groupId: string) => {
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
        enqueueSnackbar("Grupo deletado com sucesso!", { variant: "success" });
    };

    const updateGroup = async (group: Group) => {
        setGroups((prev) => prev.map((g) => (g.id === group.id ? group : g)));
        enqueueSnackbar("Grupo atualizado com sucesso!", {
            variant: "success",
        });
    };

    const togglePage = (page: number) => setCurrentPage(page);

    useEffect(() => {
        return () => {
            if (controllerSignal) {
                controllerSignal.abort();
            }
        };
    }, [controllerSignal]);

    return {
        groups,
        loadingGroups,
        currentPage,
        totalPages,
        totalGroups,
        searchTerm,
        setSearchTerm,
        loadGroups,
        deleteGroup,
        updateGroup,
        togglePage,
    };
};

export default useLoadGroups;
