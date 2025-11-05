"use client";

import type React from "react";
import { FC, useState } from "react";
import { Users, UserCheck, Package, ChevronLeft } from "lucide-react";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/_ui/Tabs";
import StudentsTable from "../../components/StudentsTable";
import GroupsTable from "../../components/GroupsTable";
import StatsCard from "../../components/StatsCard";
import useProfileMenu from "../../hooks/useProfileMenu";
import ExerciseManagement from "../Shared/ExerciseManagement";
import DepartmentModal from "@/components/pages/profile/_modules/TeacherDashboard/components/DepartmentModal";

const TeacherDashboard: FC = () => {
    const { activeMenu, toggleMenu } = useProfileMenu();
    const [activeTab, setActiveTab] = useState("students");

    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);

    const stats = [
        {
            id: "exercises",
            title: "Exercícios",
            value: 20,
            description: "Exercícios disponíveis",
            icon: Package,
            action: () => toggleMenu("Exercise"),
        },
        {
            id: "students",
            title: "Total de Alunos",
            value: 2,
            description: "Ativos no último mês",
            icon: Users,
            action: () => {
                toggleMenu("Main");
                setActiveTab("students");
            },
        },
        {
            id: "groups",
            title: "Grupos Ativos",
            value: 2,
            description: "Ativos no último mês",
            icon: UserCheck,
            action: () => {
                toggleMenu("Main");
                setActiveTab("groups");
            },
        },
    ];

    return (
        <div className="flex-1">
            <div className="container mx-auto p-6 space-y-6">
                <div className="flex items-center gap-8 justify-between">
                    {activeMenu !== "Main" && (
                        <ButtonAdm
                            type="button"
                            variant="ghost"
                            size="default"
                            onClick={() => toggleMenu("Main")}
                        >
                            <ChevronLeft className="w-6 h-auto mr-2" />
                        </ButtonAdm>
                    )}
                    <div className="mr-auto">
                        <h1 className="text-4xl font-bold text-[#3f3c40] py-2">
                            Dashboard do Professor
                        </h1>
                        <p className="text-lg text-[#4F85A6]">
                            Gerencie alunos, grupos e exercícios
                        </p>
                    </div>

                    <ButtonAdm
                        type="button"
                        variant="default"
                        size="default"
                        onClick={() => setIsDeptModalOpen(true)}
                        className="bg-[#4F85A6] hover:bg-[#3b6e8a] text-white font-semibold"
                    >
                        Editar Departamento
                    </ButtonAdm>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            onClick={stat.action}
                            className="cursor-pointer transition-transform duration-200 hover:scale-105"
                        >
                            <StatsCard
                                title={stat.title}
                                value={stat.value}
                                description={stat.description}
                                icon={stat.icon}
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>

                {activeMenu === "Main" ? (
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-6"
                    >
                        <TabsList className="grid w-full grid-cols-2 bg-white border border-[#e9edee]">
                            <TabsTrigger
                                value="students"
                                className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-1 py-0.5"
                            >
                                Alunos
                            </TabsTrigger>
                            <TabsTrigger
                                value="groups"
                                className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-3 py-0.5"
                            >
                                Grupos
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="students" className="space-y-0 mt-0">
                            <StudentsTable
                        />
                    </TabsContent>

                    <TabsContent value="groups" className="space-y-0 mt-0">
                        <GroupsTable
                        />
                    </TabsContent>
                </Tabs>
            ) : activeMenu === "Exercise" ? (
                <ExerciseManagement />
            ) : null}

            {isDeptModalOpen && (
                <DepartmentModal
                    open={isDeptModalOpen}
                    onClose={() => setIsDeptModalOpen(false)}
                />
            )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
