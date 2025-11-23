"use client";

import { FC, useState } from "react";
import { Edit, ChevronLeft, Eye } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/_ui/Tabs";
import Button from "@/components/_ui/Button";
import AccessCodeDialog from "./components/AccessCodeDialog";
import TokenDisplay from "./components/TokenDisplay";
import StatsGrid from "@/components/_ui/StatsGrid";
import useProfileMenu from "../../hooks/useProfileMenu";
import ExerciseManagement from "../Shared/ExerciseManagement";
import CreateCompetition from "./pages/createCompetition";
import TeachersTable from "./components/TeachersTable";
import StudentsTable from "../../components/StudentsTable";
import GroupsTable from "../../components/GroupsTable";
import CreateCompetitionSubscription from "@/app/Profile/CreateSubscription/page";
import useAdminDashboard from "./hooks/useAdminDashboard";
import { useCompetitionStatus } from "@/contexts/CompetitionHubContext/hooks";
import { CompetitionStatusBar } from "@/components/pages/Competition/CompetitionStatusBar";
import { useRouter } from "next/navigation";
import { useStatistics } from "@/hooks/useStatistics";

const AdminDashboard: FC = () => {
    const [activeTab, setActiveTab] = useState("students");
    const { activeMenu, toggleMenu } = useProfileMenu();
    const router = useRouter();

    const { token, showAccessCodeDialog, toggleShowAccessCodeDialog } =
        useAdminDashboard();

    const { hasActiveCompetition } = useCompetitionStatus();
    
    const { statistics, isLoading: isLoadingStats } = useStatistics();

    const handleMonitorCompetition = () => {
        router.push("/Competition");
    };

    return (
        <div className="flex-1">
            {/* Competition Status Bar - aparece quando há competição ativa */}
            {hasActiveCompetition && <CompetitionStatusBar />}
            
            <div className="container mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between gap-8">
                    {activeMenu !== "Main" && (
                        <Button
                            variant="ghost"
                            size="default"
                            onClick={() => toggleMenu("Main")}
                        >
                            <ChevronLeft className="w-6 h-auto mr-2" />
                        </Button>
                    )}
                    <div className="mr-auto">
                        <h1 className="text-4xl font-bold text-[#3f3c40] py-2">
                            Dashboard Administrativo
                        </h1>
                        <p className="text-lg text-[#4F85A6]">
                            Gerencie alunos, professores e grupos
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Botão Monitorar Competição - aparece apenas se houver competição ativa */}
                        {hasActiveCompetition && (
                            <Button
                                onClick={handleMonitorCompetition}
                                rounded
                                variant="success"
                                className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                Monitorar Competição
                            </Button>
                        )}
                        <TokenDisplay token={token} className="min-w-0 max-w-xs" />
                        <Button
                            onClick={toggleShowAccessCodeDialog}
                            rounded
                            variant="primary"
                            className="whitespace-nowrap"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Alterar Código
                        </Button>
                    </div>
                </div>

                <StatsGrid 
                    totalExercises={statistics.totalExercises}
                    inactiveUsers={statistics.inactiveUsers}
                    isLoading={isLoadingStats}
                />

                {activeMenu === "Main" ? (
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-6"
                    >
                        <TabsList className="grid w-full grid-cols-3 bg-white border border-[#e9edee]">
                            <TabsTrigger
                                value="students"
                                className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-1 py-0.5"
                            >
                                Alunos
                            </TabsTrigger>
                            <TabsTrigger
                                value="professors"
                                className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-20 py-0.5"
                            >
                                Professores
                            </TabsTrigger>
                            <TabsTrigger
                                value="groups"
                                className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-3 py-0.5"
                            >
                                Grupos
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="students"
                            className="space-y-0 mt-0"
                        >
                            <StudentsTable />
                        </TabsContent>
                        <TabsContent
                            value="professors"
                            className="space-y-0 mt-0"
                        >
                            <TeachersTable />
                        </TabsContent>
                        <TabsContent value="groups" className="space-y-0 mt-0">
                            <GroupsTable />
                        </TabsContent>
                    </Tabs>
                ) : activeMenu === "Exercise" ? (
                    <ExerciseManagement />
                ) : activeMenu === "CreateCompetition" ? (
                    <CreateCompetition />
                ) : activeMenu === "CreateSubscription" ? (
                    <CreateCompetitionSubscription />
                ) : null}

                <AccessCodeDialog
                    isOpen={showAccessCodeDialog}
                    onClose={toggleShowAccessCodeDialog}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
