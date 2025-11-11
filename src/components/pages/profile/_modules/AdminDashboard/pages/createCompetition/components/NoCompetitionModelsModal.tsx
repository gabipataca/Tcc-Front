import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { AlertCircle } from "lucide-react";
import Button from "@/components/_ui/Button";

interface NoCompetitionModelsModalProps {
    onConfirm: () => void;
}

const NoCompetitionModelsModal: React.FC<NoCompetitionModelsModalProps> = ({
    onConfirm,
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white">
                <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl text-[#3f3c40]">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        Nenhum Modelo Disponível
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg text-[#4F85A6]">
                        Para criar uma competição, é necessário ter pelo menos
                        um modelo de inscrição cadastrado.
                    </p>
                    <p className="text-lg text-[#4F85A6]">
                        Você será redirecionado para a página de criação de
                        modelo de inscrição.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                    <Button
                        rounded
                        variant="primary"
                        onClick={onConfirm}
                        className="bg-[#4F85A6] hover:bg-[#3f3c40] text-white text-lg px-6 py-3"
                    >
                        Entendi, criar modelo
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NoCompetitionModelsModal;
