"use client";

import Input from "@/components/_ui/Input";
import Modal from "@/components/_ui/Modal";
import { Textarea } from "@/components/_ui/Textarea";
import { Edit } from "lucide-react";
import CustomDropdown from "@/components/_ui/Dropdown";
import { exerciseTypeOptions } from "../../constants";
import { Controller } from "react-hook-form";
import { EditExerciseModalProps } from "./types";
import useEditExerciseModal from "./hooks/useEditExerciseModal";
import { ExerciseType } from "@/types/Exercise";

const EditExerciseModal: React.FC<EditExerciseModalProps> = ({
    open,
    onClose,
    editingExercise,
    saveEdit,
    cancelEdit,
}) => {
    const {
        editExerciseControl,
        handleValidConfirm,
        handleInvalidConfirm,
        handleEditSubmit,
        handleOnInputChange,
        handleOnOutputChange,
        handleOnTitleChange,
        handleOnDescriptionChange,
        handleOnExerciseTypeChange,
    } = useEditExerciseModal(
        editingExercise,
        saveEdit,
        cancelEdit,
        onClose
    );

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
            description={<>Modifique as informações do exercício</>}
            hasConfirmButton={true}
            confirmButtonContent={
                <>
                    <Edit className="w-6 h-6 mr-3" />
                    Salvar Alterações
                </>
            }
            hasCancelButton={true}
            onConfirm={handleEditSubmit(
                handleValidConfirm,
                handleInvalidConfirm
            )}
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
                                    onChange={(e) => handleOnTitleChange(e.target.value)}
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
                            defaultValue={editingExercise.exerciseTypeId}
                            render={({ field, fieldState }) => (
                                <CustomDropdown
                                    type="normalDropdown"
                                    options={exerciseTypeOptions}
                                    errored={fieldState.error != undefined}
                                    errorMessage={
                                        fieldState.error?.message ?? ""
                                    }
                                    {...field}
                                    value={exerciseTypeOptions.find(
                                        (option) =>
                                            option.value === field.value
                                    )?.value || 1}
                                    onChange={(value) => handleOnExerciseTypeChange(value as ExerciseType)}
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
                                            fieldState.error
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        onChange={(e) => handleOnDescriptionChange(e.target.value)}
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
                                render={({ field, fieldState }) => (
                                    <Textarea
                                        placeholder="Edite os valores de entrada..."
                                        {...field}
                                        className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4 ${
                                            fieldState.error
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const cursorPos = e.target.selectionStart;

                                            const beforeCursor = value.slice(0, cursorPos);
                                            const currentLine = beforeCursor.split("\n").length - 1;

                                            const lines = value.split("\n");
                                            handleOnInputChange(lines[currentLine], currentLine);
                                        }}
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
                                render={({ field, fieldState }) => (
                                    <Textarea
                                        placeholder="Edite os valores de saída esperados..."
                                        {...field}
                                        className={`border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4 ${
                                            fieldState.error
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const cursorPos = e.target.selectionStart;

                                            const beforeCursor = value.slice(0, cursorPos);
                                            const currentLine = beforeCursor.split("\n").length - 1;

                                            const lines = value.split("\n");
                                            handleOnOutputChange(lines[currentLine], currentLine);
                                        }}
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
