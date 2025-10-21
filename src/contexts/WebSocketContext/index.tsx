"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { WebSocketContextProps } from "./types";
import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
} from "@microsoft/signalr";
import { useSnackbar } from "notistack";
import { useUser } from "../UserContext";

export const WebSocketContext = createContext<WebSocketContextProps | null>(
    null
);

export const WebSocketContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user } = useUser();

    const [webSocketConnection, setWebSocketConnection] =
        useState<HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const ConfigureWebSocket = useCallback(async () => {
        if (
            webSocketConnection == null ||
            webSocketConnection.state === HubConnectionState.Connected
        )
            return;

        try {
            await webSocketConnection.start();

            webSocketConnection.on("ReceiveConnectionId", (id: string) => {
                setConnectionId(id);
            });

            await webSocketConnection.invoke("GetConnectionId");
        } catch (error) {
            console.error("WebSocket connection failed: ", error);
            enqueueSnackbar("Conexão WebSocket falhou", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        }
    }, [enqueueSnackbar, webSocketConnection]);

    useEffect(() => {
        if (!user || webSocketConnection != null) return;

        const newConnection = new HubConnectionBuilder()
            .withUrl(
                `${process.env.NEXT_PUBLIC_API_URL_CUSTOM}/hub/competition`,
                {
                    withCredentials: true,
                    accessTokenFactory() {
                        return user.token;
                    },
                }
            )
            .withAutomaticReconnect()
            .build();

        setWebSocketConnection(newConnection);
    }, [user]);

    useEffect(() => {
        ConfigureWebSocket();

        return () => {
            if (webSocketConnection != null) {
                if (
                    webSocketConnection.state === HubConnectionState.Connected
                ) {
                    webSocketConnection.stop();
                }
            }
        };
    }, [ConfigureWebSocket, webSocketConnection]);

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
