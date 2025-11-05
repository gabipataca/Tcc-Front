import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/_ui/Dialog";
import Input from "@/components/_ui/Input";
import { Edit } from "lucide-react";
import useEditUserDialog from "./hooks/useEditUserDialog";
import { FC } from "react";
import { EditUserDialogProps } from "./types";
import { Controller } from "react-hook-form";
import Button from "@/components/_ui/Button";

const EditUserDialog: FC<EditUserDialogProps> = ({
    onClose,
    onConfirm,
    toggleDialog,
    isOpen,
    user,
}) => {
    const {
        control,
        error,
        handleClose,
        handleConfirm,
        loading,
    } = useEditUserDialog({
        onClose,
        toggleDialog,
        onConfirm,
        user,
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white border-[#e9edee]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#3f3c40]">
                        Editar {user.name}
                    </DialogTitle>
                    <DialogDescription className="text-xl text-[#4F85A6]">
                        Altere os dados de {user.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Nome"
                                type="text"
                                placeholder="Nome"
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="E-mail"
                                type="email"
                                placeholder="E-mail"
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="group"
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="ID do Grupo"
                                type="number"
                                min={1}
                                label="ID do Grupo"
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        )}
                    />
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        rounded
                        disabled={loading}
                        onClick={handleClose}
                        className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="success"
                        rounded
                        disabled={loading}
                        loading={loading}
                        onClick={handleConfirm}
                        className="bg-[#4F85A6] hover:bg-[#3f3c40] text-white"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
