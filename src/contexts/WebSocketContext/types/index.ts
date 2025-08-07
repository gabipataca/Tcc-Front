import { HubConnection } from "@microsoft/signalr";


/**
 * Propriedades do contexto WebSocket para gerenciamento de conexões SignalR.
 */
export interface WebSocketContextProps {
    /**
     * Instância da conexão SignalR ou null se não houver conexão ativa.
     */
    webSocketConnection: HubConnection | null;

    /**
     * Identificador único da conexão, ou null se não estiver conectado.
     */
    connectionId: string | null;
}