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
        templateCompetitions,
        competitionModels,
        isTemplateLoading,
        createCompetition,
        addCompetitionModel,
        loadTemplateCompetitions,
        toggleTemplateLoading,
        updateTemplateCompetition,
    } = useCompetitionContext();

    return (
        <CompetitionContext.Provider
            value={{
                createCompetition,
                templateCompetitions,
                competitionModels,
                addCompetitionModel,
                isTemplateLoading,
                toggleTemplateLoading,
                loadTemplateCompetitions,
                updateTemplateCompetition,
            }}
        >
            {children}
        </CompetitionContext.Provider>
    );
};


export default CompetitionContextProvider;