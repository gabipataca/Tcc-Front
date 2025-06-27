"use client"; // Este componente precisa ser um Client Component

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/theme"; // Opcional: seu arquivo de tema customizado

interface ThemeRegistryProps {
    children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
    return (
        <AppRouterCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline serve para normalizar os estilos, é uma boa prática */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
