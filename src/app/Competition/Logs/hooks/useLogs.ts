"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useCompetitionHub } from "@/contexts/CompetitionHubContext";
import type { LogResponse } from "@/types/SignalR";

export interface TeamData {
    teamName: string;
    ip: string;
    lastLogin: string;
    lastLogout: string;
    members: string;
    lastActionTime: string;
    lastAction: string;
}

interface Column {
    id:
        | "teamName"
        | "ip"
        | "lastLogin"
        | "lastLogout"
        | "members"
        | "lastActionTime"
        | "lastAction";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
    { id: "teamName", label: "Team Name", minWidth: 150, align: "center" },
    { id: "ip", label: "IP", minWidth: 100, align: "center" },
    {
        id: "lastLogin",
        label: "Last Login",
        minWidth: 170,
        align: "center",
    },
    {
        id: "lastLogout",
        label: "Last Logout",
        minWidth: 170,
        align: "center",
    },
    {
        id: "lastActionTime",
        label: "Hora Última Ação",
        minWidth: 180,
        align: "center",
    },
    {
        id: "lastAction",
        label: "Última Ação",
        minWidth: 250,
        align: "center",
    },
    { id: "members", label: "Integrantes", minWidth: 170, align: "center" },
];

// Helper to format action type
const getActionDescription = (actionType: number): string => {
    const actions: { [key: number]: string } = {
        0: "Login",
        1: "Logout",
        2: "Submissão de Exercício",
        3: "Pergunta Enviada",
        4: "Resposta Dada",
        5: "Grupo Bloqueado",
        6: "Grupo Desbloqueado",
    };
    return actions[actionType] || "Ação Desconhecida";
};

const useLogs = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [logs, setLogs] = useState<LogResponse[]>([]);
    const { requestLogs, isConnected, ongoingCompetition } =
        useCompetitionHub();

    // Load logs when connected and competition is available
    useEffect(() => {
        if (isConnected && ongoingCompetition) {
            requestLogs().then((fetchedLogs) => {
                setLogs(fetchedLogs);
            });
        }
    }, [isConnected, ongoingCompetition, requestLogs]);

    // Transform logs into TeamData format for the table
    const rows = useMemo((): TeamData[] => {
        // Group logs by groupId to aggregate information
        const groupMap = new Map<
            number,
            {
                groupId: number;
                ip: string;
                lastLogin?: string;
                lastLogout?: string;
                lastActionTime: string;
                lastAction: string;
                members: string; // We'll populate this from group data if available
            }
        >();

        logs.forEach((log) => {
            if (log.groupId) {
                const existing = groupMap.get(log.groupId);
                const actionTime = new Date(log.actionTime).toLocaleString(
                    "pt-BR"
                );
                const actionDesc = getActionDescription(log.actionType);

                if (!existing) {
                    groupMap.set(log.groupId, {
                        groupId: log.groupId,
                        ip: log.ipAddress,
                        lastLogin:
                            log.actionType === 0 ? actionTime : undefined,
                        lastLogout:
                            log.actionType === 1 ? actionTime : undefined,
                        lastActionTime: actionTime,
                        lastAction: actionDesc,
                        members: "Carregando...", // Will be filled from competition data
                    });
                } else {
                    // Update with latest information
                    if (
                        log.actionType === 0 &&
                        (!existing.lastLogin ||
                            new Date(log.actionTime) >
                                new Date(existing.lastLogin))
                    ) {
                        existing.lastLogin = actionTime;
                    }
                    if (
                        log.actionType === 1 &&
                        (!existing.lastLogout ||
                            new Date(log.actionTime) >
                                new Date(existing.lastLogout))
                    ) {
                        existing.lastLogout = actionTime;
                    }
                    // Always update to latest action
                    if (
                        new Date(log.actionTime) >
                        new Date(existing.lastActionTime)
                    ) {
                        existing.lastActionTime = actionTime;
                        existing.lastAction = actionDesc;
                    }
                }
            }
        });

        // Convert map to array and get group names from competition data
        return Array.from(groupMap.values()).map((groupData) => {
            const group = ongoingCompetition?.competitionRankings?.find(
                (r) => r.group.id === groupData.groupId
            );
            const groupName = group?.group.name || `Grupo ${groupData.groupId}`;
            const members =
                group?.group.users?.map((u) => u.name).join(", ") || "N/A";

            return {
                teamName: groupName,
                ip: groupData.ip,
                lastLogin: groupData.lastLogin || "N/A",
                lastLogout: groupData.lastLogout || "N/A",
                members: members,
                lastActionTime: groupData.lastActionTime,
                lastAction: groupData.lastAction,
            };
        });
    }, [logs, ongoingCompetition]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        rows,
        columns,
    };
};

export default useLogs;
