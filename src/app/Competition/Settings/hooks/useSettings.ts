import { useState, useCallback } from "react";

interface MarathonData {
    id: number;
    name: string;
    startDate: string;
    startTime: string;
    duration: number;
    stopAnswering: number;
    stopScoreboard: number;
    penalty: number;
    maxFileSize: number;
}

const mockMarathonData: MarathonData = {
    id: 1,
    name: "XII Olimpíada de Raciocínio Lógico",
    startDate: "20/06/2025",
    startTime: "10:00",
    duration: 90,
    stopAnswering: 85,
    stopScoreboard: 80,
    penalty: 30,
    maxFileSize: 100,
};

const useSettings = () => {
    const [marathonName, setMarathonName] = useState(mockMarathonData.name);
    const [startDate, setStartDate] = useState(mockMarathonData.startDate);
    const [startTime, setStartTime] = useState(mockMarathonData.startTime);
    const [duration, setDuration] = useState(String(mockMarathonData.duration));
    const [stopAnswering, setStopAnswering] = useState(
        String(mockMarathonData.stopAnswering)
    );
    const [stopScoreboard, setStopScoreboard] = useState(
        String(mockMarathonData.stopScoreboard)
    );
    const [penalty, setPenalty] = useState(String(mockMarathonData.penalty));
    const [maxFileSize, setMaxFileSize] = useState(
        String(mockMarathonData.maxFileSize)
    );
    const [isMarathonActive, setIsMarathonActive] = useState(true);

    const handleUpdateMarathon = useCallback(() => {
        if (!isMarathonActive) {
            alert("A maratona já foi finalizada e não pode ser atualizada.");
            return;
        }

        console.log("Atualizando configurações da Maratona:", {
            id: mockMarathonData.id,
            duration: Number.parseInt(duration),
            stopAnswering: Number.parseInt(stopAnswering),
            stopScoreboard: Number.parseInt(stopScoreboard),
            penalty: Number.parseInt(penalty),
            maxFileSize: Number.parseInt(maxFileSize),
        });
        alert("Configurações da Maratona atualizadas!");
    }, [
        isMarathonActive,
        duration,
        stopAnswering,
        stopScoreboard,
        penalty,
        maxFileSize,
    ]);

    const handleStopMarathon = useCallback(() => {
        if (!isMarathonActive) {
            alert("A maratona já foi finalizada.");
            return;
        }

        if (
            window.confirm(
                "Tem certeza que deseja FINALIZAR esta maratona agora?"
            )
        ) {
            const now = new Date();
            const currentHour = String(now.getHours()).padStart(2, "0");
            const currentMinute = String(now.getMinutes()).padStart(2, "0");
            const currentSecond = String(now.getSeconds()).padStart(2, "0");
            const actualEndTime = `${currentHour}:${currentMinute}:${currentSecond}`;

            console.log(
                `Maratona ID ${mockMarathonData.id} finalizada às ${actualEndTime}.`
            );
            alert(`Maratona finalizada em ${actualEndTime}!`);
            setIsMarathonActive(false);
        }
    }, [isMarathonActive]);

    return {
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
        setIsMarathonActive,
        handleUpdateMarathon,
        handleStopMarathon,
        mockMarathonData,
    };
};

export default useSettings;
