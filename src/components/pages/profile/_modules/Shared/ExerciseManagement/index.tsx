import type React from "react";
import { useRef } from "react";
import {
    FileText,
    Plus,
    Filter,
    Edit,
    Trash2,
    Search,
    Upload,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Badge } from "@/components/_ui/Badge";
import { useExerciseManagement } from "./hooks/useExerciseManagement";
import EditExerciseModal from "./components/EditExerciseModal";
import { exerciseTypeOptions } from "./constants";
import CustomDropdown from "@/components/_ui/Dropdown";
import { ExerciseType } from "@/types/Exercise";
import { Textarea } from "@/components/_ui/Textarea";

import { useMemo } from "react";
import Loading from "@/components/_ui/Loading";

const ExerciseManagement: React.FC = () => {
    const {
        title,
        setTitle,
        type,
        setType,
        exerciseTypeFilter,
        toggleExerciseTypeFilter,
        searchTerm,
        setSearchTerm,
        showEditExerciseModal,
        toggleEditExerciseModal,
        editingExercise,
        handleCreateExercise,
        handleRemoveExercise,
        startEdit,
        saveEdit,
        cancelEdit,
        exercises,
        getTypeColor,
        inputValues,
        setInputValues,
        outputValues,
        setOutputValues,
        pdfFile,
        handleFileChange,
        loadingExercises,
    } = useExerciseManagement();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const exerciseTypeLabel = useMemo(() => {
        return (
            exerciseTypeOptions.find(
                (option) => option.value === exerciseTypeFilter
            )?.label ?? "Todos"
        );
    }, [exerciseTypeFilter]);

    return (
        <>
            <div className="flex-1">
                <div className="container mx-auto p-8 space-y-12">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-[#3f3c40] flex items-center gap-6">
                                <FileText className="h-16 w-auto text-[#4F85A6]" />
                                Gerenciar Exercícios
                            </h1>
                            <p className="text-2xl text-[#4F85A6] mt-4">
                                Crie e gerencie exercícios para as competições
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Exercise List */}
                        <Card className="bg-white border-[#e9edee] shadow-sm">
                            <CardHeader className="pb-8">
                                <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                    <FileText className="h-8 w-8 text-[#4F85A6]" />
                                    Lista de Exercícios
                                </CardTitle>
                                <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                    Visualize e gerencie todos os exercícios
                                    cadastrados
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div>
                                    <label className="text-xl font-medium text-[#3f3c40] mb-4 flex items-center gap-2">
                                        <Filter className="h-5 w-5 text-[#4F85A6]" />
                                        Filtrar por Tipo
                                    </label>
                                    <CustomDropdown
                                        options={[{ label: "Todos", value: null }, ...exerciseTypeOptions]}
                                        value={
                                            [{ label: "Todos", value: null }, ...exerciseTypeOptions].find(
                                                (option) =>
                                                    option.value ===
                                                    exerciseTypeFilter
                                            )?.value ?? null
                                        }
                                        onChange={(val: ExerciseType) =>
                                            toggleExerciseTypeFilter(
                                                [{ label: "Todos", value: null }, ...exerciseTypeOptions].find(
                                                    (option) =>
                                                        option.value === val
                                                )?.value ?? null
                                            )
                                        }
                                        type="normalDropdown"
                                    />
                                </div>
                                <div>
                                    <label className="text-xl font-medium text-[#3f3c40] mb-4 flex items-center gap-2">
                                        <Search className="h-5 w-5 text-[#4F85A6]" />
                                        Pesquisar Exercício
                                    </label>
                                    <Input
                                        name="search"
                                        type="text"
                                        placeholder="Digite o nome do exercício..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                    />
                                </div>

                                <div className="max-h-96 min-h-32 overflow-y-auto border border-[#e9edee] rounded-lg p-6 space-y-4 relative">
                                    {exercises.length === 0 &&
                                        !loadingExercises && (
                                            <div className="text-center py-12">
                                                <FileText className="h-16 w-16 text-[#9abbd6] mx-auto mb-4" />
                                                <p className="text-xl text-[#4F85A6]">
                                                    Nenhum exercício encontrado
                                                </p>
                                                <p className="text-lg text-[#3f3c40] mt-2">
                                                    {exerciseTypeFilter === null
                                                        ? "Adicione um novo exercício"
                                                        : `Nenhum exercício do tipo "${exerciseTypeLabel}" encontrado.`}
                                                </p>
                                            </div>
                                        )}
                                    {!loadingExercises &&
                                        exercises.length > 0 &&
                                        exercises.map((exercise, index) => (
                                            <div
                                                key={`${exercise.id}-${index}`}
                                                className="flex justify-between items-center p-4 border-b border-[#e9edee] hover:bg-[#e9edee]/30 rounded transition-colors"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-medium text-[#3f3c40] mb-2">
                                                        {exercise.title}
                                                    </h4>
                                                    <Badge
                                                        className={`${getTypeColor(
                                                            exercise.exerciseTypeId
                                                        )} text-lg px-3 py-1`}
                                                    >
                                                        {exerciseTypeOptions.find(
                                                            (option) =>
                                                                option.value ===
                                                                exercise.exerciseTypeId
                                                        )?.label ?? ""}
                                                    </Badge>
                                                </div>
                                                <div className="flex space-x-3 ml-4">
                                                    <ButtonAdm
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:bg-[#9abbd6]/20 text-[#4F85A6] p-3"
                                                        onClick={() =>
                                                            startEdit(exercise)
                                                        }
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </ButtonAdm>
                                                    <ButtonAdm
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:bg-red-50 text-red-500 p-3"
                                                        onClick={() =>
                                                            handleRemoveExercise(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </ButtonAdm>
                                                </div>
                                            </div>
                                        ))}

                                    {loadingExercises && (
                                        <Loading variant="spinner" size="md" />
                                    )}
                                </div>

                                <div className="text-center">
                                    <Badge
                                        variant="outline"
                                        className="text-lg px-4 py-2 border-[#4F85A6] text-[#4F85A6]"
                                    >
                                        Total: {exercises.length}
                                        exercício(s)
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Exercise Form */}
                        <Card className="bg-white border-[#e9edee] shadow-sm">
                            <CardHeader className="pb-8">
                                <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                    <Plus className="h-8 w-8 text-[#4F85A6]" />
                                    Criar Novo Exercício
                                </CardTitle>
                                <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                    Adicione um novo exercício ao sistema
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div>
                                    <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                                        Título do Exercício
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Digite o título do exercício"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                                        Tipo do Exercício
                                    </label>
                                    <CustomDropdown
                                        options={exerciseTypeOptions}
                                        value={type}
                                        onChange={(value: ExerciseType) =>
                                            setType(value)
                                        }
                                        type="normalDropdown"
                                    />
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-xl font-medium text-[#3f3c40]">
                                        Conteúdo do Exercício
                                    </h4>
                                    <div className="space-y-3">
                                        <label className="block text-lg font-medium text-[#3f3c40]">
                                            Anexo (PDF):
                                        </label>

                                        <ButtonAdm
                                            variant="outline"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="w-full border-[#4F85A6] text-[#4F85A6] hover:bg-[#4F85A6]/10 text-lg h-16 flex items-center justify-center"
                                        >
                                            <Upload className="w-5 h-5 mr-3" />

                                            {pdfFile
                                                ? pdfFile.name
                                                : "Selecionar Arquivo PDF"}
                                        </ButtonAdm>

                                        <input
                                            type="file"
                                            accept=".pdf"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-lg font-medium text-[#3f3c40]">
                                            Valores de entrada:
                                        </label>
                                        <Textarea
                                            placeholder="Digite os valores de entrada (separados por linha, vírgula, etc.)"
                                            value={inputValues}
                                            onChange={(e) =>
                                                setInputValues(e.target.value)
                                            }
                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-lg font-medium text-[#3f3c40]">
                                            Valores de saída:
                                        </label>
                                        <Textarea
                                            placeholder="Digite os valores de saída esperados (separados por linha, vírgula, etc.)"
                                            value={outputValues}
                                            onChange={(e) =>
                                                setOutputValues(e.target.value)
                                            }
                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#e9edee]">
                                    <ButtonAdm
                                        onClick={handleCreateExercise}
                                        disabled={!title.trim()}
                                        className="w-full bg-[#4F85A6] hover:bg-[#3f3c40] text-white disabled:opacity-50 disabled:cursor-not-allowed text-xl h-16"
                                    >
                                        <Plus className="w-6 h-6 mr-3" />
                                        Criar Exercício
                                    </ButtonAdm>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {showEditExerciseModal && editingExercise && (
                <EditExerciseModal
                    open={showEditExerciseModal}
                    onClose={toggleEditExerciseModal}
                    cancelEdit={cancelEdit}
                    saveEdit={saveEdit}
                    editingExercise={editingExercise}
                />
            )}
        </>
    );
};

export default ExerciseManagement;
