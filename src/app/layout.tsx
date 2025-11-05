import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/contexts/UserContext";
import SnackbarProviderC from "@/contexts/SnackbarProvider";
import ThemeRegistry from "./ThemeRegistry";
import CompetitionContextProvider from "@/providers/CompetitionContextProvider";
import { WebSocketContextProvider } from "@/contexts/WebSocketContext";

import NavbarWrapper from "@/components/_ui/NavbarWrapper";
import { CompetitionHubProvider } from "@/contexts/CompetitionHubContext";

export const metadata: Metadata = {
    title: "Falcon",
    description: "Plataforma de Competições de Programação",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body>
                <ThemeRegistry>
                    <SnackbarProviderC>
                        <UserContextProvider>
                            <WebSocketContextProvider>
                                <CompetitionContextProvider>
                                    <CompetitionHubProvider>
                                        <NavbarWrapper />

                                        {children}
                                    </CompetitionHubProvider>
                                </CompetitionContextProvider>
                            </WebSocketContextProvider>
                        </UserContextProvider>
                    </SnackbarProviderC>
                </ThemeRegistry>
            </body>
        </html>
    );
}
