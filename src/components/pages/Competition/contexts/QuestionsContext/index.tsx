import { createContext, useContext } from "react";
import { QuestionsContextProps } from "./types";

export const QuestionsContext = createContext<QuestionsContextProps | null>(
    null
);


export const useQuestions = () => {
    const context = useContext(QuestionsContext);
    
    if(context == null) {
        throw new Error("You are not inside the context scope");
    }

    return context;
}