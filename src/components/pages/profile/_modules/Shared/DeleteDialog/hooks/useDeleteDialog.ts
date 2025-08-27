import { useCallback, useState } from "react";
import { UseDeleteDialogProps } from "./types";

const useDeleteDialog = ({ onDelete, onClose }: UseDeleteDialogProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOpen = () => {
        setOpen(true);
        setError(null);
    };

    const handleClose = useCallback(() => {
        setOpen(false);
        setError(null);
        onClose?.();
    }, [onClose]);

    const handleDelete = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await onDelete();
            setOpen(false);
            // @ts-expect-error : Irrelevant
        } catch (err: Error) {
            setError(err?.message || "Erro ao deletar.");
        } finally {
            setLoading(false);
        }
    }, [onDelete]);

    return {
        open,
        loading,
        error,
        handleOpen,
        handleClose,
        handleDelete,
    };
};

export default useDeleteDialog;
