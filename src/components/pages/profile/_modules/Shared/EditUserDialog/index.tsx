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

const EditUserDialog: FC<EditUserDialogProps> = ({
    onClose,
    onConfirm,
    toggleDialog,
    isOpen,
    user,
}) => {
    const { error, handleClose, handleConfirm, loading } = useEditUserDialog({
        description: "",
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
                        Editar {user.username}
                    </DialogTitle>
                    <DialogDescription className="text-xl text-[#4F85A6]">
                        Altere os dados de {item?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <label className="text-lg font-medium text-[#3f3c40] block mb-2">
                        Nome
                    </label>
                    <Input
                        name="name"
                        value={formData?.name ?? ""}
                        onChange={handleChange}
                        placeholder="Nome"
                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                    />
                    {"email" in (formData ?? {}) && (
                        <>
                            <label className="text-lg font-medium text-[#3f3c40] block mb-2">
                                E-mail
                            </label>
                            <Input
                                name="email"
                                type="email"
                                value={
                                    (formData as Student | Professor)?.email ??
                                    ""
                                }
                                onChange={handleChange}
                                placeholder="E-mail"
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        </>
                    )}
                    {"group" in (formData ?? {}) && (
                        <>
                            <label className="text-lg font-medium text-[#3f3c40] block mb-2">
                                Grupo
                            </label>
                            <Input
                                name="group"
                                value={
                                    "group" in (formData ?? {})
                                        ? (formData as any).group ?? ""
                                        : ""
                                }
                                onChange={handleChange}
                                placeholder="Grupo"
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            />
                        </>
                    )}
                    {"status" in (formData ?? {}) && (
                        <>
                            <label className="text-lg font-medium text-[#3f3c40] block mb-2">
                                Status
                            </label>
                            <Select
                                value={
                                    (formData as Student | Professor | Group)
                                        ?.status ?? ""
                                }
                                onValueChange={(value) =>
                                    handleSelectChange("status", value)
                                }
                            >
                                <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#e9edee] text-base">
                                    <SelectItem value="active">
                                        Ativo
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        Inativo
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    )}
                </div>
                <DialogFooter>
                    <ButtonAdm
                        onClick={onClose}
                        className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]"
                    >
                        Cancelar
                    </ButtonAdm>
                    <ButtonAdm
                        onClick={handleSave}
                        className="bg-[#4F85A6] hover:bg-[#3f3c40] text-white"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Salvar
                    </ButtonAdm>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
