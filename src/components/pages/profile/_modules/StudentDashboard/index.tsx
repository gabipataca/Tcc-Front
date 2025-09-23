"use client";

import type React from "react";
import { useState } from "react"; // Importar o useState
import Button from "@/components/_ui/Button";
import { useStudentDashboardData } from "./hooks/useStudentDashboardData";
import StudentInfoSection from "./components/StudentInfoSection";
import GroupInfoSection from "./components/GroupInfoSection";
import CompetitionHistorySection from "./components/CompetitionHistorySection";
import ChampionTeamsSection from "./components/ChampionsTeamsSection";
import { useUser } from "@/contexts/UserContext";
import { Trophy, Users } from "lucide-react";

const StudentDashboard: React.FC = () => {
    const { user } = useUser();

    const { groupInfo, competitionHistory, championTeams } =
        useStudentDashboardData();

    // --- Lógica dos Botões ---
    // Simula se as inscrições para a maratona estão abertas.
    // Mude para 'false' para ver o botão desabilitado.
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

    // Simula se o aluno atual já se inscreveu na maratona.
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    const handleRegistrationClick = () => {
        // Em uma aplicação real, você usaria um router para navegar.
        // Ex: router.push('/inscricao');
        alert("Redirecionando para a página de inscrição...");
    };

    const handleStartMarathonClick = () => {
        if (isUserRegistered) {
            alert("Iniciando maratona... Boa sorte!");
            // Lógica para iniciar a maratona
        } else {
            alert("Você precisa se inscrever na maratona antes de iniciá-la.");
        }
    };

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
                                    onClick={handleRegistrationClick}
                                    disabled={!isRegistrationOpen}
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    Realizar Inscrição
                                </Button>
                                <Button
                                    type="button"
                                    style="success"
                                    rounded
                                    className="text-xl"
                                    onClick={handleStartMarathonClick}
                                >
                                    <Trophy className="h-4 w-4 mr-2" />
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

