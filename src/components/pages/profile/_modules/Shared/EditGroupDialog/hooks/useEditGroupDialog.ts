import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseEditGroupDialogProps } from "./types";

const schema = z.object({
    name: z.string().min(1, "Nome do grupo é obrigatório"),
    userIds: z
        .array(z.string())
        .nonempty("O grupo deve ter pelo menos 1 membro"),
});

const useEditGroupDialog = ({
    group,
    onClose,
    toggleDialog,
    onConfirm,
}: UseEditGroupDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { control, watch, reset } = useForm({
        defaultValues: {
            name: group.name,
            userIds: group.userIds,
        },
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        reset({
            name: group.name,
            userIds: group.userIds,
        });
    }, [group, reset]);

    const editGroupFormValues = watch();

    const handleClose = useCallback(() => {
        setError(null);
        onClose();
    }, [onClose]);

    const handleConfirm = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await onConfirm({
                name: editGroupFormValues.name,
                userIds: editGroupFormValues.userIds,
            });
        } catch (err: any) {
            setError(err?.message || "Erro ao atualizar grupo.");
        } finally {
            setLoading(false);
            toggleDialog();
        }
    }, [editGroupFormValues, onConfirm, toggleDialog]);

    return {
        loading,
        error,
        control,
        editGroupFormValues,
        handleClose,
        handleConfirm,
    };
};

export default useEditGroupDialog;
