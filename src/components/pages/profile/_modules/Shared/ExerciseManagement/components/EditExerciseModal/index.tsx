"use client"

import Input from "@/components/_ui/Input";
import Modal from "@/components/_ui/Modal";
import { Textarea } from "@/components/_ui/Textarea";
import { Edit } from "lucide-react";
import CustomDropdown from "@/components/_ui/Dropdown";
import { exerciseTypeOptions } from "../../constants";
import { Controller } from "react-hook-form";
import { EditExerciseModalProps } from "./types";



const EditExerciseModal: React.FC<EditExerciseModalProps> = ({
    open,
    onClose,
    editingExercise,
    saveEdit,
    cancelEdit,
    editExerciseControl,
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
                        <Controller
                            control={editExerciseControl}
                            name="title"
                            defaultValue={editingExercise.title || ""}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="text"
                                    {...field}
                                    className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6 ${
                                        fieldState.error ? "border-red-500" : ""
                                    }`}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                            Título do Exercício
                        </label>
                        <Controller
                            control={editExerciseControl}
                            name="title"
                            defaultValue={editingExercise.title || ""}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="text"
                                    {...field}
                                    className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6 ${
                                        fieldState.error ? "border-red-500" : ""
                                    }`}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                            Tipo do Exercício
                        </label>
                        <Controller
                            control={editExerciseControl}
                            name="exerciseType"
                            defaultValue={1}
                            render={({ field, fieldState }) => (
                                <CustomDropdown
                                    type="selectDropdown"
                                    options={exerciseTypeOptions}
                                    errored={fieldState.error != undefined}
                                    errorMessage={fieldState.error?.message ?? ""}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-xl font-medium text-[#3f3c40]">
                            Conteúdo do Exercício
                        </h4>

                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-[#3f3c40]">
                                Descrição:
                            </label>
                            <Controller
                                control={editExerciseControl}
                                name="description"
                                defaultValue={editingExercise.description || ""}
                                render={({ field, fieldState }) => (
                                    <Textarea
                                        placeholder="Edite a descrição do exercício..."
                                        {...field}
                                        className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4 ${
                                            fieldState.error ? "border-red-500" : ""
                                        }`}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-[#3f3c40]">
                                Valores de entrada:
                            </label>
                            <Controller
                                control={editExerciseControl}
                                name="inputs"
                                defaultValue={editingExercise.inputValues || ""}
                                render={({ field, fieldState }) => (
                                    <Textarea
                                        placeholder="Edite os valores de entrada..."
                                        {...field}
                                        className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4 ${
                                            fieldState.error ? "border-red-500" : ""
                                        }`}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-[#3f3c40]">
                                Valores de saída:
                            </label>

                            <Controller
                                control={editExerciseControl}
                                name="outputs"
                                defaultValue={editingExercise.outputValues || ""}
                                render={({ field, fieldState }) => (
                                    <Textarea
                                        placeholder="Edite os valores de saída esperados..."
                                        {...field}
                                        className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4 ${
                                            fieldState.error ? "border-red-500" : ""
                                        }`}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </>
            }
        />
    );
};

export default EditExerciseModal;
