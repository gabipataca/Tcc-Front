"use client";

import type React from "react";
import { FC, useState } from "react";
import { Users, UserCheck, Menu, Package, ChevronLeft } from "lucide-react";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/_ui/Tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/_ui/Sheet";
import {
    Home,
    UserPlus,
    BookOpen,
    Trophy,
    BarChart3,
    Medal,
    HelpCircle,
} from "lucide-react";
import StudentsTable from "../../components/StudentsTable";
import GroupsTable from "../../components/GroupsTable";
import StatsCard from "../../components/StatsCard";
import { groupsData, studentsData, Student, Group } from "../../hooks/mockData";
import useProfileMenu from "../../hooks/useProfileMenu";
import ExerciseManagement from "../Shared/ExerciseManagement";

// 1. Importar o Modal que vamos usar
import { EditDeleteModal } from "@/components/pages/perfilAdm/EditDeleteModal";

// Navbar e Sidebar não precisam de alterações, então foram omitidos para clareza
const AppSidebar = () => { /* ... seu código existente ... */ };
const Navbar = () => { /* ... seu código existente ... */ };

const TeacherDashboard: FC = () => {
    const { activeMenu, toggleMenu } = useProfileMenu();
    const [activeTab, setActiveTab] = useState("students");

    // 2. Adicionar o estado para alunos, grupos e para o modal
    const [students, setStudents] = useState<Student[]>(studentsData);
    const [groups, setGroups] = useState<Group[]>(groupsData);
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: "edit" | "delete";
        item: Student | Group | null;
        itemType: string;
    }>({
        isOpen: false,
        mode: "edit",
        item: null,
        itemType: "",
    });

    // 3. Adicionar as funções para controlar o modal
    const openModal = (item: Student | Group, itemType: string, mode: "edit" | "delete") => {
        setModalState({ isOpen: true, item, itemType, mode });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, item: null, itemType: "", mode: "edit" });
    };

    const handleConfirmModal = (updatedItem?: Student | Group) => {
        const { mode, item, itemType } = modalState;

        if (mode === "delete" && item) {
            if (itemType === "Aluno") setStudents(prev => prev.filter(s => s.id !== item.id));
            if (itemType === "Grupo") setGroups(prev => prev.filter(g => g.id !== item.id));
        } else if (mode === "edit" && updatedItem) {
            if (itemType === "Aluno") setStudents(prev => prev.map(s => s.id === updatedItem.id ? (updatedItem as Student) : s));
            if (itemType === "Grupo") setGroups(prev => prev.map(g => g.id === updatedItem.id ? (updatedItem as Group) : g));
        }
        
        closeModal();
    };

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
            value: students.length, // Usar o estado
            description: "Ativos no ultimo mês",
            icon: Users,
            action: () => {
                toggleMenu("Main");
                setActiveTab("students");
            },
        },
        {
            id: "groups",
            title: "Grupos Ativos",
            value: groups.filter((g) => g.status === "active").length, // Usar o estado
            description: "Ativos no ultimo mês",
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
                <div className="flex items-center gap-8">
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

                        <TabsContent
                            value="students"
                            className="space-y-0 mt-0"
                        >
                            {/* 4. Passar os dados e funções como props para a tabela */}
                            <StudentsTable 
                                students={students}
                                onEdit={(s) => openModal(s, "Aluno", "edit")}
                                onDelete={(s) => openModal(s, "Aluno", "delete")}
                            />
                        </TabsContent>

                        <TabsContent value="groups" className="space-y-0 mt-0">
                            {/* 4. Passar os dados e funções como props para a tabela */}
                            <GroupsTable 
                                groups={groups}
                                onEdit={(g) => openModal(g, "Grupo", "edit")}
                                onDelete={(g) => openModal(g, "Grupo", "delete")}
                            />
                        </TabsContent>
                    </Tabs>
                ) : activeMenu === "Exercise" ? (
                    <ExerciseManagement />
                ) : (
                    <></>
                )}

                {/* 5. Adicionar a renderização do modal */}
                {modalState.isOpen && (
                    <EditDeleteModal
                        isOpen={modalState.isOpen}
                        onClose={closeModal}
                        onConfirm={handleConfirmModal}
                        item={modalState.item}
                        itemType={modalState.itemType}
                        mode={modalState.mode}
                    />
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;