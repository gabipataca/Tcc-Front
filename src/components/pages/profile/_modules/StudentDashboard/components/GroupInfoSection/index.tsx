import { Badge } from "@/components/_ui/Badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { GroupInfo } from "../../types";
import Button from "@/components/_ui/Button";
import { Edit, Plus, Trophy, Users } from "lucide-react";

const GroupInfoSection: React.FC<{ info?: GroupInfo }> = ({ info }) => (
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
                            {info?.name}
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
                        {info?.users.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-slate-900 px-10 pl-25"
                            >
                                <div
                                    className={`w-2 h-2 ${
                                        index === 0
                                            ? "bg-green-500"
                                            : index === 1
                                            ? "bg-blue-500"
                                            : "bg-purple-500"
                                    } rounded-full`}
                                ></div>
                                <span className="text-2xl font-medium">
                                    {member.name}
                                </span>
                                {info?.isLeader && index === 0 && (
                                    <Badge
                                        variant="outline"
                                        className="text-lg"
                                    >
                                        Líder
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
                <Button style="light-success" size="sm" className=" text-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                </Button>
                <Button style="outline" size="sm" className=" text-xl">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default GroupInfoSection;
