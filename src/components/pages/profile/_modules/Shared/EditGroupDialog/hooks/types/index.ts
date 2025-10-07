import { UpdateGroupRequest } from "@/types/Group/Requests";

export interface UseEditGroupDialogProps {
    group: {
        id: number;
        name: string;
        userIds: string[];
    };
    toggleDialog: () => void;
    onConfirm: (group: UpdateGroupRequest) => Promise<void> | void;
    onClose: () => void;
    isOpen: boolean;
}
