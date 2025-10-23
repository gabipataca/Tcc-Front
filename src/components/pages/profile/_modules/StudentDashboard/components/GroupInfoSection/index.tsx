"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    Plus,
    Users,
} from "lucide-react";
import AddGroupModal from "./components/AddGroupModal";
import EditGroupModal from "./components/EditGroupModal";
import AddMemberModal from "./components/AddMemberModal";
import { useUser } from "@/contexts/UserContext";
import GroupInfoSection from "./components/GroupInfoSection";
import InvitationSection from "./components/InvitationSection";
import GroupService from "@/services/GroupService";
import { useSnackbar } from "notistack";
import { GroupInvitation } from "@/types/Group";

// --- Componentes de UI Falsos (Mock) ---
// Para que este código seja executável, criei versões simples dos seus componentes de UI.
// Substitua estes pelos seus componentes reais de "@/components/_ui/..."

const Card = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`rounded-xl border bg-white text-slate-900 shadow-sm ${className}`}
    >
        {children}
    </div>
);
const CardHeader = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);
const CardTitle = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <h3
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
        {children}
    </h3>
);
const CardContent = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

const Button = ({
    children,
    className = "",
    style = "primary",
    size = "md",
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    style?: string;
    size?: string;
    [key: string]: any;
}) => {
    const baseStyle =
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const styles: { [key: string]: string } = {
        primary: "bg-[#4F85A6] text-white hover:bg-[#3C6B88]",
        "light-success": "bg-green-100 text-green-800 hover:bg-green-200",
        outline:
            "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
        danger: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    };
    const sizes: { [key: string]: string } = {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
    };
    return (
        <button
            className={`${baseStyle} ${styles[style]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// --- Seção para quando não há grupo ---
const NoGroupSection = ({ onCreateClick }: { onCreateClick: () => void }) => (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
            <CardTitle className="text-2xl text-[#4F85A6] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#4F85A6]" />
                </div>
                Informações do Grupo
            </CardTitle>
        </CardHeader>
        <CardContent className="text-center p-10">
            <p className="text-slate-600 mb-4">
                Você ainda não faz parte de um grupo.
            </p>
            <Button style="primary" size="md" onClick={onCreateClick}>
                <Plus className="h-4 w-4 mr-2" />
                Criar um Grupo
            </Button>
        </CardContent>
    </Card>
);

const GroupManagement = () => {
    const { user } = useUser();

    // Simulação de estado: 'no-group', 'has-group', 'invited'
    // O estado inicial é 'invited' para mostrar o fluxo de convite.
    const [userState, setUserState] = useState<
        "no-group" | "has-group" | "invited"
    >("invited");

    const { enqueueSnackbar } = useSnackbar();

    const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
    const [invitations, setInvitations] = useState<GroupInvitation[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const loadInvitations = useCallback(async () => {
        try {
            setIsLoadingInvitations(true);
            const response = await GroupService.GetGroupInvitations();

            if (response.status == 200) {
                setInvitations(response.data!);
                setIsLoadingInvitations(false);

                return;
            }
        } catch (error) {
            console.error("Erro ao carregar convites:", error);

            enqueueSnackbar(
                "Não foi possível carregar os convites de grupo. Tente novamente mais tarde.",
                {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                }
            );
        }

        setIsLoadingInvitations(false);
    }, [enqueueSnackbar]);

    const handleLeaveGroup = (groupId: number) => {
        console.log("Saindo do grupo!");
        // Lógica de API para remover o usuário do grupo aqui...
        setUserState("no-group"); // Volta para o estado sem grupo
    };

    const onAcceptInvitation = () => {
        setInvitations([]);
    }

    const renderContent = useMemo(() => {
        if (invitations.length > 0 && user?.group == null) {
            return (
                <div className="flex flex-col gap-2 w-full h-full p-6">
                    {invitations.map((invitation) => (
                        <InvitationSection
                            onAccept={onAcceptInvitation}
                            invitation={invitation}
                            key={`${invitation.id}-${invitation.userId}`}
                        />
                    ))}
                </div>
            );
        }
        if (user?.group) {
            return (
                <GroupInfoSection
                    group={user.group}
                    onEditClick={() => setIsEditModalOpen(true)}
                    onAddMemberClick={() => setIsAddMemberModalOpen(true)}
                    onLeaveClick={handleLeaveGroup}
                />
            );
        }
        return <NoGroupSection onCreateClick={() => setIsAddModalOpen(true)} />;
    }, [invitations, user?.group]);


    const hasMember1 = (user?.group?.users.length || 0) > 1;
    const hasMember2 = (user?.group?.users.length || 0) > 2;

    useEffect(() => {
        loadInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadInvitations]);

    return (
        <div className="h-full bg-gradient-to-br from-white to-slate-50">
            {renderContent}

            {isAddModalOpen && !user?.group && (
                <AddGroupModal onClose={() => setIsAddModalOpen(false)} />
            )}

            {isEditModalOpen && user?.group && (
                <EditGroupModal onClose={() => setIsEditModalOpen(false)} />
            )}

            {isAddMemberModalOpen && user?.group && (
                <AddMemberModal
                    onClose={() => setIsAddMemberModalOpen(false)}
                    hasMember1={hasMember1}
                    hasMember2={hasMember2}
                    groupInvitations={invitations}
                />
            )}
        </div>
    );
};

export default GroupManagement;
