import Button from "@/components/_ui/Button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { GroupInvitation } from "@/types/Group";
import { Check, Clock, X } from "lucide-react";
import { useMemo } from "react";
import useInvitationSection from "./hooks/useInvitationSection";

// --- Seção de convite pendente ---
const InvitationSection = ({
    invitation,
    onAccept,
}: {
    invitation: GroupInvitation;
    onAccept: (groupId: number) => Promise<void>;
}) => {
    const { handleAccept, isLoading } = useInvitationSection(
        onAccept,
    );

    const leaderName = useMemo(() => {
        const users = invitation.group.users;
        const leader = users.find(
            (user) => user.id === invitation.group.leaderId
        );

        return leader ? leader.name : "Líder Desconhecido";
    }, [invitation.group.users, invitation.group.leaderId]);

    return (
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
                <CardTitle className="text-xl text-amber-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    Convite Pendente
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center p-8 space-y-4">
                <p className="text-slate-700">
                    <span className="font-semibold">{leaderName}</span> convidou
                    você para o grupo{" "}
                    <span className="font-semibold">
                        &quot;{invitation.group.name}&quot;
                    </span>
                    .
                </p>
                <div className="flex justify-center gap-4">
                    <Button
                        variant="light-success"
                        size="md"
                        rounded
                        disabled={isLoading}
                        loading={isLoading}
                        onClick={() => handleAccept(invitation.group.id)}
                    >
                        <Check className="h-4 w-4 mr-2" />
                        Aceitar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InvitationSection;
