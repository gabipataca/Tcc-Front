import React, { createContext, useEffect, useState } from "react";
import { WebSocketContextProps } from "./types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"



export const WebSocketContext = createContext<WebSocketContextProps | null>(null);


export const WebSocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [webSocketConnection, setWebSocketConnection] = useState<HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);

    const ConfigureWebSocket = async () => {
        if(webSocketConnection == null) return;

        await webSocketConnection!.start();

        webSocketConnection.invoke("GetConnectionId").then((id: string) => {
            setConnectionId(id);
        });
    }

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("", {

            })
            .withAutomaticReconnect()
            .build();

        setWebSocketConnection(newConnection);
    }, []);

    useEffect(() => {
        ConfigureWebSocket();
    }, [webSocketConnection]);

    return(
        <WebSocketContext.Provider value={{ webSocketConnection }}>
            { children }
        </WebSocketContext.Provider>
    );
}