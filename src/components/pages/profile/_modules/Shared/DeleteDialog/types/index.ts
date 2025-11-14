import { ReactNode } from "react";

export interface DeleteDialogProps<T> {
    isOpen: boolean;
    onClose?: () => void;
    onConfirm: (updatedItem?: T) => void;
    item?: T | null;
    itemType: string;
    dialogMessage: string | ReactNode;
}
