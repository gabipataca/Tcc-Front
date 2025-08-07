"use client";

import { FC, useState } from "react";
import { Users, GraduationCap, UserCheck, Edit } from "lucide-react";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/_ui/Tabs";
import SideMenu from "@/components/_ui/SideMenu";
import Navbar from "@/components/_ui/Navbar";
import StatsCard from "../../components/StatsCard";
import { groupsData, professorsData, studentsData } from "../../hooks/mockData";
import StudentsTable from "../../components/StudentsTable";
import TeachersTable from "./components/TeachersTable";
import GroupsTable from "../../components/GroupsTable";
import AccessCodeDialog from "./components/AccessCodeDialog";

const AdminDashboard: FC = () => {
    const [accessCodeDialog, setAccessCodeDialog] = useState<{
        isOpen: boolean;
        code: string;
    }>({
        isOpen: false,
        code: "PROF2024",
    });

    return (
        <div className="min-h-screen bg-[#e9edee]">
            <Navbar />

            <div className="flex">
                <SideMenu />

                <div className="flex-1">
                    <div className="container mx-auto p-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-[#3f3c40] py-2">
                                    Dashboard Administrativo
                                </h1>
                                <p className="text-lg text-[#4F85A6]">
                                    Gerencie alunos, professores e grupos
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-[#4F85A6]">
                                        Código de Acesso Atual
                                    </p>
                                    <p className="text-lg font-mono font-bold text-[#3f3c40]">
                                        {accessCodeDialog.code}
                                    </p>
                                </div>
                                <ButtonAdm
                                    onClick={() =>
                                        setAccessCodeDialog({
                                            ...accessCodeDialog,
                                            isOpen: true,
                                        })
                                    }
                                    className="bg-[#4F85A6] hover:bg-[#3f3c40] text-white"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Alterar Código
                                </ButtonAdm>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatsCard
                                title="Total de Alunos"
                                value={studentsData.length}
                                description="Ativos no ultimo mês"
                                icon={Users}
                            />
                            <StatsCard
                                title="Professores Ativos"
                                value={professorsData.length}
                                description="professores cadastrados"
                                icon={GraduationCap}
                            />
                            <StatsCard
                                title="Grupos Ativos"
                                value={
                                    groupsData.filter(
                                        (g) => g.status === "active"
                                    ).length
                                }
                                description="Ativos no ultimo mês"
                                icon={UserCheck}
                            />
                        </div>

                        {/* Main Content */}
                        <Tabs defaultValue="students" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-3 bg-white border border-[#e9edee]">
                                <TabsTrigger
                                    value="students"
                                    className="data-[state=-white text-base text-[#3f3c40] px-1 py-0.5"
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
                                {" "}
                                {/* Ajustado de space-y-6 para space-y-0 e mt-0 */}
                                <StudentsTable />
                            </TabsContent>

                            <TabsContent
                                value="professors"
                                className="space-y-0 mt-0"
                            >
                                {" "}
                                {/* Ajustado de space-y-6 para space-y-0 e mt-0 */}
                                <TeachersTable />
                            </TabsContent>

                            <TabsContent
                                value="groups"
                                className="space-y-0 mt-0"
                            >
                                {" "}
                                {/* Ajustado de space-y-6 para space-y-0 e mt-0 */}
                                <GroupsTable />
                            </TabsContent>
                        </Tabs>

                        <AccessCodeDialog
                            isOpen={accessCodeDialog.isOpen}
                            onClose={() =>
                                setAccessCodeDialog({
                                    ...accessCodeDialog,
                                    isOpen: false,
                                })
                            }
                            onSave={(newCode) =>
                                setAccessCodeDialog({
                                    isOpen: false,
                                    code: newCode,
                                })
                            }
                            currentCode={accessCodeDialog.code}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
