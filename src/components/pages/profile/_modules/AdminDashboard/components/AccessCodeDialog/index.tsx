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
import React, { useState, useEffect } from "react";

interface AccessCodeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newCode: string) => void;
    currentCode: string;
}

const AccessCodeDialog: React.FC<AccessCodeDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    currentCode,
}) => {
    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const [code, setCode] = useState(currentCode || "");

    useEffect(() => {
        setCode(currentCode || generateRandomCode());
    }, [currentCode]);

    const handleSave = () => {
        onSave(code);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white border-[#e9edee]">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#126599]">
                        Alterar Código de Acesso
                    </DialogTitle>
                    <DialogDescription className="text-xl text-[#4F85A6]">
                        Defina um novo código de acesso para os professores
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <label className="text-lg font-medium text-[#126396] block mb-2">
                        Código de Acesso
                    </label>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                        <Input
                            value={code}
                            readOnly
                            placeholder="Código gerado"
                            className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                        />
                        <ButtonAdm
                            onClick={() => setCode(generateRandomCode())}
                            className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                        >
                            Gerar código
                        </ButtonAdm>
                    </div>
                </div>

                <DialogFooter>
                    <ButtonAdm
                        onClick={handleSave}
                        className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Confirmar
                    </ButtonAdm>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AccessCodeDialog;