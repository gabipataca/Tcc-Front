import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/_ui/Dialog";
import { DeleteConfirmDialogProps } from "./types";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Trash2 } from "lucide-react";

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    itemType,
}: DeleteConfirmDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white border-[#e9edee]">
            <DialogHeader>
                <DialogTitle className="text-2xl text-[#3f3c40]">
                    Confirmar Exclusão
                </DialogTitle>
                <DialogDescription className="text-xl text-[#4F85A6]">
                    Tem certeza que deseja excluir {itemType} &quot;{itemName}
                    &quot;? Esta ação não pode ser desfeita.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <ButtonAdm
                    onClick={onClose}
                    className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]"
                >
                    Cancelar
                </ButtonAdm>
                <ButtonAdm
                    onClick={onConfirm}
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                </ButtonAdm>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default DeleteConfirmDialog;