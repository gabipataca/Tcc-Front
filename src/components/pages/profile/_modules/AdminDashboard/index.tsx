"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Edit,
    ChevronLeft,
} from "lucide-react";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/_ui/Tabs";
import Button from "@/components/_ui/Button";
import AccessCodeDialog from "./components/AccessCodeDialog";
import StatsGrid from "@/components/_ui/StatsGrid";
import TeachersTable from "./components/TeachersTable";
import StudentsTable from "../../components/StudentsTable";
import GroupsTable from "../../components/GroupsTable";
import useProfileMenu from "../../hooks/useProfileMenu";
import { groupsData, professorsData, studentsData } from "../../hooks/mockData";
import ExerciseManagement from "../Shared/ExerciseManagement";
import CreateCompetition from "./pages/createCompetition";
import CreateCompetitionSubscription from "@/app/Profile/CreateSubscription/page";

const AdminDashboard: FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("students");
    const [accessCodeDialog, setAccessCodeDialog] = useState<{
        isOpen: boolean;
        code: string;
    }>({
        isOpen: false,
        code: "PROF2024",
    });

    const { activeMenu, toggleMenu } = useProfileMenu();

    const handleCardClick = (identifier: string) => {
        if (identifier === "create_subscription") {
            router.push("/Profile/CreateSubscription");
        } else if (identifier === "create_competition") {
            router.push("/Profile/CreateCompetition");
        } else if (identifier === "Exercise") {
            toggleMenu("Exercise");
        } else {
            if (activeMenu !== "Main") {
                toggleMenu("Main");
            }
            setActiveTab(identifier);
        }
    };

    return (
        <div className="flex-1">
            <div className="container mx-auto p-6 space-y-6">
                <div className="flex items-center justify-evenly gap-8">
                    {activeMenu !== "Main" && (
                        <Button
                            type="button"
                            style="ghost"
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

                <StatsGrid
                    studentsData={studentsData}
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
                ) : (
                    <></>
                )}

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
    );
};

export default AdminDashboard;