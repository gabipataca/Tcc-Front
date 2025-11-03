"use client";

import React from "react";
import { useRanking } from "@/contexts/CompetitionHubContext/hooks";

/**
 * Example component displaying live competition ranking.
 */
export const LiveRankingTable: React.FC = () => {
    const { liveRanking } = useRanking();

    if (liveRanking.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                Nenhum ranking disponível ainda.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left border">Posição</th>
                        <th className="p-3 text-left border">Equipe</th>
                        <th className="p-3 text-left border">Exercícios Resolvidos</th>
                        <th className="p-3 text-left border">Penalidade Total</th>
                        <th className="p-3 text-left border">Pontuação</th>
                    </tr>
                </thead>
                <tbody>
                    {liveRanking.map((rank) => (
                        <tr key={rank.group.id} className="hover:bg-gray-50">
                            <td className="p-3 border font-bold">
                                {rank.rankOrder}º
                            </td>
                            <td className="p-3 border">{rank.group.name}</td>
                            <td className="p-3 border text-center">
                                {rank.exerciseAttempts.length}
                            </td>
                            <td className="p-3 border text-center">
                                {rank.penalty}min
                            </td>
                            <td className="p-3 border text-center font-bold">
                                {rank.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
