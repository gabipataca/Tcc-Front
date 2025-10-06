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
import Button from "@/components/_ui/Button";

// Definindo as propriedades que o componente receberá
interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    itemType: string;
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
                    <Button
                        onClick={handleClose}
                        variant="outline"
                        rounded
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="destructive"
                        rounded
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;