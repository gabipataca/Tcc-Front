"use client";

import { FC, useState } from "react";
import { Professor } from "../../hooks/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/Avatar";
import { Badge } from "@/components/_ui/Badge";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/TableAdm";
import { Edit, Search, Trash2 } from "lucide-react";

// 1. Definir a interface de props
interface TeachersTableProps {
    professors: Professor[];
    onEdit: (professor: Professor) => void;
    onDelete: (professor: Professor) => void;
}

// 2. Usar a interface e receber as props
const TeachersTable: FC<TeachersTableProps> = ({ professors, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // 3. Usar a prop 'professors' para a filtragem
    const filteredProfessors = professors.filter(
        (professor) =>
            professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professor.department.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    return (
        <Card className="bg-white border-[#e9edee] shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl text-[#3f3c40]">Gerenciar Professores</CardTitle>
                    </div>
                </div>
                <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F85A6] w-5 h-5" />
                    <Input
                        placeholder="Buscar professor ou departamento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                    />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="rounded-md border border-[#e9edee]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#e9edee] hover:bg-[#e9edee]">
                                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[25%]">Professor</TableHead>
                                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[20%]">Departamento</TableHead>
                                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[18%]">Exercícios Enviados</TableHead>
                                <TableHead className="text-right text-lg text-[#3f3c40] font-semibold w-[15%]">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProfessors.map((professor) => (
                                <TableRow key={professor.id} className="hover:bg-[#e9edee] hover:bg-opacity-50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                                                <AvatarFallback className="bg-[#9abbd6] text-white text-base">
                                                    {getInitials(professor.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-base text-[#3f3c40]">{professor.name}</div>
                                                <div className="text-sm text-[#4F85A6]">{professor.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-base text-[#3f3c40]">{professor.department}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono border-[#9abbd6] text-base text-[#4F85A6] bg-[#9abbd6] bg-opacity-10">
                                            {professor.exercises} exercícios
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* 4. Conectar os botões às funções onEdit e onDelete */}
                                            <ButtonAdm variant="ghost" size="sm" onClick={() => onEdit(professor)} className="hover:bg-[#e9edee] text-[#4F85A6]">
                                                <Edit className="w-5 h-5" />
                                            </ButtonAdm>
                                            <ButtonAdm variant="ghost" size="sm" onClick={() => onDelete(professor)} className="hover:bg-red-50 text-red-500">
                                                <Trash2 className="w-5 h-5" />
                                            </ButtonAdm>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default TeachersTable;