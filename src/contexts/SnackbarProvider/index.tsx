"use client"

import { SnackbarProvider } from "notistack";
import React from "react";


interface SnackbarProviderProps {
    children: React.ReactNode;
}

const SnackbarProviderC: React.FC<SnackbarProviderProps> = ({ children }) => {

    return(
        <SnackbarProvider>
            {children}
        </SnackbarProvider>
    );
}

export default SnackbarProviderC;