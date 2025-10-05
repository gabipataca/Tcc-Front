import { useEffect, useState } from "react";
import userLoadUsers from "./useLoadUsers";
import { GenericUserInfo } from "@/types/User";

const useStudentsTable = () => {
    const {
        users,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        loadUsers,
        deleteUser,
        updateUser,
        controllerSignal,
        setControllerSignal,
        toggleUserTypeFilter,
        userTypeFilter,
        loadingUsers,
        toggleLoadingUsers,
        togglePage,
    } = userLoadUsers();

    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        student: GenericUserInfo | null;
    }>({
        isOpen: false,
        student: null,
    });

    const handleSelectAll = (checked: boolean) => {
        setSelectedUsers(checked ? users.map((s) => s.id) : []);
    };

    const handleSelectUser = (userId: string, checked: boolean) => {
        setSelectedUsers((prev) =>
            checked
                ? [...prev, userId]
                : prev.filter((id) => id !== userId)
        );
    };

    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeoutEvent = setTimeout(() => {
            loadUsers(searchTerm, userTypeFilter);
        }, 500);

        setSearchTimeout(timeoutEvent);

        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, userTypeFilter]);

    return {
        selectedUsers,
        searchTerm,
        statusFilter,
        deleteDialog,
        users,
        loadingUsers,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        setSearchTerm,
        setStatusFilter,
        setDeleteDialog,
        handleSelectAll,
        handleSelectUser,
        togglePage,
    };
};

export default useStudentsTable;
