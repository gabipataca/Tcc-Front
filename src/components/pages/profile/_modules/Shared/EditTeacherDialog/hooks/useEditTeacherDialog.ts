import { useCallback, useState } from "react";
import { UseEditTeacherDialogProps } from "./types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
});

const useEditTeacherDialog = ({
    user,
    onClose,
    toggleDialog,
    onConfirm,
}: UseEditTeacherDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const { control, setValue, watch } = useForm({
        defaultValues: {
            name: user.name,
            email: "email" in user ? user.email : "",
        },
        resolver: zodResolver(schema),
    });

    const editUserFormValues = watch();

    const handleClose = useCallback(() => {
        setError(null);
        onClose();
    }, [onClose]);

    const handleConfirm = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setLoading(true);
            await onConfirm({
                id: user.id,
                email: editUserFormValues.email,
                name: editUserFormValues.name,
                status: 1,
                groupId: undefined
            });
            enqueueSnackbar("Usuário editado com sucesso!", {
                variant: "success",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            // @ts-expect-error : Irrelevant
        } catch (err: Error) {
            setError(err?.message || "Erro ao editar usuário.");
            enqueueSnackbar("Erro ao editar usuário.", {
                variant: "error",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        } finally {
            setLoading(false);
            toggleDialog();
        }
    }, [
        editUserFormValues.email,
        editUserFormValues.name,
        enqueueSnackbar,
        onConfirm,
        toggleDialog,
        user.id,
    ]);

    return {
        loading,
        error,
        control,
        editUserFormValues,
        handleClose,
        handleConfirm,
    };
};

export default useEditTeacherDialog;
