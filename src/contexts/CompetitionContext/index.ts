
"use client";

import { createContext, useContext } from 'react';
import { Competition } from '@/types/Competition';
import { CreateCompetitionRequest, UpdateCompetitionRequest } from '@/types/Competition/Requests';

interface CompetitionContextType {
  competitions: Competition[];
  competitionModels: Competition[];
  createCompetition: (request: CreateCompetitionRequest) => Promise<void>;
  addCompetitionModel: (competitionModel: Competition) => void;
  isLoading: boolean;
  loadCompetitions: () => Promise<void>;
  toggleLoading: () => void;
  updateCompetition: (request: UpdateCompetitionRequest) => void;
}

export const CompetitionContext = createContext<CompetitionContextType | null>(null);

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === null) {
    throw new Error('useCompetition deve ser usado dentro de um CompetitionProvider');
  }
  return context;
};