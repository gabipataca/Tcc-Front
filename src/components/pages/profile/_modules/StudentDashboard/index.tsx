"use client";

import type React from "react";
import {
    Edit,
    Plus,
    Users,
    Trophy,
    Calendar,
    Mail,
    Hash,
    UserCheck,
} from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/_ui/TableAdm";
import { Badge } from "@/components/_ui/Badge";
import Button from "@/components/_ui/Button";
import { useUser } from "@/contexts/UserContext";

const StudentDashboard: React.FC = () => {
    const { user } = useUser();

    return (
        <>
            {/* Conteúdo Principal */}
            <div className="flex-1 flex flex-col bg-gray-200">
                {/* Navbar Superior 
                <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3 px-6">
                    <nav className="flex space-x-6 text-lg">
                        <a href="#" className="hover:underline">
                            Home
                        </a>
                        <span>|</span>
                        <a href="#" className="hover:underline">
                            Inscreva-se
                        </a>
                    </nav>
                    <button className="text-white ml-auto">
                        <FaSignOutAlt size={24} />
                    </button>
                </div>
                */}

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
                                <Button type="button" style="primary" rounded className="text-xl">
                                    <Users className="h-4 w-4 mr-2" />
                                    Criar Grupo
                                </Button>
                                <Button type="button" style="success" rounded className="text-xl">
                                    <Trophy className="h-4 w-4 mr-2" />
                                    Iniciar Maratona
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <main className="px-40 py-8">
                        <div className="max-w-full space-y-8">

                            {/* Componentizar */}
                            {/* Information Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Student Information */}
                                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
                                    <CardHeader className="pb-4 bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg">
                                        <CardTitle className="text-2xl text-[#4F85A6] flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
                                                <UserCheck className="h-5 w-5 text-[#4F85A6]" />
                                            </div>
                                            Informações do Aluno
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6 p-6">
                                        <div className="space-y-4 pl-12">
                                            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Users className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-600 text-2xl">
                                                        Nome Completo
                                                    </span>
                                                    <p className="text-slate-900 font-semibold text-xl">
                                                        {user?.name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <Calendar className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-600 text-2xl">
                                                        Data de Nascimento
                                                    </span>
                                                    <p className="text-slate-900 font-semibold text-xl">
                                                        {user?.joinYear}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Mail className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-600 text-2xl">
                                                        E-mail Institucional
                                                    </span>
                                                    <p className="text-slate-900 font-semibold  text-xl">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <Hash className="h-4 w-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <span className="font-medium text-slate-600 text-2xl">
                                                        Registro Acadêmico
                                                    </span>
                                                    <p className="text-slate-900 font-semibold text-xl">
                                                        {user?.ra}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <Button
                                                type="button"
                                                style="outline"
                                                size="sm"
                                                className=" text-xl text-[#4F85A6] border-[#4F85A6]/20 hover:bg-[#4F85A6]/5 hover:border-[#4F85A6]/40 transition-all duration-200"
                                            >
                                                <Edit className=" h-4 w-4 mr-2" />
                                                Editar Informações
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Componentizar */}
                                {/* Group Information */}
                                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
                                    <CardHeader className="pb-4 bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg">
                                        <CardTitle className="text-2xl text-[#4F85A6] flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
                                                <Users className="h-5 w-5 text-[#4F85A6]" />
                                            </div>
                                            Informações do Grupo
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6 p-6 px-16 pl-20">
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                                                <div className="flex items-center gap-3 mb-3 pl-10">
                                                    <Trophy className="h-5 w-5 text-blue-600" />
                                                    <span className=" text-2xl font-medium text-slate-700">
                                                        Nome do Grupo
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between pl-20">
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-[#4F85A6] text-white hover:bg-[#3C6B88] text-xl"
                                                    >
                                                        Code Warriors
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className=" px-10 pl-25 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Users className="h-5 w-5 text-green-600" />
                                                    <span className=" text-2xl font-medium text-slate-700">
                                                        Integrantes do Grupo
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-slate-900 px-10 pl-25">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-2xl font-medium">
                                                            João Silva Santos
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-lg"
                                                        >
                                                            Líder
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-900 px-10 pl-25">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        <span className="text-2xl font-medium">
                                                            Maria Oliveira Costa
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-900 px-10 pl-25">
                                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                        <span className="text-2xl font-medium ">
                                                            Pedro Souza Lima
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end gap-2">
                                            <Button
                                                style="light-success"
                                                size="sm"
                                                className=" text-xl"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Adicionar
                                            </Button>
                                            <Button
                                                style="outline"
                                                size="sm"
                                                className=" text-xl"
                                            >
                                                <Edit className="h-4 w-4 mr-2" />
                                                Editar
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Componentizar */}
                            {/* Tables */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Componentizar */}
                                {/* Competition History */}
                                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                                    <CardHeader className="bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg">
                                        <CardTitle className="text-2xl text-[#4F85A6] text-center flex items-center justify-center gap-3">
                                            <Trophy className="h-6 w-6" />
                                            Histórico de Competições
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-hidden">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                                                        <TableHead className=" text-2xl  text-slate-700 text-center">
                                                            Ano
                                                        </TableHead>
                                                        <TableHead className=" text-2xl  text-slate-700 text-center">
                                                            Nome do Grupo
                                                        </TableHead>
                                                        <TableHead className=" text-2xl  text-slate-700 text-center">
                                                            Questões
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                                                        <TableCell className=" text-xl text-center">
                                                            2023
                                                        </TableCell>
                                                        <TableCell className="text-center  text-xl">
                                                            Code Warriors
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="secondary"
                                                                className=" text-xl bg-green-100 text-green-800 hover:bg-green-200"
                                                            >
                                                                8/12
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                                                        <TableCell className=" text-xl text-center">
                                                            2022
                                                        </TableCell>
                                                        <TableCell className="text-center  text-xl">
                                                            Dev Masters
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="secondary"
                                                                className=" text-xl bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                            >
                                                                6/12
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                                                        <TableCell className=" text-xl text-center">
                                                            2021
                                                        </TableCell>
                                                        <TableCell className="text-center  text-xl">
                                                            Algorithm Aces
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="secondary"
                                                                className=" text-xl bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                                            >
                                                                4/12
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Componentizar */}
                                {/* Champion Teams */}
                                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
                                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg border-b border-yellow-100">
                                        <CardTitle className="text-2xl text-[#4F85A6] text-center flex items-center justify-center gap-3">
                                            <Trophy className="h-6 w-6 text-yellow-600" />
                                            Equipes Campeãs
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-hidden">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                                                        <TableHead className="text-2xl text-slate-700 px-20 pl-40">
                                                            Ano
                                                        </TableHead>
                                                        <TableHead className="text-2xl text-slate-700 px-20 pl-13">
                                                            Time Campeão
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                                                        <TableCell className="text-xl px-20 pl-40">
                                                            2023
                                                        </TableCell>
                                                        <TableCell className="text-left pl-16">
                                                            <div className="flex items-center gap-2">
                                                                <Trophy className="h-4 w-4 text-yellow-500" />
                                                                <span className="text-xl">
                                                                    Binary
                                                                    Legends
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                                                        <TableCell className="text-xl px-20 pl-40">
                                                            2022
                                                        </TableCell>
                                                        <TableCell className="text-left pl-16">
                                                            <div className="flex items-center gap-2">
                                                                <Trophy className="h-4 w-4 text-yellow-500" />
                                                                <span className="text-xl">
                                                                    Code Ninjas
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow className="hover:bg-slate-50/50 transition-colors">
                                                        <TableCell className="text-xl px-20 pl-40">
                                                            2021
                                                        </TableCell>
                                                        <TableCell className="text-left pl-16">
                                                            <div className="flex items-center gap-2">
                                                                <Trophy className="h-4 w-4 text-yellow-500" />
                                                                <span className="text-xl">
                                                                    Debug
                                                                    Masters
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
