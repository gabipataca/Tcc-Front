import { Badge } from "@/components/_ui/Badge";
import Button from "@/components/_ui/Button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { useUser } from "@/contexts/UserContext";
import { Group } from "@/types/Group";
import { Edit, Plus, Trophy, Users, UserX } from "lucide-react";

const GroupInfoSection = ({
    group,
    onEditClick,
    onAddMemberClick,
    onLeaveClick,
}: {
    group: Group;
    onEditClick: () => void;
    onAddMemberClick: () => void;
    onLeaveClick: () => void;
}) => {
    const { user } = useUser();

    return (
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-4 bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg">
                <CardTitle className="text-2xl text-[#4F85A6] flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#4F85A6]" />
                    </div>
                    Informações do Grupo
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                        <Trophy className="h-5 w-5 text-blue-600" />
                        <span className="text-xl font-medium text-slate-700">
                            Nome do Grupo
                        </span>
                    </div>
                    <span className="text-lg font-medium text-slate-900 ml-8">
                        {group.name}
                    </span>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="text-xl font-medium text-slate-700">
                            Integrantes do Grupo
                        </span>
                    </div>
                    <div className="space-y-2 pl-8">
                        {group?.users.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center gap-3 text-slate-900"
                            >
                                <span className="text-lg font-medium">
                                    {member.name}
                                </span>
                                {group.leaderId == member.id && (
                                    <Badge variant="outline">Líder</Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                    {group.leaderId == user?.id ? (
                        <>
                            <Button
                                variant="light-success"
                                size="sm"
                                className="text-md"
                                onClick={onAddMemberClick}
                                disabled={group.users.length >= 3}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-md"
                                onClick={onEditClick}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="destructive"
                            size="sm"
                            className="text-md"
                            onClick={onLeaveClick}
                        >
                            <UserX className="h-4 w-4 mr-2" />
                            Sair do Grupo
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default GroupInfoSection;
