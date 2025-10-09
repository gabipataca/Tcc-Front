"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { PrivateTokenContextType } from "./types";
import TokenService from "@/services/TokenService";
import { useSnackbar } from "notistack";
import { useUser } from "@/contexts/UserContext";

export const PrivateTokenContext =
    createContext<PrivateTokenContextType | null>(null);

export const PrivateTokenContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { user } = useUser();

    const [token, setToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const fetchToken = useCallback(async () => {
        if(user?.role != "Admin") return;

        try {
            setIsLoading(true);
            const res = await TokenService.getCurrentToken();

            if (res.status == 200) {
                setToken(res.data!.currentToken!);
            } else {
                throw new Error("Not possible to get current token");
            }
        } catch (error) {
            console.error("Erro ao buscar o código de acesso:", error);
            enqueueSnackbar("Erro ao buscar o código de acesso.", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, user?.role]);

    const refreshToken = useCallback(async () => {
        if(user?.role != "Admin") return;

        try {
            setIsLoading(true);
            const res = await TokenService.updateCurrentToken();

            if (res.status == 200) {
                setToken(res.data!.newToken);
            } else {
                throw new Error("Not possible to update current token");
            }
        } catch (error) {
            console.error("Erro ao atualizar o código de acesso:", error);
            enqueueSnackbar("Erro ao atualizar o código de acesso.", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar, user?.role]);

    return (
        <PrivateTokenContext.Provider
            value={{
                token,
                isLoading,
                fetchToken,
                refreshToken,
            }}
        >
            {children}
        </PrivateTokenContext.Provider>
    );
};


export const usePrivateTokenContext = () => {
    const context = useContext(PrivateTokenContext);

    if (!context) {
        throw new Error(
            "usePrivateTokenContext must be used within a PrivateTokenContextProvider"
        );
    }
    
    return context;
}