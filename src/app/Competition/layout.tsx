"use client"; 

import { FC, ReactNode } from "react";
import QuestionsContextProvider from "../../components/pages/Competition/providers/QuestionsContextProvider";
import { CompetitionHubProvider } from "@/contexts/CompetitionHubContext";

const CompetitionPageProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return(
        <CompetitionHubProvider>
            <QuestionsContextProvider>
            
                <main className="flex-grow w-full">
                    {children}
                </main>

            </QuestionsContextProvider>
        </CompetitionHubProvider>
    );
}

export default CompetitionPageProviders;