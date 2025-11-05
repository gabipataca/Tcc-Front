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
import React, { useEffect } from "react";
import useAccessCodeDialog from "./hooks/useAccessCodeDialog";
import Button from "@/components/_ui/Button";

interface AccessCodeDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AccessCodeDialog: React.FC<AccessCodeDialogProps> = ({
    isOpen,
    onClose,
}) => {

    const {
        token,
        isLoading,
        fetchToken,
        refreshToken,
    } = useAccessCodeDialog();

    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

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
                    <div className="flex items-center w-full gap-4">
                        <Input
                            name="teacherCode"
                            type="text"
                            value={token ?? ""}
                            readOnly
                            placeholder="Código gerado"
                            className="flex-1 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                            containerClassName="flex-1"
                            loading={isLoading}
                        />
                        <Button
                            onClick={refreshToken}
                            variant="primary"
                            rounded
                        >
                            Gerar código
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <ButtonAdm
                        className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                        onClick={onClose}
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