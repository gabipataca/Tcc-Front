import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/contexts/UserContext";
import Navbar from "@/components/_ui/Navbar";
import SnackbarProviderC from "@/contexts/SnackbarProvider";
import ThemeRegistry from "./ThemeRegistry";

// 1. Importe o novo provider
import CompetitionContextProvider from "@/providers/CompetitionContextProvider";
import { WebSocketContextProvider } from "@/contexts/WebSocketContext";

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
                        <Navbar />

                        <UserContextProvider>
                            <WebSocketContextProvider>
                                <CompetitionContextProvider>
                                    <main className="flex-grow">
                                        {children}
                                    </main>
                                </CompetitionContextProvider>
                            </WebSocketContextProvider>
                        </UserContextProvider>
                    </SnackbarProviderC>
                </ThemeRegistry>
            </body>
        </html>
    );
}
