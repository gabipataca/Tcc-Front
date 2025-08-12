"use client";

import type React from "react";

import { FC, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Users, UserCheck, Menu } from "lucide-react";
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
import { groupsData, studentsData } from "../../hooks/mockData";
import useProfileMenu from "../../hooks/useProfileMenu";
import ExerciseManagement from "../Shared/ExerciseManagement";

const AppSidebar = () => {
    return (
        <div className="w-[280px] bg-[#4F85A6] flex flex-col items-center py-6 shadow-xl relative min-h-screen">
            <div className="mb-8">
                <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FHO</span>
                </div>
            </div>

            <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                    <FaUserCircle
                        size={120}
                        className="text-white drop-shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                </div>

                <h2 className="text-white text-xl font-semibold mb-2 drop-shadow-sm">
                    Perfil Usuário
                </h2>
                <p className="text-white/90 text-sm">E-mail Institucional</p>
            </div>

            <div className="mt-auto mb-6">
                <div className="w-32 h-10 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-white font-semibold">FALCON</span>
                </div>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "#", label: "Home", icon: Home },
        { href: "#", label: "Inscrições", icon: UserPlus },
        { href: "#", label: "Montar Exercícios", icon: BookOpen },
        { href: "#", label: "Criar Maratona", icon: Trophy },
        { href: "#", label: "Estatísticas", icon: BarChart3 },
        { href: "#", label: "Ranking", icon: Medal },
        { href: "#", label: "Dúvidas", icon: HelpCircle },
    ];

    return (
        <div className="bg-[#4F85A6] text-white shadow-lg">
            <div className="flex flex-col max-h-screen">
                <div className="flex justify-between items-center h-16 px-6">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link, index) => (
                            <div key={link.label} className="flex items-center">
                                <a
                                    href={link.href}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md"
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </a>
                                {index < navLinks.length - 1 && (
                                    <span className="text-white/60 mx-1">
                                        |
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="lg:hidden flex items-center justify-between w-full">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <ButtonAdm
                                    variant="ghost"
                                    className="text-white hover:bg-white/10"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Abrir menu</span>
                                </ButtonAdm>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="bg-[#4F85A6] text-white border-none"
                            >
                                <div className="flex flex-col space-y-4 mt-8">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="flex items-center gap-3 text-lg font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md px-3 py-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <link.icon className="h-5 w-5" />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        <div className="text-lg font-semibold lg:hidden">
                            Sistema Admin
                        </div>
                    </div>

                    <ButtonAdm
                        variant="ghost"
                        className="text-white hover:bg-white/10 hover:text-white transition-all duration-200 ml-auto lg:ml-0"
                    >
                        <FaSignOutAlt size={20} />
                        <span className="sr-only">Sair</span>
                    </ButtonAdm>
                </div>
            </div>
        </div>
    );
};

const TeacherDashboard: FC = () => {
    const { activeMenu, toggleMenu } = useProfileMenu();

    return (
        <div className="flex-1">
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#3f3c40] py-2">
                            Dashboard Administrativo
                        </h1>
                        <p className="text-lg text-[#4F85A6]">
                            Gerencie alunos e grupos
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatsCard
                        title="Total de Alunos"
                        value={studentsData.length}
                        description="Ativos no ultimo mês"
                        icon={Users}
                    />
                    <StatsCard
                        title="Grupos Ativos"
                        value={
                            groupsData.filter((g) => g.status === "active")
                                .length
                        }
                        description="Ativos no ultimo mês"
                        icon={UserCheck}
                    />
                </div>
                
                {(activeMenu === "Main") ? (
                <Tabs defaultValue="students" className="space-y-6">
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
                        <StudentsTable />
                    </TabsContent>

                    <TabsContent value="groups" className="space-y-0 mt-0">
                        <GroupsTable />
                    </TabsContent>
                </Tabs>
                ) : (activeMenu === "Exercise") ? (
                    <ExerciseManagement />
                ) : <></>}
            </div>
        </div>
    );
};

export default TeacherDashboard;
