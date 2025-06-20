'use client';

import React, { useState } from 'react';
import SideMenu from '@/components/_ui/SideMenu';
import Input from '@/components/_ui/Input';
import Button from '@/components/_ui/Button';

const CreateCompetition: React.FC = () => {
  const [exerciseCount, setExerciseCount] = useState('2');
  const [exerciseTitleFilter, setExerciseTitleFilter] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [duration, setDuration] = useState('');

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [stopAnswering, setStopAnswering] = useState('');
  const [stopScoreboard, setStopScoreboard] = useState('');
  const [penalty, setPenalty] = useState('');
  const [maxFileSize, setMaxFileSize] = useState('');
  const [competitionName, setCompetitionName] = useState(''); 

  const exercisesMock = [
    'Exercício 1 - Título exemplo',
    'Exercício 2 - Título exemplo',
    'Exercício 3 - Título exemplo',
    'Exercício 4 - Outro exemplo',
    'Exercício 5 - Mais um título',
    'Exercício 6 - Desafio de lógica',
    'Exercício 7 - Algoritmo complexo',
    'Exercício 8 - Estruturas de dados',
    'Exercício 9 - Programação dinâmica',
    'Exercício 10 - Grafos',
    'Exercício 11 - Backtracking',
    'Exercício 12 - Geometria computacional',
    'Exercício 13 - Teoria dos números',
    'Exercício 14 - Strings e regex',
    'Exercício 15 - Programação orientada a objetos',
  ];

  const toggleExercise = (exercise: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise)
        : [...prev, exercise]
    );
  };


  const filteredExercises = exercisesMock.filter(ex =>
    ex.toLowerCase().includes(exerciseTitleFilter.toLowerCase())
  ).slice(0, parseInt(exerciseCount));

  const handleCreateCompetition = () => {
    console.log('Configurações da Maratona:');
    console.log('Nome da Maratona:', competitionName);
    console.log('Quantidade de Exercícios:', exerciseCount);
    console.log('Exercícios Selecionados:', selectedExercises);
    console.log('Data de Início:', startDate);
    console.log('Hora de Início:', startTime);
    console.log('Duração:', duration, 'minutos');
    console.log('Parar Respostas em:', stopAnswering, 'minutos');
    console.log('Parar Placar em:', stopScoreboard, 'minutos');
    console.log('Penalidade:', penalty, 'minutos');
    console.log('Tamanho Máximo do Arquivo:', maxFileSize, 'KB');

    alert('Maratona configurada (verifique o console para os dados)!');
  };

  return (
    <div className="flex h-full mx-auto w-full">
      <SideMenu />
      <div className="flex-1 flex flex-col bg-gray-200">
        <div className="flex justify-center items-start p-6 w-full">
          <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl space-y-6">
            <h3 className="text-4xl font-semibold text-[#4F85A6] text-center">
              Criar Maratona
            </h3>

            {/* Nome da Maratona */}
            <Input
              type="text"
              label="Nome da Maratona"
              name="competitionName"
              placeholder="Ex: XII Olimpíada de Raciocínio Lógico"
              required
              value={competitionName}
              setValue={setCompetitionName}
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
            />

            {/* Data e Hora de Início */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={startDate}
                setValue={setStartDate}
                label="Data de Início (dd/mm/aaaa)"
                name="startDate"
                placeholder="Ex: 20/06/2025"
                required
                className="flex-1"
                labelClassName="text-xl" 
                inputClassName="text-lg py-2 px-3" 
              />
              <Input
                type="time"
                value={startTime}
                setValue={setStartTime}
                label="Hora de Início (hh:mm)"
                name="startTime"
                required
                className="flex-1"
                labelClassName="text-xl" 
                inputClassName="text-lg py-2 px-3" 
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
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
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
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
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
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
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
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
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
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
            />

            <Input
              type="number"
              min={2}
              max={15}
              value={exerciseCount}
              setValue={setExerciseCount}
              label="Quantidade de Exercícios (2 a 15)"
              name="exerciseCount"
              required
              labelClassName="text-xl" 
              inputClassName="text-lg py-2 px-3" 
            />

            <Input
              type="text"
              value={exerciseTitleFilter}
              setValue={setExerciseTitleFilter}
              label="Filtrar Exercícios por Título"
              placeholder="Digite o título do exercício"
              name="exerciseTitleFilter"
              inputClassName="text-lg py-2 px-3" 
            />

            <div>
              <h4 className="text-3x1 font-semibold text-gray-700 mb-2">Selecionar Exercícios</h4> 
              <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
                {filteredExercises.map((ex) => (
                  <label key={ex} className="flex items-center gap-2 text-xl"> 
                    <input
                      type="checkbox"
                      checked={selectedExercises.includes(ex)}
                      onChange={() => toggleExercise(ex)}
                      className="accent-[#4F85A6] w-6 h-6" 
                    />
                    <span>{ex}</span>
                  </label>
                ))}
              </div>
              
              {selectedExercises.length !== parseInt(exerciseCount) && (
                <p className="text-lg text-red-600 mt-2">
                  Você deve selecionar exatamente {exerciseCount} exercícios.
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                $rounded
                $fullWidth
                className="max-w-xs text-2xl py-4 px-8" 
                onClick={handleCreateCompetition}
                disabled={selectedExercises.length !== parseInt(exerciseCount)}
              >
                Criar Maratona
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompetition;