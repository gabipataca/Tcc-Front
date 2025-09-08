"use client";

import type React from "react";
import Button from "@/components/_ui/Button";
import { useStudentDashboardData } from "./hooks/useStudentDashboardData";
import StudentInfoSection from "./components/StudentInfoSection";
import GroupInfoSection from "./components/GroupInfoSection";
import CompetitionHistorySection from "./components/CompetitionHistorySection";
import ChampionTeamsSection from "./components/ChampionsTeamsSection";
import { useUser } from "@/contexts/UserContext";

const StudentDashboard: React.FC = () => {
    const { user } = useUser();

    const { groupInfo, competitionHistory, championTeams } =
        useStudentDashboardData();

    return (
        <>
            {/* Conteúdo Principal */}
            <div className="flex-1 flex flex-col bg-gray-200">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Page Header */}
                    <div className="bg-white border-b border-slate-200 px-6 py-8 shadow-sm">
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                                    Perfil do Aluno
                                </h1>
                                <p className="text-slate-600 text-xl">
                                    Gerencie suas informações e acompanhe seu
                                    progresso acadêmico
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    style="primary"
                                    rounded
                                    className="text-xl"
                                >
                                    <div className="h-4 w-4 mr-2 bg-gray-400 rounded-full" />
                                    Criar Grupo
                                </Button>
                                <Button
                                    type="button"
                                    style="success"
                                    rounded
                                    className="text-xl"
                                >
                                    <div className="h-4 w-4 mr-2 bg-gray-400 rounded-full" />
                                    Iniciar Maratona
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <main className="px-40 py-8">
                        <div className="max-w-full space-y-8">
                            {/* Information Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <StudentInfoSection info={user} />
                                <GroupInfoSection info={groupInfo} />
                            </div>

                            {/* Tables */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <CompetitionHistorySection
                                    history={competitionHistory}
                                />
                                <ChampionTeamsSection teams={championTeams} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
