import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import Label from "@/components/_ui/Label";
import { User } from "@/types/User";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import useEditStudentInfoModal from "./hooks/useEditStudentInfoModal";
import { Controller } from "react-hook-form";
import Button from "@/components/_ui/Button";

// --- Modal para Editar Informações do Aluno ---
const EditStudentInfoModal = ({
    onClose,
    currentUser,
}: {
    onClose: () => void;
    currentUser: User;
}) => {
    const {
        control,
        handleSubmit,
        isLoading,
    } = useEditStudentInfoModal(currentUser, onClose);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Edit /> Editar Informações
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="studentName">Nome Completo</Label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        id="studentName"
                                        required
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="studentJoinYear">
                                Ano de Ingresso
                            </Label>
                            <Controller
                                name="joinYear"
                                control={control}
                                render={({ field }) => (
                                    // @ts-expect-error : Irrelevant
                                    <Input
                                        type="number"
                                        id="studentJoinYear"
                                        required
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail Institucional</Label>
                            <p className="text-sm cursor-default select-none text-slate-500 bg-slate-100 p-2 rounded-md">
                                {currentUser?.email} (não editável)
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Registro Acadêmico (RA)</Label>
                            <p className="text-sm cursor-default select-none text-slate-500 bg-slate-100 p-2 rounded-md">
                                {currentUser?.ra} (não editável)
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                        >
                            Salvar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default EditStudentInfoModal;