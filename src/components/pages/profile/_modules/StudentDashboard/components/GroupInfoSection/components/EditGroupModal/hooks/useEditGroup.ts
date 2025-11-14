import { useUser } from "@/contexts/UserContext";
import GroupService from "@/services/GroupService";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

const useEditGroup = (onClose: () => void) => {
    const { user, setUser } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const [groupName, setGroupName] = useState(user!.group!.name);
    const [membersToRemove, setMembersToRemove] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleRemove = (userId: string) => {
        setMembersToRemove((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);

            try {
                const response = await GroupService.UpdateGroup(user!.group!.id, {
                    name: groupName,
                    membersToRemove: membersToRemove,
                });

                if(response.status == 403) {
                    enqueueSnackbar("Apenas o líder do grupo pode editar o grupo.", {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                    setIsLoading(false);
                    return;
                }

                if (response.status == 200 && membersToRemove.includes(user!.id)) {
                    setUser((prev) => ({ ...prev!, group: null }));
                    enqueueSnackbar("Você saiu do grupo.", {
                        variant: "info",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                } else {
                    setUser((prev) => ({
                        ...prev!,
                        group: {
                            ...prev!.group!,
                            name: groupName,
                            users: prev!.group!.users.filter(
                                (u) => !membersToRemove.includes(u.id)
                            ),
                        },
                    }));
                    enqueueSnackbar("Grupo atualizado com sucesso!", {
                        variant: "success",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                }

                onClose();
            } catch (error) {
                console.error("Erro ao editar grupo:", error);
                enqueueSnackbar("Não foi possível atualizar o grupo.", {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                });
            } finally {
                setIsLoading(false);
            }
        },
        [enqueueSnackbar, groupName, membersToRemove, onClose, setUser, user]
    );

    return {
        groupName,
        setGroupName,
        membersToRemove,
        isLoading,
        handleToggleRemove,
        handleSubmit,
    };
};


export default useEditGroup;