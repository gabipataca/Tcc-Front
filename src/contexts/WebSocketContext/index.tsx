"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { WebSocketContextProps } from "./types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useSnackbar } from "notistack";

export const WebSocketContext = createContext<WebSocketContextProps | null>(
    null
);

export const WebSocketContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [webSocketConnection, setWebSocketConnection] =
        useState<HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const ConfigureWebSocket = useCallback(async () => {
        if (webSocketConnection == null) return;

        try {
            await webSocketConnection!.start();

            webSocketConnection.invoke("GetConnectionId").then((id: string) => {
                setConnectionId(id);
            });
        } catch (error) {
            console.error("WebSocket connection failed: ", error);
            enqueueSnackbar("Conexão WebSocket falhou", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        }
    }, [enqueueSnackbar, webSocketConnection]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_URL}/hub/competition`, {
                withCredentials: true,
            })
            .withAutomaticReconnect()
            .build();

        setWebSocketConnection(newConnection);
    }, []);

    useEffect(() => {
        ConfigureWebSocket();
    }, [ConfigureWebSocket]);

    return (
        <WebSocketContext.Provider
            value={{ webSocketConnection, connectionId }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);

    if (context == null) {
        throw new Error("You are not inside the context scope");
    }

    return context;
};
