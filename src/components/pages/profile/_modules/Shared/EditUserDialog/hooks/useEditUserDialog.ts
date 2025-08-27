import { useCallback, useState } from "react";
import { UseEditUserDialogProps } from "./types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    group: z.string().optional(),
    status: z.string().optional(),
});

const useEditUserDialog = ({
    user,
    onClose,
    toggleDialog,
    onConfirm,
}: UseEditUserDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            name: user.name,
            email: "email" in user ? user.email : "",
            status: "status" in user ? user.status : "",
            group: "",
        },
        resolver: zodResolver(schema),
    });

    const editUserFormValues = watch();

    const handleClose = useCallback(() => {
        toggleDialog();
        setError(null);
        onClose();
    }, [onClose, toggleDialog]);

    const handleConfirm = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await onConfirm({
                id: user.id,
                email: editUserFormValues.email,
                name: editUserFormValues.name,
                status: editUserFormValues.status ?? "",
                groupId: editUserFormValues.group,
            });

            // @ts-expect-error : Irrelevant
        } catch (err: Error) {
            setError(err?.message || "Erro ao editar usuário.");
        } finally {
            setLoading(false);
            toggleDialog();
        }
    }, [editUserFormValues.email, editUserFormValues.group, editUserFormValues.name, editUserFormValues.status, onConfirm, toggleDialog, user.id]);

    return {
        loading,
        error,
        control,
        editUserFormValues,
        handleClose,
        handleConfirm,
    };
};

export default useEditUserDialog;
