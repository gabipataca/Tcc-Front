"use client";

import type React from "react";
import { useState } from "react";
import Button from "@/components/_ui/Button";
import { useStudentDashboardData } from "./hooks/useStudentDashboardData";
import StudentInfoSection from "./components/StudentInfoSection";
import GroupInfoSection from "./components/GroupInfoSection";
import CompetitionHistorySection from "./components/CompetitionHistorySection";
import ChampionTeamsSection from "./components/ChampionsTeamsSection";
import { useUser } from "@/contexts/UserContext";
import { Trophy, Users } from "lucide-react";
import Modal from "@/components/_ui/Modal";

interface ModalConfig {
    title: string;
    bodyContent: React.ReactNode;
    hasConfirmButton?: boolean;
    confirmButtonContent?: string;
    onConfirm?: () => void;
}

const StudentDashboard: React.FC = () => {
    const { user } = useUser();
    const { groupInfo, competitionHistory, championTeams } =
        useStudentDashboardData();

    const [isRegistrationOpen] = useState(true);
    const [isUserRegistered] = useState(false);

    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        title: "",
        bodyContent: null,
    });

    const showModal = (config: ModalConfig) => {
        setModalConfig(config);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRegistrationClick = () => {
        showModal({
            title: "Redirecionamento",
            bodyContent: (
                <p className="text-slate-600">
                    Você será redirecionado para a página de inscrição...
                </p>
            ),
            hasConfirmButton: true,
            confirmButtonContent: "OK",
            onConfirm: closeModal,
        });
    };

    const handleStartMarathonClick = () => {
        if (isUserRegistered) {
            showModal({
                title: "Iniciando Maratona",
                bodyContent: (
                    <p className="text-slate-600">
                        Boa sorte! A maratona está começando.
                    </p>
                ),
                hasConfirmButton: true,
                confirmButtonContent: "Entendido",
                onConfirm: closeModal,
            });
        } else {
            showModal({
                title: "Aviso",
                bodyContent: (
                    <p className="text-slate-600">
                        Você precisa se inscrever na maratona antes de
                        iniciá-la.
                    </p>
                ),
                hasConfirmButton: true,
                confirmButtonContent: "OK",
                onConfirm: closeModal,
                status: "warning",
            });
        }
    };

    return (
        <>
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
                                    variant="primary"
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
                                    variant="success"
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

                    <main className="px-40 py-8">
                        <div className="max-w-full space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <StudentInfoSection />
                                <GroupInfoSection />
                            </div>
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

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                title={modalConfig.title}
                bodyContent={modalConfig.bodyContent}
                hasConfirmButton={modalConfig.hasConfirmButton}
                confirmButtonContent={modalConfig.confirmButtonContent}
                onConfirm={modalConfig.onConfirm}
                hasCancelButton={false}
                size="sm"
            />
        </>
    );
};

export default StudentDashboard;
