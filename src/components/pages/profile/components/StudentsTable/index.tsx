"use client";

import { FC, useState } from "react";
import { Student } from "../../hooks/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/_ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/TableAdm";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Badge } from "@/components/_ui/Badge";
import Input from "@/components/_ui/Input";
import { Checkbox } from "@/components/_ui/Checkbox";
import { Avatar, AvatarFallback } from "@/components/_ui/Avatar";
import { Edit, Trash2, Download, Search } from "lucide-react";

interface StudentsTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentsTable: FC<StudentsTableProps> = ({ students, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.ra.toString().includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <Card className="bg-white border-[#e9edee] shadow-sm">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-3xl text-[#3f3c40]">Gerenciar Alunos</CardTitle>
                    <CardDescription className="text-xl text-[#4F85A6]">Lista completa de alunos cadastrados</CardDescription>
                </div>
                <ButtonAdm variant="outline" size="sm" className="border-[#4F85A6] text-[#4F85A6] hover:bg-[#9abbd6] hover:text-white bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                </ButtonAdm>
            </div>
            <div className="relative mt-2">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F85A6] w-5 h-5" />
                 <Input
                    placeholder="Buscar por nome, RA ou grupo..."
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
                            <TableHead className="w-12 px-2"><Checkbox /></TableHead>
                            <TableHead className="text-lg text-[#3f3c40] font-semibold w-[25%]">Aluno</TableHead>
                            <TableHead className="text-lg text-[#3f3c40] font-semibold w-[15%]">RA</TableHead>
                            <TableHead className="text-lg text-[#3f3c40] font-semibold w-[15%]">Grupo</TableHead>
                            <TableHead className="text-lg text-[#3f3c40] font-semibold w-[15%]">Status</TableHead>
                            <TableHead className="text-lg text-[#3f3c40] font-semibold w-[15%]">Data de Ingresso</TableHead>
                            <TableHead className="text-right text-lg text-[#3f3c40] font-semibold w-[15%]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((student) => (
                            <TableRow key={student.id} className="hover:bg-[#e9edee] hover:bg-opacity-50">
                                <TableCell><Checkbox /></TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9">
                                            <AvatarFallback className="bg-[#9abbd6] text-white text-base">{getInitials(student.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-base text-[#3f3c40]">{student.name}</div>
                                            <div className="text-sm text-[#4F85A6]">{student.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-base text-[#3f3c40]">{student.ra}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="border-[#9abbd6] text-base text-[#4F85A6] bg-[#9abbd6] bg-opacity-10">{student.group}</Badge>
                                </TableCell>
                                <TableCell>
                                     <Badge className={student.status === "active" ? "bg-[#4F85A6] text-white hover:bg-[#3f3c40] text-base" : "bg-[#e9edee] text-[#3f3c40] text-base"}>
                                        {student.status === 'active' ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-base text-[#3f3c40]">{student.joinDate}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <ButtonAdm variant="ghost" size="sm" onClick={() => onEdit(student)} className="hover:bg-[#e9edee] text-[#4F85A6]"><Edit className="w-5 h-5" /></ButtonAdm>
                                        <ButtonAdm variant="ghost" size="sm" onClick={() => onDelete(student)} className="hover:bg-red-50 text-red-500"><Trash2 className="w-5 h-5" /></ButtonAdm>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
  );
};
export default StudentsTable;