import { FC } from "react";
import { Controller } from "react-hook-form";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/_ui/Dialog";
import Input from "@/components/_ui/Input";
import Button from "@/components/_ui/Button";
import useEditGroupDialog from "./hooks/useEditGroupDialog";
import { UseEditGroupDialogProps } from "./hooks/types";

const EditGroupDialog: FC<UseEditGroupDialogProps> = ({
    onClose,
    onConfirm,
    toggleDialog,
    isOpen,
    group,
}) => {
    const { control, error, handleClose, handleConfirm, loading } =
        useEditGroupDialog({
            onClose,
            toggleDialog,
            onConfirm,
            group,
            isOpen,
        });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white border-[#e9edee]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#3f3c40]">
                        Editar {group.name}
                    </DialogTitle>
                    <DialogDescription className="text-xl text-[#4F85A6]">
                        Altere as informações do grupo {group.name}.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Nome do grupo"
                                type="text"
                                placeholder="Digite o nome do grupo"
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="userIds"
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="IDs dos usuários"
                                type="text"
                                placeholder="Ex: 1, 2, 3"
                                onChange={(e) => {
                                    const value = e.target.value
                                        .split(",")
                                        .map((v) => v.trim())
                                        .filter((v) => v !== "");
                                    field.onChange(value);
                                }}
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        )}
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}
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

export default EditGroupDialog;
