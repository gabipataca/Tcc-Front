import { UserEditRequest } from "@/types/User/Requests";

export interface EditUserDialogProps {
    user: UserEditRequest;
    isOpen: boolean;
    toggleDialog: () => void;
    onConfirm: (user: UserEditRequest) => Promise<void> | void;
    onClose: () => void;
}
