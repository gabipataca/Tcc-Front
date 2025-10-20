import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { Competition } from "@/types/Competition";
import { useEffect, useMemo, useState } from "react";


export const useOngoingCompetitionContext = () => {


        const { webSocketConnection } = useWebSocketContext();
    
        const [ongoingCompetition, setOngoingCompetition] =
            useState<Competition | null>(null);
    
        const canAccessCompetitionRanking = useMemo(() => {
            if (!ongoingCompetition) return false;
    
            return ongoingCompetition != null;
        }, [ongoingCompetition]);


        useEffect(() => {
            if (webSocketConnection == null) return;
    
            webSocketConnection.on(
                "OnConnectionResponse",
                (message: Competition | null) => {
                    if (!message) {
                        setOngoingCompetition(null);
                        return;
                    }
    
                    setOngoingCompetition(message);
                }
            );
        }, [webSocketConnection]);



    return {
        ongoingCompetition,
        canAccessCompetitionRanking,
    };
}