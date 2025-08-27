import { UserEditRequest } from "@/types/User/Requests";

export interface UseEditUserDialogProps {
    user: UserEditRequest;
    toggleDialog: () => void;
    onConfirm: (user: UserEditRequest) => Promise<void> | void;
    onClose: () => void;
}
