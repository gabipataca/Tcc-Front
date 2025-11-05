"use client"; 

import { FC, ReactNode } from "react";

const CompetitionPageProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return(
        <main className="flex-grow w-full">
            {children}
        </main>
    );
}

export default CompetitionPageProviders;