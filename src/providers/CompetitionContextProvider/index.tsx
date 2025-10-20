"use client";

import { CompetitionContext } from "@/contexts/CompetitionContext";
import { ReactNode } from "react";
import useCompetitionContext from "./hooks/useCompetitionContext";

const CompetitionContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const {
        competitions,
        competitionModels,
        isLoading,
        createCompetition,
        addCompetitionModel,
        loadCompetitions,
        toggleLoading,
        updateCompetition,
    } = useCompetitionContext();

    return (
        <CompetitionContext.Provider
            value={{
                createCompetition,
                competitions,
                competitionModels,
                addCompetitionModel,
                isLoading,
                toggleLoading,
                loadCompetitions,
                updateCompetition,
            }}
        >
            {children}
        </CompetitionContext.Provider>
    );
};


export default CompetitionContextProvider;