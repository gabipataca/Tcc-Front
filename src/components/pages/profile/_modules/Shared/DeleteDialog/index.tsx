"use client";

import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/_ui/Dialog";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Trash2 } from "lucide-react";
import useDeleteDialog from "./hooks/useDeleteDialog";
import Loading from "@/components/_ui/Loading";

// Definindo as propriedades que o componente receberá
interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    itemType: string; // Ex: "aluno", "professor", "grupo"
}

const DeleteDialog: FC<DeleteDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    itemType,
}) => {
    const { loading, handleClose, handleDelete } = useDeleteDialog({
        onDelete: onConfirm,
        onClose,
        toggleDialog: onClose,
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {loading && <Loading variant="overlay" size="lg" />}
            <DialogContent className="bg-white border-[#e9edee]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#3f3c40]">
                        Confirmar Exclusão
                    </DialogTitle>
                    <DialogDescription className="text-xl text-[#4F85A6]">
                        Tem certeza que deseja excluir o {itemType} &quot;{itemName}&quot;? Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <ButtonAdm
                        onClick={handleClose}
                        variant="outline"
                        className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]"
                    >
                        Cancelar
                    </ButtonAdm>
                    <ButtonAdm
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                    </ButtonAdm>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;