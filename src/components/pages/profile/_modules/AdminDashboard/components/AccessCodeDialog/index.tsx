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
import React, { useState } from "react";

const AccessCodeDialog: React.FC<AccessCodeDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    currentCode,
}) => {
    const [code, setCode] = useState(currentCode);

    const handleSave = () => {
        onSave(code);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white border-[#e9edee]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#3f3c40]">
                        Alterar Código de Acesso
                    </DialogTitle>
                    <DialogDescription className="text-xl text-[#4F85A6]">
                        Defina um novo código de acesso para os professores
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <label className="text-lg font-medium text-[#3f3c40] block mb-2">
                        Código de Acesso
                    </label>
                    <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Digite o novo código"
                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                    />
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

export default AccessCodeDialog;
