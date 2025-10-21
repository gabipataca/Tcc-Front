"use client"; 

import { FC, ReactNode } from "react";
import QuestionsContextProvider from "../../components/pages/Competition/providers/QuestionsContextProvider";
import OngoingCompetitionContextProvider from "../../components/pages/Competition/providers/OngoingCompetitionContextProvider";


import NavbarCompetition from "@/components/_ui/NavbarCompetition"; 

const CompetitionPageProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return(
        <OngoingCompetitionContextProvider>
            <QuestionsContextProvider>
            
                <main className="flex-grow w-full">
                    {children}
                </main>

            </QuestionsContextProvider>
        </OngoingCompetitionContextProvider>
    );
}

export default CompetitionPageProviders;