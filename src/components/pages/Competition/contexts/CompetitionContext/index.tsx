import { createContext, useContext } from "react";
import { CompetitionContextType } from "./types";



export const CompetitionContext = createContext<CompetitionContextType | null>(null);


export const useCompetition = () => {
    const context = useContext(CompetitionContext);
        
    if(context == null) {
        throw new Error("You are not inside the context scope");
    }
    
    return context;
}