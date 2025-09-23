
"use client";

import type React from "react";
import { Clock, Trophy, FileText, Settings, CheckCircle } from "lucide-react";
import SideMenu from "@/components/_ui/SideMenu";
import Navbar from "@/components/_ui/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Badge } from "@/components/_ui/Badge";
import { Checkbox } from "@/components/_ui/Checkbox";
import { Controller } from "react-hook-form";
import useCreateCompetition from "./hooks/useCreateCompetition";
import { ChangeEvent } from "react";
import Loading from "@/components/_ui/Loading";

const CreateCompetition: React.FC = () => {
    const {
        control,
        handleSubmit,
        onSubmit,
        errors,
        exerciseCount,
        selectedExercises,
        toggleExercise,
        isExerciseSelectionValid,
        isFormValid,
        isSubmitting,
        search,
        setSearch,
        exercises,
        formValues,
        currentPage,
    } = useCreateCompetition();

    return (
        <>

            <div className="flex">
                {(isSubmitting) && (
                    <Loading size="lg" variant="overlay" />
                )}
                
                <div className="flex-1">
                    <div className="container mx-auto p-8 space-y-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-5xl font-bold text-[#3f3c40] flex items-center gap-6">
                                    <Trophy className="h-16 w-16 text-[#4F85A6]" />
                                    Criar Maratona
                                </h1>
                                <p className="text-2xl text-[#4F85A6] mt-4">Configure uma nova competição de programação</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-12">
                                <Card className="bg-white border-[#e9edee] shadow-sm">
                                    <CardHeader className="pb-8">
                                        <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                            <FileText className="h-8 w-8 text-[#4F85A6]" />
                                            Informações Básicas
                                        </CardTitle>
                                        <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                            Configure os dados principais da maratona
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div>
                                            <label className="block text-xl font-medium text-[#3f3c40] mb-4">Nome da Maratona</label>
                                            <Controller
                                                name="competitionName"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        type="text"
                                                        placeholder="Ex: XII Olimpíada de Raciocínio Lógico"
                                                        {...field}
                                                        className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                    />
                                                )}
                                            />
                                            {errors.competitionName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.competitionName.message}</p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">Data de Início</label>
                                                <Controller
                                                    name="startDate"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            error={errors.startDate}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                
                                            </div>
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">Hora de Início</label>
                                                <Controller
                                                    name="startTime"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="time"
                                                            {...field}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.startTime && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-[#e9edee] shadow-sm">
                                    <CardHeader className="pb-8">
                                        <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                            <Clock className="h-8 w-8 text-[#4F85A6]" />
                                            Configurações de Tempo
                                        </CardTitle>
                                        <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                            Defina os tempos da competição em minutos
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                                                    Duração da Maratona (min)
                                                </label>
                                                <Controller
                                                    name="duration"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            placeholder="Ex: 90"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value)}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.duration && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                                                    Parar de Responder (min)
                                                </label>
                                                <Controller
                                                    name="stopAnswering"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            placeholder="Ex: 85"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.stopAnswering && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.stopAnswering.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">Parar Placar (min)</label>
                                                <Controller
                                                    name="stopScoreboard"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            placeholder="Ex: 80"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.stopScoreboard && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.stopScoreboard.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">Penalidade (min)</label>
                                                <Controller
                                                    name="penalty"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            placeholder="Ex: 30"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.penalty && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.penalty.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-[#e9edee] shadow-sm">
                                    <CardHeader className="pb-8">
                                        <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                            <Settings className="h-8 w-8 text-[#4F85A6]" />
                                            Configurações do Sistema
                                        </CardTitle>
                                        <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                            Configurações técnicas da competição
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                                                    Quantidade de Exercícios (2-15)
                                                </label>
                                                <Controller
                                                    name="exerciseCount"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            min={2}
                                                            max={15}
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.exerciseCount && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.exerciseCount.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xl font-medium text-[#3f3c40] mb-4">
                                                    Tamanho Máximo do Arquivo (KB)
                                                </label>
                                                <Controller
                                                    name="maxFileSize"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            placeholder="Ex: 100"
                                                            {...field}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                                        />
                                                    )}
                                                />
                                                {errors.maxFileSize && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.maxFileSize.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-[#e9edee] shadow-sm">
                                    <CardHeader className="pb-8">
                                        <CardTitle className="text-3xl text-[#3f3c40] flex items-center gap-4">
                                            <CheckCircle className="h-8 w-8 text-[#4F85A6]" />
                                            Seleção de Exercícios
                                        </CardTitle>
                                        <CardDescription className="text-xl text-[#4F85A6] mt-2">
                                            Escolha {exerciseCount} exercícios para a competição
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div>
                                            <label className="block text-xl font-medium text-[#3f3c40] mb-4">Filtrar por Título</label>
                                            <Input
                                                type="text"
                                                placeholder="Digite o título do exercício"
                                                value={search}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-xl h-16 px-6"
                                            />
                                        </div>

                                        <div className="max-h-96 overflow-y-auto border border-[#e9edee] rounded-lg p-8 space-y-6">
                                            {exercises.map((exercise) => (
                                                <div key={exercise.id} className="flex items-center space-x-6 p-4 hover:bg-[#e9edee]/50 rounded">
                                                    <Checkbox
                                                        checked={selectedExercises.includes(exercise.id)}
                                                        onCheckedChange={() => toggleExercise(exercise.id)}
                                                        className="border-[#4F85A6] data-[state=checked]:bg-[#4F85A6] w-6 h-6"
                                                    />
                                                    <label className="text-xl text-[#3f3c40] cursor-pointer flex-1">{exercise.title}</label>
                                                </div>
                                            ))}
                                        </div>

                                        {!isExerciseSelectionValid && (
                                            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                                                <p className="text-xl text-red-600">
                                                    Você deve selecionar exatamente {exerciseCount} exercícios. Atualmente selecionados:
                                                    <span className="font-bold">{selectedExercises.length}</span>
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-12">
                                <Card className="bg-white border-[#e9edee] shadow-sm sticky top-6">
                                    <CardHeader className="pb-8">
                                        <CardTitle className="text-2xl text-[#3f3c40]">Resumo da Configuração</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg text-[#4F85A6]">Nome:</span>
                                                <span className="text-lg text-[#3f3c40] font-medium">
                                                    {formValues.competitionName || "Não definido"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-lg text-[#4F85A6]">Data:</span>
                                                <span className="text-lg text-[#3f3c40] font-medium">
                                                    {formValues.startDate || "Não definida"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-lg text-[#4F85A6]">Hora:</span>
                                                <span className="text-lg text-[#3f3c40] font-medium">
                                                    {formValues.startTime || "Não definida"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-lg text-[#4F85A6]">Duração:</span>
                                                <span className="text-lg text-[#3f3c40] font-medium">
                                                    {formValues.duration ? `${formValues.duration} min` : "Não definida"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-lg text-[#4F85A6]">Exercícios:</span>
                                                <Badge
                                                    variant={isExerciseSelectionValid ? "default" : "secondary"}
                                                    className={
                                                        isExerciseSelectionValid
                                                            ? "bg-[#4F85A6] text-white text-lg px-4 py-2"
                                                            : "bg-[#e9edee] text-[#3f3c40] text-lg px-4 py-2"
                                                    }
                                                >
                                                    {selectedExercises.length}/{exerciseCount}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-[#e9edee]">
                                            <ButtonAdm
                                                type="submit"
                                                //disabled={!isFormValid || isSubmitting}
                                                className="w-full bg-[#4F85A6] hover:bg-[#3f3c40] text-white disabled:opacity-50 disabled:cursor-not-allowed text-xl h-10"
                                                onClick={handleSubmit(onSubmit)}
                                            >
                                                {isSubmitting ? "Criando..." : "Criar Maratona"}
                                                <Trophy className="w-6 h-6 ml-3" />
                                            </ButtonAdm>
                                        </div>

                                        {!isFormValid && (
                                            <div className="text-lg text-[#4F85A6] space-y-3">
                                                <p>Para criar a maratona, complete:</p>
                                                <ul className="list-disc list-inside space-y-2 ml-4">
                                                    {Object.keys(errors).length > 0 && <li>Verifique os campos com erro</li>}
                                                    {!isExerciseSelectionValid && <li>Selecione a quantidade correta de exercícios</li>}
                                                </ul>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCompetition;