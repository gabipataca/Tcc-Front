import { HubConnection } from "@microsoft/signalr";


export interface WebSocketContextProps {
    webSocketConnection: HubConnection | null;
    connectionId: string | null;
}