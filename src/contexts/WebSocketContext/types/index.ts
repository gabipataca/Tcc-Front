import { HubConnection } from "@microsoft/signalr";


/**
 * WebSocket context properties for managing SignalR connections.
 */
export interface WebSocketContextProps {
    /**
     * SignalR connection instance or null if there is no active connection.
     */
    webSocketConnection: HubConnection | null;

    /**
     * Unique connection identifier, or null if not connected.
     */
    connectionId: string | null;
}