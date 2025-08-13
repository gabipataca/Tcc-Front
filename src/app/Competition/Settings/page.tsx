"use client";

import type React from "react";
import Input from "../../../components/_ui/Input";
import Button from "../../../components/_ui/Button";


import { AlertTriangle, Clock, Settings, StopCircle, Calendar, Timer, FileText } from "lucide-react";

import useSettings from "./hooks/useSettings";

const EditMarathon: React.FC = () => {
    const {
        marathonName,
        setMarathonName,
        startDate,
        setStartDate,
        startTime,
        setStartTime,
        duration,
        setDuration,
        stopAnswering,
        setStopAnswering,
        stopScoreboard,
        setStopScoreboard,
        penalty,
        setPenalty,
        maxFileSize,
        setMaxFileSize,
        isMarathonActive,
        handleUpdateMarathon,
        handleStopMarathon,
    } = useSettings();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#4F85A6] flex items-center justify-center gap-3">
                        <Settings className="h-8 w-8 text-[#4F85A6]" />
                        Editar Maratona
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 overflow-hidden">
                    <div className="bg-[#4F85A6] text-white p-6 rounded-t-lg">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Informações Básicas
                        </h2>
                        <p className="text-blue-100 mt-1">Dados principais da maratona (não editáveis)</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <Input
                            id="marathonName"
                            value={marathonName}
                            readOnly
                            className="bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                            setValue={setMarathonName}
                            type="text"
                            name="marathonName"
                            label="Nome da Maratona"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                id="startDate"
                                value={startDate}
                                readOnly
                                className="bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                                setValue={setStartDate}
                                type="text"
                                name="startDate"
                                label="Data de Início"
                            />
                            <Input
                                id="startTime"
                                value={startTime}
                                readOnly
                                className="bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                                setValue={setStartTime}
                                type="time"
                                name="startTime"
                                label="Hora de Início"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 overflow-hidden">
                    <div className="bg-[#4F85A6] text-white p-6 rounded-t-lg">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Timer className="h-5 w-5" />
                            Configurações de Tempo
                        </h2>
                        <p className="text-blue-100 mt-1">Ajuste os parâmetros de duração e timing</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                id="duration"
                                type="number"
                                min={1}
                                value={duration}
                                setValue={setDuration}
                                disabled={!isMarathonActive}
                                className={`${!isMarathonActive ? "bg-slate-50 cursor-not-allowed" : ""}`}
                                placeholder="Ex: 90"
                                name="duration"
                                label="Duração da Maratona (minutos)"
                                icon={<Clock className="h-4 w-4" />}
                            />

                            <Input
                                id="stopAnswering"
                                type="number"
                                min={1}
                                value={stopAnswering}
                                setValue={setStopAnswering}
                                disabled={!isMarathonActive}
                                className={`${!isMarathonActive ? "bg-slate-50 cursor-not-allowed" : ""}`}
                                placeholder="Ex: 85"
                                name="stopAnswering"
                                label="Parar de responder (minutos)"
                                icon={<StopCircle className="h-4 w-4" />}
                            />

                            <Input
                                id="stopScoreboard"
                                type="number"
                                min={1}
                                value={stopScoreboard}
                                setValue={setStopScoreboard}
                                disabled={!isMarathonActive}
                                className={`${!isMarathonActive ? "bg-slate-50 cursor-not-allowed" : ""}`}
                                placeholder="Ex: 80"
                                name="stopScoreboard"
                                label="Parar placar (minutos)"
                                icon={<Timer className="h-4 w-4" />}
                            />

                            <Input
                                id="penalty"
                                type="number"
                                min={0}
                                value={penalty}
                                setValue={setPenalty}
                                disabled={!isMarathonActive}
                                className={`${!isMarathonActive ? "bg-slate-50 cursor-not-allowed" : ""}`}
                                placeholder="Ex: 30"
                                name="penalty"
                                label="Penalidade (minutos)"
                                icon={<AlertTriangle className="h-4 w-4" />}
                            />
                        </div>

                        <hr className="border-slate-200" />

                        <Input
                            id="maxFileSize"
                            type="number"
                            value={maxFileSize}
                            readOnly
                            className="bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                            setValue={setMaxFileSize}
                            name="maxFileSize"
                            label="Tamanho máximo de arquivo (KB)"
                            icon={<FileText className="h-4 w-4" />}
                        />
                        <p className="text-xs text-slate-500 -mt-4">
                            Este valor não pode ser alterado após a criação da maratona
                        </p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-0 p-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleUpdateMarathon}
                            disabled={!isMarathonActive}
                            className="bg-[#4F85A6] hover:bg-[#3F6D8A] text-white px-8 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <Settings className="h-5 w-5" />
                            Atualizar Configurações
                        </Button>

                        <Button
                            onClick={handleStopMarathon}
                            disabled={!isMarathonActive}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <StopCircle className="h-5 w-5" />
                            Finalizar Maratona
                        </Button>
                    </div>
                </div>

                {!isMarathonActive && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 font-medium">A maratona foi finalizada e não pode mais ser editada.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditMarathon;