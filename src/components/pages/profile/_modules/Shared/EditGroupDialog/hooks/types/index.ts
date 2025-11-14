import { UpdateGroupRequest } from "@/types/Group/Requests";

export interface UseEditGroupDialogProps {
    group: {
        id: number;
        name: string;
        leaderId: string;
        users: Array<{ id: string; name: string }>;
    };
    toggleDialog: () => void;
    onConfirm: (groupId: number, request: UpdateGroupRequest) => Promise<void> | void;
    onClose: () => void;
    isOpen: boolean;
}
