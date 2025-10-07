"use client";

import { useEffect, useState, useCallback } from "react";
import useLoadGroups from "@/components/pages/profile/hooks/useLoadGroup";
import { useSnackbar } from "notistack";
import { Group } from "@/types/Group";

export default function useGroupsTable() {
    const { enqueueSnackbar } = useSnackbar();
    const {
        groups,
        loadingGroups,
        currentPage,
        totalPages,
        loadGroups,
        deleteGroup,
        updateGroup,
        togglePage,
    } = useLoadGroups();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    // Estado do diálogo de exclusão, modelado como um objeto
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        group: Group | null;
        action: ((id: string) => Promise<void>) | null;
    }>({
        isOpen: false,
        group: null,
        action: null,
    });

    // Estado do diálogo de edição, modelado como um objeto
    const [editDialog, setEditDialog] = useState<{
        isOpen: boolean;
        group: Group | null;
        action: ((group: Group) => Promise<void>) | null;
    }>({
        isOpen: false,
        group: null,
        action: null,
    });

    useEffect(() => {
        loadGroups(searchTerm, statusFilter);
    }, [currentPage, searchTerm, statusFilter, loadGroups]);

    // Funções para fechar os diálogos e resetar seu estado
    const toggleDeleteDialog = () => {
        setDeleteDialog({
            isOpen: !deleteDialog.isOpen,
            group: null,
            action: null,
        });
    };

    const toggleEditDialog = () => {
        setEditDialog({
            isOpen: !editDialog.isOpen,
            group: null,
            action: null,
        });
    };

    const handleSelectGroup = useCallback(
        (groupId: string, checked: boolean) => {
            setSelectedGroups((prev) =>
                checked
                    ? [...prev, groupId]
                    : prev.filter((id) => id !== groupId)
            );
        },
        []
    );

    const handleSelectAll = useCallback(
        (checked: boolean) => {
            if (checked) {
                const allIds = groups.map((g) => g.id.toString());
                setSelectedGroups(allIds);
            } else {
                setSelectedGroups([]);
            }
        },
        [groups]
    );

    const handleDeleteGroups = useCallback(async () => {
        if (selectedGroups.length === 0) return;
        try {
            for (const id of selectedGroups) {
                await deleteGroup(id);
            }
            enqueueSnackbar("Grupos excluídos com sucesso!", {
                variant: "success",
            });
            setSelectedGroups([]);
            await loadGroups(searchTerm, statusFilter);
        } catch (error) {
            enqueueSnackbar("Falha ao excluir grupos selecionados.", {
                variant: "error",
            });
        }
    }, [
        selectedGroups,
        deleteGroup,
        enqueueSnackbar,
        loadGroups,
        searchTerm,
        statusFilter,
    ]);

    // Prepara o diálogo de exclusão sem executar a ação ainda
    const handleDeleteGroupClick = useCallback(
        (group: Group) => {
            const action = async (id: string) => {
                try {
                    await deleteGroup(id);
                    enqueueSnackbar("Grupo excluído com sucesso!", {
                        variant: "success",
                    });
                    toggleDeleteDialog();
                    await loadGroups(searchTerm, statusFilter);
                } catch (error) {
                    enqueueSnackbar("Falha ao excluir o grupo.", {
                        variant: "error",
                    });
                }
            };
            setDeleteDialog({ isOpen: true, group, action });
        },
        [deleteGroup, enqueueSnackbar, loadGroups, searchTerm, statusFilter]
    );

    // Prepara o diálogo de edição sem executar a ação ainda
    const handleSelectGroupToEdit = useCallback(
        (group: Group) => {
            const action = async (updatedGroupData: Group) => {
                try {
                    await updateGroup(updatedGroupData);
                    enqueueSnackbar("Grupo atualizado com sucesso!", {
                        variant: "success",
                    });
                    toggleEditDialog();
                    await loadGroups(searchTerm, statusFilter);
                } catch (error) {
                    enqueueSnackbar("Falha ao atualizar o grupo.", {
                        variant: "error",
                    });
                }
            };
            setEditDialog({ isOpen: true, group, action });
        },
        [updateGroup, enqueueSnackbar, loadGroups, searchTerm, statusFilter]
    );

    const allGroupsSelected =
        groups.length > 0 && selectedGroups.length === groups.length;
    const totalGroups = groups.length;

    return {
        groups,
        loadingGroups,
        currentPage,
        totalPages,
        totalGroups,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        selectedGroups,
        allGroupsSelected,
        deleteDialog: {
            ...deleteDialog,
            toggleDialog: toggleDeleteDialog,
        },
        editDialog: {
            ...editDialog,
            toggleDialog: toggleEditDialog,
        },
        togglePage,
        handleSelectAll,
        handleSelectGroup,
        handleDeleteGroups,
        handleDeleteGroupClick,
        handleSelectGroupToEdit,
    };
}
