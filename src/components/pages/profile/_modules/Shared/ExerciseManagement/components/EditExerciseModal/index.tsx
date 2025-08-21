"use client"

import Input from "@/components/_ui/Input";
import Modal from "@/components/_ui/Modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/_ui/Select";
import { Textarea } from "@/components/_ui/Textarea";
import { EditingExercise } from "../../hooks/useExerciseManagement";
import { Edit } from "lucide-react";

interface EditExerciseModalProps {
    open: boolean;
    onClose: () => void;
    exerciseTypes: string[];
    editingExercise: EditingExercise;
    setEditingExercise: (data: EditingExercise) => void;
    saveEdit: () => void;
    cancelEdit: () => void;
}

const EditExerciseModal: React.FC<EditExerciseModalProps> = ({
    open,
    onClose,
    exerciseTypes,
    editingExercise,
    setEditingExercise,
    saveEdit,
    cancelEdit,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                <>
                    <Edit className="h-8 w-8 text-[#4F85A6]" />
                    Editar Exercício
                </>
            }
            growFooterButtons={true}
            description={
                <>
                    Modifique as informações do exercício
                </>
            }
            hasConfirmButton={true}
            confirmButtonContent={
                <>
                    <Edit className="w-6 h-6 mr-3" />
                    Salvar Alterações
                </>
            }
            hasCancelButton={true}
            onConfirm={saveEdit}
            onCancel={cancelEdit}
            bodyContent={
                <>
                    <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                            Título do Exercício
                        </label>
                        <Input
                            type="text"
                            value={editingExercise.title}
                            onChange={(e) =>
                                setEditingExercise({
                                    ...editingExercise,
                                    title: e.target.value,
                                })
                            }
                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                            Tipo do Exercício
                        </label>
                        <Select
                            value={editingExercise.type}
                            onValueChange={(value) =>
                                setEditingExercise({
                                    ...editingExercise,
                                    type: value,
                                })
                            }
                        >
                            <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-[#e9edee] z-50" position="item-aligned">
                                {exerciseTypes.map((exerciseType) => (
                                    <SelectItem
                                        key={exerciseType}
                                        value={exerciseType}
                                        className="text-lg"
                                    >
                                        {exerciseType}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xl font-medium text-[#3f3c40]">
                            Conteúdo do Exercício
                        </h4>

                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-[#3f3c40]">
                                Descrição:
                            </label>
                            <Textarea
                                placeholder="Edite a descrição do exercício..."
                                value={editingExercise.description || ""}
                                onChange={(e) =>
                                    setEditingExercise({
                                        ...editingExercise,
                                        description: e.target.value,
                                    })
                                }
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-[#3f3c40]">
                                Valores de entrada:
                            </label>
                            <Textarea
                                placeholder="Edite os valores de entrada..."
                                value={editingExercise.inputValues || ""}
                                onChange={(e) =>
                                    setEditingExercise({
                                        ...editingExercise,
                                        inputValues: e.target.value,
                                    })
                                }
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-[#3f3c40]">
                                Valores de saída:
                            </label>
                            <Textarea
                                placeholder="Edite os valores de saída esperados..."
                                value={editingExercise.outputValues || ""} // Ensure it's not undefined
                                onChange={(e) =>
                                    setEditingExercise({
                                        ...editingExercise,
                                        outputValues: e.target.value,
                                    })
                                }
                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4"
                            />
                        </div>
                    </div>
                </>
            }
        />
    );
};

export default EditExerciseModal;
