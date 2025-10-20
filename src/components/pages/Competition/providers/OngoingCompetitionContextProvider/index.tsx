"use client";

import { FC } from "react";
import { CompetitionContext } from "../../contexts/CompetitionContext";
import { CompetitionContextProviderProps } from "./types";
import { useOngoingCompetitionContext } from "./hooks/useOngoingCompetitionContext";

const OngoingCompetitionContextProvider: FC<
    CompetitionContextProviderProps
> = ({ children }) => {
    const { ongoingCompetition, canAccessCompetitionRanking } =
        useOngoingCompetitionContext();

    return (
        <CompetitionContext.Provider
            value={{ ongoingCompetition, canAccessCompetitionRanking }}
        >
            {children}
        </CompetitionContext.Provider>
    );
};

export default OngoingCompetitionContextProvider;
