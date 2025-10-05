"use client"

import UserService from "@/services/UserService";
import { GenericUserInfo, UserRole } from "@/types/User";
import { UserEditRequest } from "@/types/User/Requests";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

const useLoadUsers = () => {
    const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
    const [users, setUsers] = useState<GenericUserInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [userTypeFilter, setUserTypeFilter] =
        useState<UserRole | null>(null);
    const [controllerSignal, setControllerSignal] =
        useState<AbortController | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const nextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [currentPage, totalPages]);

    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentPage]);

    const togglePage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
            }
        },
        [totalPages]
    );

    const toggleUserTypeFilter = useCallback(
        (type: UserRole | null) => {
            setUserTypeFilter(type);
        },
        []
    );

    const toggleLoadingUsers = useCallback(() => {
        setLoadingUsers((prev) => !prev);
    }, []);

    const loadUsers = useCallback(
        async (searchTerm: string, userType: UserRole | null) => {
            try {
                setLoadingUsers(true);
                if (controllerSignal) {
                    controllerSignal.abort();
                    setControllerSignal(null);
                }

                const controller = new AbortController();
                setControllerSignal(controller);

                const response = await UserService.GetUsers(
                    currentPage,
                    10,
                    searchTerm,
                    controller.signal
                );

                setUsers(response.items);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error loading users:", error);
                enqueueSnackbar("Erro ao carregar usuários.", {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "bottom",
                    },
                });
            } finally {
                setLoadingUsers(false);
            }
        },
        [controllerSignal, currentPage, enqueueSnackbar]
    );


    const deleteUser = useCallback(
        async (id: string) => {
            try {
                await UserService.deleteUser(id);
                setUsers((prev) => prev.filter((user) => user.id !== id));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        [setUsers]
    );
    

    const updateUser = useCallback(
        async (user: UserEditRequest) => {
            try {
                const data = await UserService.updateUser(user.id, user);
                const usersCopy = users.filter(
                    (st) => st.id !== data.id
                );
                usersCopy.push(data);
                usersCopy.sort((a, b) => (a.id! < b.id! ? -1 : 1));
                setUsers([...usersCopy]);
                enqueueSnackbar("Usuário atualizado com sucesso!", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 2500,
                });
            } catch (error) {
                console.error("Error updating user:", error);
                enqueueSnackbar("Erro ao tentar atualizar usuário!", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 2500,
                });
            }
        },
        [enqueueSnackbar, users]
    );

    return {
        users,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        loadUsers,
        //addUser,
        deleteUser,
        updateUser,
        controllerSignal,
        setControllerSignal,
        toggleUserTypeFilter,
        userTypeFilter,
        loadingUsers,
        toggleLoadingUsers,
        togglePage,
    };
};

export default useLoadUsers;
