import { useUser } from "@/contexts/UserContext";
import GroupService from "@/services/GroupService";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface AddGroupFormValues {
    name: string;
    member2Ra?: string;
    member3Ra?: string;
}

const schema = z.object({
    name: z.string().min(3, "O nome do grupo deve ter pelo menos 3 caracteres"),
    member2Ra: z
        .string()
        .optional(),
    member3Ra: z
        .string()
        .optional(),
});

export const useAddGroup = (onClose: () => void) => {
    const { user, setUser } = useUser();

    const [controllerSignal, setControllerSignal] =
        useState<AbortController | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, setError, watch } = useForm({
        defaultValues: {
            name: "",
            member2Ra: "",
            member3Ra: "",
        },
        mode: "onBlur",
        resolver: zodResolver(schema),
    });

    const formValues = watch();

    const handleSubmitForm: SubmitHandler<AddGroupFormValues> = useCallback(
        async (data) => {
            if (!controllerSignal || user === null) {
                return;
            }

            try {
                setIsLoading(true);
                const RAsArray = [data.member2Ra, data.member3Ra]
                    .filter((ra): ra is string => typeof ra === "string" && ra.trim() !== "");

                const response = await GroupService.CreateGroup(
                    formValues.name,
                    RAsArray,
                    controllerSignal.signal
                );

                if (response.status === 201 && response.data) {
                    const groupData = response.data;
                    
                    setUser((prev) => {
                        if (!prev) return prev;
                        
                        return {
                            ...prev,
                            groupId: groupData.id,
                            group: {
                                id: groupData.id,
                                name: groupData.name,
                                users: groupData.users,
                                leaderId: groupData.leaderId,
                                groupInvitations: groupData.groupInvitations?.map(invite => ({
                                    id: invite.id,
                                    userId: invite.user?.id || "",
                                    group: invite.group || null,
                                    user: invite.user!,
                                    accepted: invite.accepted,
                                })) || [],
                            },
                        };
                    });

                    enqueueSnackbar("Grupo criado com sucesso!", {
                        variant: "success",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });

                    onClose();
                    return;
                }

                if (response.status === 400) {
                    const errorMessage = (response as any).message || "Erro ao criar o grupo. Verifique os dados informados.";
                    enqueueSnackbar(errorMessage, {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                } else {
                    enqueueSnackbar("Erro inesperado ao criar o grupo. Tente novamente.", {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                }
            } catch (error) {
                console.error("Erro ao criar grupo:", error);
                
                enqueueSnackbar("Não foi possível criar o grupo. Tente novamente mais tarde.", {
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
        [controllerSignal, formValues.name, onClose, setUser, user]
    );

    const handleSubmitError: SubmitErrorHandler<AddGroupFormValues> =
        useCallback(
            (errors) => {
                if (errors.name) {
                    setError("name", {
                        type: "manual",
                        message: errors.name.message,
                    });
                }

                console.log(errors)
            },
            [setError]
        );

    useEffect(() => {
        if (!controllerSignal) {
            const controller = new AbortController();
            setControllerSignal(controller);
        }

        return () => {
            controllerSignal?.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        handleSubmitForm,
        handleSubmitError,
        handleSubmit,
        isLoading,
        control,
    };
};

export default useAddGroup;
