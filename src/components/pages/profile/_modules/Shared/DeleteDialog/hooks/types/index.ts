export interface UseDeleteDialogProps {
    onDelete: () => Promise<void> | void;
    onClose?: () => void;
}
