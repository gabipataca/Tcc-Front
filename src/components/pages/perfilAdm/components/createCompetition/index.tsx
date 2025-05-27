'use client';

import React, { useState } from 'react';
import Navbar from '@/components/_ui/Navbar';
import SideMenu from '@/components/_ui/SideMenu';
import Input from '@/components/_ui/Input';
import Button from '@/components/_ui/Button';

const CreateCompetition: React.FC = () => {
  const [exerciseCount, setExerciseCount] = useState('2');
  const [exerciseTitleFilter, setExerciseTitleFilter] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [duration, setDuration] = useState('');

  const exercisesMock = [
    'Exercício 1 - Título exemplo',
    'Exercício 2 - Título exemplo',
    'Exercício 3 - Título exemplo',
  ];

  const toggleExercise = (exercise: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise)
        : [...prev, exercise]
    );
  };

  return (
    <div className="flex h-full mx-auto w-full">
      <SideMenu />
      <div className="flex-1 flex flex-col bg-gray-200">
        <Navbar />
        <div className="flex justify-center items-start p-6 w-full">
          <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl space-y-6">
            <h3 className="text-3xl font-semibold text-[#4F85A6] text-center">
              Configurar Maratona
            </h3>

            <Input
              type="number"
              min={2}
              max={15}
              value={exerciseCount}
              setValue={setExerciseCount}
              label="Quantidade de Exercícios (2 a 15)"
              name="exerciseCount"
              required
            />

            <Input
              type="text"
              value={exerciseTitleFilter}
              setValue={setExerciseTitleFilter}
              label="Filtrar Exercícios por Título"
              placeholder="Digite o título do exercício"
              name="exerciseTitleFilter"
            />

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Selecionar Exercícios</h4>
              <div className="max-h-48 overflow-y-auto border rounded-lg p-3 space-y-2">
                {exercisesMock.map((ex) => (
                  <label key={ex} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedExercises.includes(ex)}
                      onChange={() => toggleExercise(ex)}
                      className="accent-[#4F85A6]"
                    />
                    <span>{ex}</span>
                  </label>
                ))}
              </div>
            </div>

            <Input
              type="number"
              min={1}
              value={duration}
              setValue={setDuration}
              label="Duração da Maratona (minutos)"
              placeholder="Ex: 90"
              name="duration"
            />

            <div className="flex justify-center">
              <Button $rounded $fullWidth className="max-w-xs">
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
