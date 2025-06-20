'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/components/_ui/Input';
import Button from '@/components/_ui/Button';
import NavRanking from "@/components/_ui/NavbarRankingAdm";

const mockMarathonData = {
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

const EditMarathon: React.FC = () => {
  const [marathonName, setMarathonName] = useState(mockMarathonData.name);
  const [startDate, setStartDate] = useState(mockMarathonData.startDate);
  const [startTime, setStartTime] = useState(mockMarathonData.startTime);

  const [duration, setDuration] = useState(String(mockMarathonData.duration));
  const [stopAnswering, setStopAnswering] = useState(String(mockMarathonData.stopAnswering));
  const [stopScoreboard, setStopScoreboard] = useState(String(mockMarathonData.stopScoreboard));
  const [penalty, setPenalty] = useState(String(mockMarathonData.penalty));
  const [maxFileSize, setMaxFileSize] = useState(String(mockMarathonData.maxFileSize));

  const [isMarathonActive, setIsMarathonActive] = useState(true);

  useEffect(() => {
  }, []);

  const handleUpdateMarathon = () => {
    if (!isMarathonActive) {
      alert("A maratona já foi finalizada e não pode ser atualizada.");
      return;
    }

    console.log('Atualizando configurações da Maratona:', {
      id: mockMarathonData.id,
      duration: parseInt(duration),
      stopAnswering: parseInt(stopAnswering),
      stopScoreboard: parseInt(stopScoreboard),
      penalty: parseInt(penalty),
      maxFileSize: parseInt(maxFileSize),
    });
    alert('Configurações da Maratona atualizadas!');
  };

  const handleStopMarathon = () => {
    if (!isMarathonActive) {
      alert("A maratona já foi finalizada.");
      return;
    }

    if (window.confirm("Tem certeza que deseja FINALIZAR esta maratona agora?")) {
      const now = new Date();
      const currentHour = String(now.getHours()).padStart(2, '0');
      const currentMinute = String(now.getMinutes()).padStart(2, '0');
      const currentSecond = String(now.getSeconds()).padStart(2, '0');
      const actualEndTime = `${currentHour}:${currentMinute}:${currentSecond}`;

      console.log(`Maratona ID ${mockMarathonData.id} finalizada às ${actualEndTime}.`);
      alert(`Maratona finalizada em ${actualEndTime}!`);
      setIsMarathonActive(false);
    }
  };

  return (
    <NavRanking>
      <div className="flex flex-col bg-gray-200 min-h-screen">
        <div className="flex justify-center items-start p-6 w-full flex-grow">
          <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl space-y-6">
            <h3 className="text-4xl font-semibold text-[#4F85A6] text-center">
              Editar Maratona
            </h3>

            <Input
              type="text"
              label="Nome da Maratona"
              name="marathonName"
              value={marathonName}
              setValue={setMarathonName}
              readOnly
              
              className="text-lg bg-gray-100 cursor-not-allowed" 
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={startDate}
                setValue={setStartDate}
                label="Data de Início (dd/mm/aaaa)"
                name="startDate"
                readOnly
                className="flex-1 text-lg bg-gray-100 cursor-not-allowed" // Aplicado ao div pai do Input
              />
              <Input
                type="time"
                value={startTime}
                setValue={setStartTime}
                label="Hora de Início (hh:mm)"
                name="startTime"
                readOnly
                className="flex-1 text-lg bg-gray-100 cursor-not-allowed" // Aplicado ao div pai do Input
              />
            </div>

            <Input
              type="number"
              min={1}
              value={duration}
              setValue={setDuration}
              label="Duração da Maratona (minutos)"
              placeholder="Ex: 90"
              name="duration"
              required
              disabled={!isMarathonActive}
              
              className={`text-lg ${!isMarathonActive ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />

            <Input
              type="number"
              min={1}
              value={stopAnswering}
              setValue={setStopAnswering}
              label="Parar de responder (minutos)"
              placeholder="Ex: 85"
              name="stopAnswering"
              required
              disabled={!isMarathonActive}
              className={`text-lg ${!isMarathonActive ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />

            <Input
              type="number"
              min={1}
              value={stopScoreboard}
              setValue={setStopScoreboard}
              label="Parar placar (minutos)"
              placeholder="Ex: 80"
              name="stopScoreboard"
              required
              disabled={!isMarathonActive}
              className={`text-lg ${!isMarathonActive ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />

            <Input
              type="number"
              min={0}
              value={penalty}
              setValue={setPenalty}
              label="Penalidade (minutos)"
              placeholder="Ex: 30"
              name="penalty"
              required
              disabled={!isMarathonActive}
              className={`text-lg ${!isMarathonActive ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />

            <Input
              type="number"
              min={0}
              value={maxFileSize}
              setValue={setMaxFileSize}
              label="Tamanho máximo de arquivo permitido (KB)"
              placeholder="Ex: 100"
              name="maxFileSize"
              required
              readOnly
              className="text-lg bg-gray-100 cursor-not-allowed" 
            />

            <div className="flex justify-center gap-4 mt-6">
              <Button
                $rounded
                className="max-w-xs text-xl py-3 bg-green-500 hover:bg-green-600"
                onClick={handleUpdateMarathon}
                disabled={!isMarathonActive}
              >
                Atualizar Configurações
              </Button>
              <Button
                $rounded
                className="max-w-xs text-xl py-3 bg-red-600 hover:bg-red-700"
                onClick={handleStopMarathon}
                disabled={!isMarathonActive}
              >
                FINALIZAR MARATONA (STOP)
              </Button>
            </div>
            {!isMarathonActive && (
                <p className="text-center text-red-600 text-lg mt-4 font-semibold">
                    A maratona foi finalizada e não pode mais ser editada.
                </p>
            )}
          </div>
        </div>
      </div>
    </NavRanking>
  );
};

export default EditMarathon;