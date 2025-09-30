
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface SubscriptionModel {

  id: string; 
  name: string;
  description: string;
  maxMembers: string;
  initialDate: string;
  initialRegistration: string;
  endRegistration: string;
  status: string;
}

interface CompetitionContextType {
  subscriptions: SubscriptionModel[];
  addSubscription: (subscription: Omit<SubscriptionModel, 'id'>) => void;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export const CompetitionProvider = ({ children }: { children: ReactNode }) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>([]);

  const addSubscription = (subscription: Omit<SubscriptionModel, 'id'>) => {
    const newSubscription = {
      ...subscription,
      id: new Date().toISOString(), 
    };
    setSubscriptions(prev => [...prev, newSubscription]);
    alert('Modelo de inscrição salvo com sucesso (no estado do frontend)!');
  };

  return (
    <CompetitionContext.Provider value={{ subscriptions, addSubscription }}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition deve ser usado dentro de um CompetitionProvider');
  }
  return context;
};