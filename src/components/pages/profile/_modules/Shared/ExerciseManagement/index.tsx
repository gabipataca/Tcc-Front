import type React from "react";
import {
    FileText,
    Plus,
    Filter,
    Upload,
    Edit,
    Trash2,
    Search,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/_ui/Select";
import { useExerciseManagement } from "./hooks/useExerciseManagement";
import { Textarea } from "@/components/_ui/Textarea";

const ExerciseManagement: React.FC = () => {
    const {
        title,
        setTitle,
        type,
        setType,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        editingExercise,
        addExercise,
        removeExercise,
        startEdit,
        saveEdit,
        cancelEdit,
        exerciseTypes,
        filterOptions,
        filteredExercises,
        getTypeColor,
        description,
        setDescription,
        inputValues,
        setInputValues,
        outputValues,
        setOutputValues,
        setEditingExercise,
    } = useExerciseManagement();

    return (
        <>
            <div className="flex-1">
                <div className="container mx-auto p-8 space-y-12">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-[#3f3c40] flex items-center gap-6">
                                <FileText className="h-14 w-14 text-[#4F85A6]" />
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
                                    <Select
                                        value={filter}
                                        onValueChange={setFilter}
                                    >
                                        <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6">
                                            <SelectValue placeholder="Selecione um tipo" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e9edee]">
                                            {filterOptions.map((option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option}
                                                    className="text-lg"
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-xl font-medium text-[#3f3c40] mb-4 flex items-center gap-2">
                                        <Search className="h-5 w-5 text-[#4F85A6]" />
                                        Pesquisar Exercício
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Digite o nome do exercício..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                    />
                                </div>

                                <div className="max-h-96 overflow-y-auto border border-[#e9edee] rounded-lg p-6 space-y-4">
                                    {filteredExercises.length === 0 ? (
                                        <div className="text-center py-12">
                                            <FileText className="h-16 w-16 text-[#9abbd6] mx-auto mb-4" />
                                            <p className="text-xl text-[#4F85A6]">
                                                Nenhum exercício encontrado
                                            </p>
                                            <p className="text-lg text-[#3f3c40] mt-2">
                                                {filter === "Todos"
                                                    ? "Adicione um novo exercício"
                                                    : `Nenhum exercício do tipo "${filter}"`}
                                            </p>
                                        </div>
                                    ) : (
                                        filteredExercises.map(
                                            (exercise, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-4 border-b border-[#e9edee] hover:bg-[#e9edee]/30 rounded transition-colors"
                                                >
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-medium text-[#3f3c40] mb-2">
                                                            {exercise.title}
                                                        </h4>
                                                        <Badge
                                                            className={`${getTypeColor(
                                                                exercise.type
                                                            )} text-lg px-3 py-1`}
                                                        >
                                                            {exercise.type}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex space-x-3 ml-4">
                                                        <ButtonAdm
                                                            variant="ghost"
                                                            size="sm"
                                                            className="hover:bg-[#9abbd6]/20 text-[#4F85A6] p-3"
                                                            onClick={() =>
                                                                startEdit(
                                                                    index,
                                                                    exercise
                                                                )
                                                            }
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </ButtonAdm>
                                                        <ButtonAdm
                                                            variant="ghost"
                                                            size="sm"
                                                            className="hover:bg-red-50 text-red-500 p-3"
                                                            onClick={() =>
                                                                removeExercise(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </ButtonAdm>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )}
                                </div>

                                <div className="text-center">
                                    <Badge
                                        variant="outline"
                                        className="text-lg px-4 py-2 border-[#4F85A6] text-[#4F85A6]"
                                    >
                                        Total: {filteredExercises.length}{" "}
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
                                    <Select
                                        value={type}
                                        onValueChange={setType}
                                    >
                                        <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6">
                                            <SelectValue placeholder="Selecione um tipo" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e9edee]">
                                            {exerciseTypes.map(
                                                (exerciseType) => (
                                                    <SelectItem
                                                        key={exerciseType}
                                                        value={exerciseType}
                                                        className="text-lg"
                                                    >
                                                        {exerciseType}
                                                    </SelectItem>
                                                )
                                            )}
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
                                            placeholder="Digite a descrição do exercício..."
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-lg min-h-[120px] p-4"
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
                                        onClick={addExercise}
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
            {editingExercise && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="bg-white border-[#e9edee] shadow-xl w-full max-w-2xl mx-4">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                <Edit className="h-8 w-8 text-[#4F85A6]" />
                                Editar Exercício
                            </CardTitle>
                            <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                Modifique as informações do exercício
                            </CardDescription>
                        </CardHeader>
                        {/* 🚀 APPLY THESE CHANGES HERE 🚀 */}
                        <CardContent className="space-y-6 overflow-y-auto max-h-[70vh] p-6"> {/* Add overflow-y-auto and max-h- property */}
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
                                    <SelectContent className="bg-white border-[#e9edee]">
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
                                        value={editingExercise.description || ''}
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
                                        value={editingExercise.inputValues || ''}
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
                                        value={editingExercise.outputValues || ''} // Ensure it's not undefined
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
                        </CardContent>

                        <div className="flex gap-4 p-6 border-t border-[#e9edee]"> {/* The buttons are here */}
                            <ButtonAdm
                                onClick={cancelEdit}
                                variant="outline"
                                className="flex-1 border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee] text-xl h-16"
                            >
                                Cancelar
                            </ButtonAdm>
                            <ButtonAdm
                                onClick={saveEdit}
                                className="flex-1 bg-[#4F85A6] hover:bg-[#3f3c40] text-white text-xl h-16"
                            >
                                <Edit className="w-6 h-6 mr-3" />
                                Salvar Alterações
                            </ButtonAdm>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

export default ExerciseManagement;