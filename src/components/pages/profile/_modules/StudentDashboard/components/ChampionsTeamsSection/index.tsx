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
import { ChampionTeam } from "../../types";

const ChampionTeamsSection: React.FC<{ teams: ChampionTeam[] }> = ({
    teams,
}) => (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg border-b border-yellow-100">
            <CardTitle className="text-2xl text-[#4F85A6] text-center flex items-center justify-center gap-3">
                <div className="h-6 w-6 bg-yellow-600 rounded-full" />
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
                        {teams.map((team, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-slate-50/50 transition-colors"
                            >
                                <TableCell className="text-xl px-20 pl-40">
                                    {team.year}
                                </TableCell>
                                <TableCell className="text-left pl-16">
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 bg-yellow-500 rounded-full" />
                                        <span className="text-xl">
                                            {team.teamName}
                                        </span>
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

export default ChampionTeamsSection;
