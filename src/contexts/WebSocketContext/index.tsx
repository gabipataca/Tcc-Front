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
    
    // Track connection state to prevent race conditions
    const connectionStateRef = useRef<{
        isConnecting: boolean;
        isConnected: boolean;
        currentUserId: string | null;
        connectionInstance: HubConnection | null;
    }>({
        isConnecting: false,
        isConnected: false,
        currentUserId: null,
        connectionInstance: null,
    });
    
    // Stable reference to enqueueSnackbar to avoid unnecessary effect triggers
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    useEffect(() => {
        enqueueSnackbarRef.current = enqueueSnackbar;
    }, [enqueueSnackbar]);
    
    // Debounce timer for user changes
    const userChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any pending debounce timeout
        if (userChangeTimeoutRef.current) {
            clearTimeout(userChangeTimeoutRef.current);
            userChangeTimeoutRef.current = null;
        }

        // Don't attempt connection on public routes
        const publicRoutes = ["/login", "/register", "/recover"];
        const isPublicRoute = location === "/" || publicRoutes.some(route => location.startsWith(route));
        
        if (isPublicRoute) {
            console.log("🚫 Skipping WebSocket connection on public route:", location);
            return;
        }

        // Don't create connection if no user is logged in
        if (!user || user.token == null) {
            // Clean up existing connection if user logged out
            const currentConnection = connectionStateRef.current.connectionInstance;
            if (currentConnection != null) {
                console.log("🔌 User logged out, stopping WebSocket connection");
                
                // Stop connection regardless of state
                if (currentConnection.state !== HubConnectionState.Disconnected) {
                    currentConnection.stop().catch((err) => {
                        console.error("Error stopping WebSocket connection:", err);
                    });
                }
                
                setWebSocketConnection(null);
                setConnectionId(null);
                connectionStateRef.current = {
                    isConnecting: false,
                    isConnected: false,
                    currentUserId: null,
                    connectionInstance: null,
                };
            }
            return;
        }

        // Check if user changed - if so, close old connection and create new one
        const userChanged = 
            connectionStateRef.current.currentUserId !== null && 
            connectionStateRef.current.currentUserId !== user.id;
        
        if (userChanged) {
            console.log("👤 User changed, closing old WebSocket connection");
            const oldConnection = connectionStateRef.current.connectionInstance;
            
            if (oldConnection != null && oldConnection.state !== HubConnectionState.Disconnected) {
                oldConnection.stop().catch((err) => {
                    console.error("Error stopping old WebSocket connection:", err);
                });
            }
            
            setWebSocketConnection(null);
            setConnectionId(null);
            connectionStateRef.current = {
                isConnecting: false,
                isConnected: false,
                currentUserId: null,
                connectionInstance: null,
            };
        }

        // Prevent duplicate connections - check all non-idle states
        const existingConnection = connectionStateRef.current.connectionInstance;
        const isInProgress = connectionStateRef.current.isConnecting || 
                           connectionStateRef.current.isConnected ||
                           (existingConnection != null && 
                            existingConnection.state !== HubConnectionState.Disconnected);
        
        if (isInProgress) {
            console.log("⏸️  WebSocket connection already in progress, skipping duplicate attempt");
            return;
        }

        // Debounce connection creation to allow UserContext to stabilize
        userChangeTimeoutRef.current = setTimeout(() => {
            // Validate backend URL is configured
            const backendUrl = process.env.NEXT_PUBLIC_API_URL_CUSTOM;
            if (!backendUrl) {
                console.error("❌ NEXT_PUBLIC_API_URL_CUSTOM not configured");
                return;
            }
            
            console.log("🔄 Creating new WebSocket connection for user:", user.id);
            console.log("📍 Backend URL:", backendUrl);
            
            connectionStateRef.current.isConnecting = true;
            connectionStateRef.current.currentUserId = user.id;

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
            
            // Store connection instance immediately
            connectionStateRef.current.connectionInstance = newConnection;

            // Set up event handlers before starting connection
            newConnection.on("ReceiveConnectionId", (id: string) => {
                console.log("🆔 Received connection ID:", id);
                setConnectionId(id);
            });

            newConnection.onclose((error) => {
                console.log("🔌 WebSocket connection closed", error);
                setConnectionId(null);
                connectionStateRef.current.isConnecting = false;
                connectionStateRef.current.isConnected = false;
            });

            newConnection.onreconnecting((error) => {
                console.log("🔄 WebSocket reconnecting...", error);
                setConnectionId(null);
                connectionStateRef.current.isConnected = false;
            });

            newConnection.onreconnected((connectionId) => {
                console.log("✅ WebSocket reconnected", connectionId);
                connectionStateRef.current.isConnected = true;
                
                // Request new connection ID after reconnection
                if (newConnection.state === HubConnectionState.Connected) {
                    newConnection.invoke("GetConnectionId").catch((err) => {
                        console.error("Error getting connection ID after reconnect:", err);
                    });
                    
                    // Trigger a re-fetch of competition data by emitting an event
                    // This ensures the CompetitionHubContext gets fresh data
                    console.log("🔄 Requesting fresh competition data after reconnection");
                }
            });

            // Start the connection
            newConnection
                .start()
                .then(() => {
                    console.log("✅ WebSocket connection established");
                    connectionStateRef.current.isConnecting = false;
                    connectionStateRef.current.isConnected = true;
                    
                    // Set state after successful connection
                    setWebSocketConnection(newConnection);
                    
                    // Request connection ID after successful connection
                    return newConnection.invoke("GetConnectionId");
                })
                .then(() => {
                    console.log("🆔 Connection ID requested");
                })
                .catch((error) => {
                    // Reset state on failure
                    connectionStateRef.current.isConnecting = false;
                    connectionStateRef.current.isConnected = false;
                    connectionStateRef.current.connectionInstance = null;
                    
                    // Differentiate between error types
                    const isNetworkError = error?.message?.includes("Failed to fetch") ||
                                          error?.message?.includes("Failed to complete negotiation");
                    const isCancellation = error?.message?.includes("Invocation canceled") ||
                                          error?.message?.includes("underlying connection being closed");
                    
                    if (isCancellation) {
                        // Expected in React.StrictMode (development only)
                        console.log("🔄 WebSocket connection cancelled (likely React.StrictMode cleanup)");
                    } else if (isNetworkError) {
                        console.warn("⚠️ WebSocket connection failed - backend may be unavailable:", error?.message);
                    } else {
                        console.error("❌ WebSocket connection failed:", error);
                        
                        // Only show user-facing error for non-network/non-cancellation issues
                        enqueueSnackbarRef.current("Erro ao conectar ao servidor", {
                            variant: "error",
                            autoHideDuration: 5000,
                            anchorOrigin: { vertical: "bottom", horizontal: "right" },
                        });
                    }
                });
        }, 100); // 100ms debounce to allow UserContext to stabilize

        // Cleanup function
        return () => {
            // Clear debounce timeout on cleanup
            if (userChangeTimeoutRef.current) {
                clearTimeout(userChangeTimeoutRef.current);
                userChangeTimeoutRef.current = null;
            }
            
            // Stop connection if it exists and is not already disconnected
            const currentConnection = connectionStateRef.current.connectionInstance;
            if (currentConnection != null) {
                const state = currentConnection.state;
                
                // Only attempt to stop if not already disconnected
                if (state !== HubConnectionState.Disconnected) {
                    console.log(`🧹 Cleanup: Stopping WebSocket (state: ${HubConnectionState[state]})`);
                    currentConnection.stop().catch((err) => {
                        console.error("Error during cleanup:", err);
                    });
                }
            }
        };
    }, [user, location]);

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
