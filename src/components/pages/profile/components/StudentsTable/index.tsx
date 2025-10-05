"use client";

import { FC } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/_ui/Card";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Badge } from "@/components/_ui/Badge";
import Input from "@/components/_ui/Input";
import { Checkbox } from "@/components/_ui/Checkbox";
import { Avatar, AvatarFallback } from "@/components/_ui/Avatar";
import { Edit, Trash2, Download, Search } from "lucide-react";
import useStudentsTable from "./hooks/useStudentsTable";
import Table from "@/components/_ui/Table";
import TableHead from "@/components/_ui/Table/components/TableHeader";
import TableRow from "@/components/_ui/Table/components/TableRow";
import TableCell from "@/components/_ui/Table/components/TableCell";
import TableBody from "@/components/_ui/Table/components/TableBody";
import TableFooter from "@/components/_ui/Table/components/TableFooter";
import { TablePagination } from "@mui/material";
import TablePaginationActions from "@/components/_ui/Table/components/TablePagination";

const StudentsTable: FC = ({}) => {
    const {
        users,
        loadingUsers,
        currentPage,
        totalPages,
        searchTerm,
        setSearchTerm,
        togglePage,
        selectedUsers,
        handleSelectAll,
        handleSelectUser,
    } = useStudentsTable();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Card className="bg-white border-[#e9edee] shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl text-[#3f3c40]">
                            Gerenciar Alunos
                        </CardTitle>
                        <CardDescription className="text-xl text-[#4F85A6]">
                            Lista completa de alunos cadastrados
                        </CardDescription>
                    </div>
                    <ButtonAdm
                        variant="outline"
                        size="sm"
                        className="border-[#4F85A6] text-[#4F85A6] hover:bg-[#9abbd6] hover:text-white bg-transparent"
                    >
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
                        <TableHead>
                            <TableRow className="bg-[#e9edee] hover:bg-[#e9edee]">
                                <TableCell className="w-12 px-2">
                                    <Checkbox
                                        checked={selectedUsers.length === users.length}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell className="text-lg text-[#3f3c40] font-semibold w-[25%]">
                                    Aluno
                                </TableCell>
                                <TableCell className="text-lg text-[#3f3c40] font-semibold w-[15%]">
                                    RA
                                </TableCell>
                                <TableCell className="text-lg text-[#3f3c40] font-semibold w-[15%]">
                                    Grupo
                                </TableCell>
                                <TableCell className="text-lg text-[#3f3c40] font-semibold w-[15%]">
                                    Status
                                </TableCell>
                                <TableCell className="text-lg text-[#3f3c40] font-semibold w-[15%]">
                                    Data de Ingresso
                                </TableCell>
                                <TableCell className="text-right text-lg text-[#3f3c40] font-semibold w-[15%]">
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="hover:bg-[#e9edee] hover:bg-opacity-50"
                                >
                                    <TableCell>
                                        <Checkbox checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id, !selectedUsers.includes(user.id))} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarFallback className="bg-[#9abbd6] text-white text-base">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-base text-[#3f3c40]">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-[#4F85A6]">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-base text-[#3f3c40]">
                                        {user.ra}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="border-[#9abbd6] text-base text-[#4F85A6] bg-[#9abbd6] bg-opacity-10"
                                        >
                                            {user.group?.name || ""}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                user.status === "active"
                                                    ? "bg-[#4F85A6] text-white hover:bg-[#3f3c40] text-base"
                                                    : "bg-[#e9edee] text-[#3f3c40] text-base"
                                            }
                                        >
                                            {user.status === "active"
                                                ? "Ativo"
                                                : "Inativo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-base text-[#3f3c40]">
                                        {user.joinYear}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <ButtonAdm
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(user)}
                                                className="hover:bg-[#e9edee] text-[#4F85A6]"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </ButtonAdm>
                                            <ButtonAdm
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(user)}
                                                className="hover:bg-red-50 text-red-500"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </ButtonAdm>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="w-full">
                                <TablePagination
                                    count={users.length} // Assuming 10 items per page
                                    page={currentPage - 1}
                                    onPageChange={(e, page) => {
                                        togglePage(page + 1);
                                    }}
                                    colSpan={7}
                                    rowsPerPage={10}
                                    rowsPerPageOptions={[]}
                                    className="border-t"
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                "aria-label": "rows per page",
                                            },
                                            native: true,
                                        },
                                    }}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
export default StudentsTable;
