"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { WebSocketContextProps } from "./types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"

export const WebSocketContext = createContext<WebSocketContextProps | null>(null);


export const WebSocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [webSocketConnection, setWebSocketConnection] = useState<HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);

    const ConfigureWebSocket = useCallback(async () => {
        if(webSocketConnection == null) return;

        await webSocketConnection!.start();

        webSocketConnection.invoke("GetConnectionId").then((id: string) => {
            setConnectionId(id);
        });
    }, [webSocketConnection]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_URL}/hub/competition`, {
                
            })
            .withAutomaticReconnect()
            .build();

        setWebSocketConnection(newConnection);
    }, []);

    useEffect(() => {
        ConfigureWebSocket();
    }, [ConfigureWebSocket]);

    return(
        <WebSocketContext.Provider value={{ webSocketConnection, connectionId }}>
            { children }
        </WebSocketContext.Provider>
    );
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);

    if(context == null) {
        throw new Error("You are not inside the context scope");
    }

    return context;
}