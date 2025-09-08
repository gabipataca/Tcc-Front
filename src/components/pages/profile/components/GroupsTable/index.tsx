import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { FC } from "react";
import { Edit, Search, Trash2 } from "lucide-react";
import Input from "@/components/_ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/_ui/Select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/_ui/TableAdm";
import { Badge } from "@/components/_ui/Badge";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import useGroupsTable from "./hooks/useGroupsTable";

const GroupsTable: FC = () => {
    const {
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        filteredGroups,
    } = useGroupsTable();

    return (
        <Card className="bg-white border-[#e9edee] shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-3xl text-[#3f3c40]">
                            Gerenciar Grupos
                        </CardTitle>
                        <CardDescription className="text-xl text-[#4F85A6]">
                            Lista de grupos e última competição
                        </CardDescription>
                    </div>
                </div>

                <div className="flex gap-4 mt-2">
                    
                    {/* Ajustado de mt-4 para mt-2 */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F85A6] w-5 h-5" />
                        <Input
                            placeholder="Buscar grupo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-40 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#e9edee] text-base">
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="rounded-md border border-[#e9edee]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#e9edee] hover:bg-[#e9edee]">
                                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[20%]">
                                    Grupo
                                </TableHead>
                                {/* Ajustado para text-lg e largura */}
                                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[20%]">
                                    Membros
                                </TableHead>
                                {/* Ajustado para text-lg e largura */}
                                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[20%]">
                                    Status
                                </TableHead>
                                {/* Ajustado para text-lg e largura */}
                                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[17%]">
                                    Última Competição
                                </TableHead>
                                {/* Ajustado para text-lg e largura */}
                                <TableHead className="text-right text-xl text-[#3f3c40] font-semibold w-[7%]">
                                    Ações
                                </TableHead>
                                {/* Ajustado para text-lg e largura */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGroups.map((group) => (
                                <TableRow
                                    key={group.id}
                                    className="hover:bg-[#e9edee] hover:bg-opacity-50"
                                >
                                    <TableCell className="font-medium text-base text-[#3f3c40]">
                                        {group.name}
                                    </TableCell>
                                    {/* Ajustado para text-base */}
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="border-[#9abbd6] text-base text-[#4F85A6] bg-[#9abbd6] bg-opacity-10"
                                        >
                                            
                                            {/* Ajustado para text-base */}
                                            {group.members} membros
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                group.status === "active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                group.status === "active"
                                                    ? "bg-[#4F85A6] text-white hover:bg-[#3f3c40] text-base"
                                                    : "bg-[#e9edee] text-[#3f3c40] text-base"
                                            }
                                        >
                                            {group.status === "active"
                                                ? "Ativo"
                                                : "Inativo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-base text-[#3f3c40]">
                                        {new Date(
                                            group.lastCompetition
                                        ).toLocaleDateString("pt-BR")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <ButtonAdm
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-[#e9edee] text-[#4F85A6]"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </ButtonAdm>
                                            <ButtonAdm
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-red-50 text-red-500"
                                            >
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
    );
};

export default GroupsTable;
