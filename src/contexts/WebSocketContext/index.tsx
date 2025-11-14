"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { WebSocketContextProps } from "./types";
import {
    HubConnection,
    HubConnectionBuilder,
    HubConnectionState,
    HttpTransportType,
} from "@microsoft/signalr";
import { useSnackbar } from "notistack";
import { useUser } from "../UserContext";
import { usePathname } from "next/navigation";

export const WebSocketContext = createContext<WebSocketContextProps | null>(
    null
);

export const WebSocketContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user } = useUser();
    const location = usePathname();
    const { enqueueSnackbar } = useSnackbar();

    const [webSocketConnection, setWebSocketConnection] =
        useState<HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);
    
    // Track if we're currently connecting to prevent duplicate connections
    const isConnectingRef = useRef(false);
    // Track the current user ID to detect user changes
    const currentUserIdRef = useRef<string | null>(null);

    useEffect(() => {
        // Don't create connection if no user is logged in
        if (!user || user.token == null) {
            // Clean up existing connection if user logged out
            if (webSocketConnection != null) {
                webSocketConnection.stop().catch((err) => {
                    console.error("Error stopping WebSocket connection:", err);
                });
                setWebSocketConnection(null);
                setConnectionId(null);
                currentUserIdRef.current = null;
            }
            return;
        }

        // Check if user changed - if so, close old connection and create new one
        const userChanged = currentUserIdRef.current !== null && currentUserIdRef.current !== user.id;
        
        if (userChanged && webSocketConnection != null) {
            // User changed, close old connection
            webSocketConnection.stop().catch((err) => {
                console.error("Error stopping old WebSocket connection:", err);
            });
            setWebSocketConnection(null);
            setConnectionId(null);
        }

        // Only create new connection if we don't have one and we're not already connecting
        if (webSocketConnection == null && !isConnectingRef.current) {
            isConnectingRef.current = true;
            currentUserIdRef.current = user.id;

            const newConnection = new HubConnectionBuilder()
                .withUrl(
                    `${process.env.NEXT_PUBLIC_API_URL_CUSTOM}/hub/competition`,
                    {
                        withCredentials: true,
                        accessTokenFactory() {
                            return user.token;
                        },
                        transport: HttpTransportType.WebSockets,
                    }
                )
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: (retryContext) => {
                        // Exponential backoff: 0, 2, 10, 30 seconds
                        if (retryContext.previousRetryCount < 4) {
                            return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000);
                        }
                        return null; // Stop retrying after 4 attempts
                    }
                })
                .build();

            // Set up event handlers before starting connection
            newConnection.on("ReceiveConnectionId", (id: string) => {
                setConnectionId(id);
            });

            newConnection.onclose((error) => {
                console.log("WebSocket connection closed", error);
                setConnectionId(null);
                isConnectingRef.current = false;
            });

            newConnection.onreconnecting((error) => {
                console.log("WebSocket reconnecting...", error);
                setConnectionId(null);
            });

            newConnection.onreconnected((connectionId) => {
                console.log("WebSocket reconnected", connectionId);
                // Request new connection ID after reconnection
                if (newConnection.state === HubConnectionState.Connected) {
                    newConnection.invoke("GetConnectionId").catch((err) => {
                        console.error("Error getting connection ID after reconnect:", err);
                    });
                }
            });

            // Start the connection
            newConnection
                .start()
                .then(() => {
                    console.log("WebSocket connection established");
                    // Request connection ID after successful connection
                    return newConnection.invoke("GetConnectionId");
                })
                .then(() => {
                    console.log("Connection ID requested");
                })
                .catch((error) => {
                    console.error("WebSocket connection failed:", error);
                    isConnectingRef.current = false;
                    
                    // Only show error if user is on a protected route
                    if (!["/", "/login", "/register"].includes(location)) {
                        enqueueSnackbar("Conexão WebSocket falhou", {
                            variant: "error",
                            anchorOrigin: { vertical: "bottom", horizontal: "right" },
                        });
                    }
                })
                .finally(() => {
                    isConnectingRef.current = false;
                });

            setWebSocketConnection(newConnection);
        }

        // Cleanup function
        return () => {
            if (webSocketConnection != null && webSocketConnection.state === HubConnectionState.Connected) {
                webSocketConnection.stop().catch((err) => {
                    console.error("Error during cleanup:", err);
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, location, enqueueSnackbar]);

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
