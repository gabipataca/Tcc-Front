"use client";

import { CompetitionContext } from "@/contexts/CompetitionContext";
import { ReactNode, useMemo } from "react";
import { Competition } from "@/types/Competition";
import useCompetitionContext from "./hooks/useCompetitionContext";

export const CompetitionContextProvider = ({
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
