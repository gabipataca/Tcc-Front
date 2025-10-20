import { FC, ReactNode } from "react";
import QuestionsContextProvider from "../../components/pages/Competition/providers/QuestionsContextProvider";
import OngoingCompetitionContextProvider from "../../components/pages/Competition/providers/OngoingCompetitionContextProvider";



const CompetitionPageProviders: FC<{ children: ReactNode }> = ({ children }) => {


    return(
        <OngoingCompetitionContextProvider>
            <QuestionsContextProvider>
                {children}
            </QuestionsContextProvider>
        </OngoingCompetitionContextProvider>
    );
}


export default CompetitionPageProviders;