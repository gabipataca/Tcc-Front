import { Badge } from "@/components/_ui/Badge";
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
import { CompetitionHistory } from "../../types";
import { Trophy } from "lucide-react";
import Loading from "@/components/_ui/Loading";

const CompetitionHistorySection: React.FC<{
    history: CompetitionHistory[];
}> = ({ history }) => (
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
                            <TableHead className=" text-2xl  text-slate-700 text-center">
                                Ano
                            </TableHead>
                            <TableHead className=" text-2xl  text-slate-700 text-center">
                                Nome do Grupo
                            </TableHead>
                            <TableHead className=" text-2xl  text-slate-700 text-center">
                                Questões
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="relative">
                        {history.map((item, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-slate-50/50 transition-colors"
                            >
                                <TableCell className=" text-xl text-center">
                                    {item.year}
                                </TableCell>
                                <TableCell className="text-center  text-xl">
                                    {item.groupName}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant="secondary"
                                        className={`text-xl ${
                                            item.questions === "8/12"
                                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                : item.questions === "6/12"
                                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                        }`}
                                    >
                                        {item.questions}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {history.length === 0 && (
                <div className="h-40 w-full flex justify-center items-center">
                    <p className="text-slate-600 text-3xl">
                        Nenhuma participação
                    </p>
                </div>
            )}
        </CardContent>
    </Card>
);

export default CompetitionHistorySection;
