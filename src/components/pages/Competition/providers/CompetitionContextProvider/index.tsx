"use client"

import { FC } from "react"
import { CompetitionContext } from "../../contexts/CompetitionContext"
import { CompetitionContextProviderProps } from "./types"



const CompetitionContextProvider: FC<CompetitionContextProviderProps> = ({ children }) => {


    return(
        <CompetitionContext.Provider value={{}}>
            {children}
        </CompetitionContext.Provider>
    )
}

export default CompetitionContextProvider;