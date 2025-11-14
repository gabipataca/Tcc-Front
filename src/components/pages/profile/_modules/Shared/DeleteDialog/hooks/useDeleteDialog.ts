import { useCallback, useState } from "react";
import { UseDeleteDialogProps } from "./types";
import { useSnackbar } from "notistack";

const useDeleteDialog = ({ onDelete, onClose, toggleDialog }: UseDeleteDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const { enqueueSnackbar } = useSnackbar();

    const handleOpen = () => {
        setError(null);
        toggleDialog();
    };

    const handleClose = useCallback(() => {
        setError(null);
        onClose?.();
    }, [onClose]);

    const handleDelete = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setLoading(true);
            await onDelete();
            enqueueSnackbar("Deletado com sucesso!", {
                variant: "success",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            toggleDialog();
            // @ts-expect-error : Irrelevant
        } catch (err: Error) {
            setError(err?.message || "Erro ao deletar.");
            enqueueSnackbar("Erro ao deletar.", {
                variant: "error",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        } finally {
            setLoading(false);
        }
    }, [enqueueSnackbar, onDelete, toggleDialog]);

    return {
        loading,
        error,
        handleOpen,
        handleClose,
        handleDelete,
    };
};

export default useDeleteDialog;
