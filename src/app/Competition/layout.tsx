import { FC, ReactNode } from "react";
import QuestionsContextProvider from "../../components/pages/Competition/providers/QuestionsContextProvider";
import CompetitionContextProvider from "../../components/pages/Competition/providers/CompetitionContextProvider";



const CompetitionPageProviders: FC<{ children: ReactNode }> = ({ children }) => {


    return(
        <CompetitionContextProvider>
            <QuestionsContextProvider>
                {children}
            </QuestionsContextProvider>
        </CompetitionContextProvider>
    );
}


export default CompetitionPageProviders;