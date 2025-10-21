"use client";

import React, { useState, useEffect } from "react";
import { Edit, Plus, Trophy, Users, X, Check, Clock, UserX } from "lucide-react";
import AddGroupModal from "./components/AddGroupModal";
import EditGroupModal from "./components/EditGroupModal";
import AddMemberModal from "./components/AddMemberModal";

// --- Tipos (Mantendo e expandindo o que você já tinha) ---
type User = {
    id: string;
    name: string;
    ra?: string; // Trocado de email para ra
    status: 'pending' | 'accepted';
};

type GroupInfo = {
    id: string;
    name: string;
    users: User[];
    isLeader: boolean; // O usuário atual é o líder?
};

type Invitation = {
    groupId: string;
    groupName: string;
    fromLeader: string;
}

// --- Componentes de UI Falsos (Mock) ---
// Para que este código seja executável, criei versões simples dos seus componentes de UI.
// Substitua estes pelos seus componentes reais de "@/components/_ui/..."

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`rounded-xl border bg-white text-slate-900 shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const CardFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);
const Badge = ({ children, className = '', variant = 'primary' }: { children: React.ReactNode, className?: string, variant?: string }) => {
    const baseStyle = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    const variants: { [key: string]: string } = {
        primary: "border-transparent bg-slate-900 text-slate-50",
        secondary: "border-transparent bg-slate-100 text-slate-900",
        warning: "border-transparent bg-amber-500 text-white",
        success: "border-transparent bg-green-500 text-white",
        outline: "text-slate-900",
    }
    return <span className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</span>;
}

const Button = ({ children, className = '', style = 'primary', size = 'md', ...props }: { children: React.ReactNode, className?: string, style?: string, size?: string, [key: string]: any }) => {
    const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const styles: { [key: string]: string } = {
        primary: "bg-[#4F85A6] text-white hover:bg-[#3C6B88]",
        'light-success': "bg-green-100 text-green-800 hover:bg-green-200",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
        danger: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    };
    const sizes: { [key: string]: string } = {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
    };
    return <button className={`${baseStyle} ${styles[style]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}
const Input = ({ className = '', ...props }) => (
    <input className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);
const Label = ({ children, className = '', ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>{children}</label>
);


// --- Seção de Informações do Grupo (Refatorada) ---
const GroupInfoSection = ({ info, onEditClick, onAddMemberClick, onLeaveClick }: { info: GroupInfo, onEditClick: () => void, onAddMemberClick: () => void, onLeaveClick: () => void }) => (
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
                    <span className="text-xl font-medium text-slate-700">Nome do Grupo</span>
                </div>
                <span className="text-lg font-medium text-slate-900 ml-8">{info.name}</span>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="text-xl font-medium text-slate-700">Integrantes do Grupo</span>
                </div>
                <div className="space-y-2 pl-8">
                    {info.users.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 text-slate-900">
                            <span className="text-lg font-medium">{member.name}</span>
                            {info.isLeader && member.id === 'user-1' && (<Badge variant="outline">Líder</Badge>)}
                            {member.status === 'pending' && (<Badge variant="warning"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
                {info.isLeader ? (
                    <>
                        <Button style="light-success" size="sm" className="text-md" onClick={onAddMemberClick} disabled={info.users.length >= 3}>
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                        </Button>
                        <Button style="outline" size="sm" className="text-md" onClick={onEditClick}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                    </>
                ) : (
                    <Button style="danger" size="sm" className="text-md" onClick={onLeaveClick}>
                        <UserX className="h-4 w-4 mr-2" />
                        Sair do Grupo
                    </Button>
                )}
            </div>
        </CardContent>
    </Card>
);

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
            <p className="text-slate-600 mb-4">Você ainda não faz parte de um grupo.</p>
            <Button style="primary" size="md" onClick={onCreateClick}>
                <Plus className="h-4 w-4 mr-2" />
                Criar um Grupo
            </Button>
        </CardContent>
    </Card>
);


// --- Seção de convite pendente ---
const InvitationSection = ({ invitation, onAccept, onDecline }: { invitation: Invitation, onAccept: () => void, onDecline: () => void }) => (
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
                <span className="font-semibold">{invitation.fromLeader}</span> convidou você para o grupo <span className="font-semibold">"{invitation.groupName}"</span>.
            </p>
            <div className="flex justify-center gap-4">
                <Button style="light-success" size="md" onClick={onAccept}>
                    <Check className="h-4 w-4 mr-2" />
                    Aceitar
                </Button>
                <Button style="danger" size="md" onClick={onDecline}>
                    <X className="h-4 w-4 mr-2" />
                    Recusar
                </Button>
            </div>
        </CardContent>
    </Card>
);


// --- Componente Principal que Gerencia o Estado ---
const GroupManagement = () => {
    // Simulação do usuário logado (vindo do seu componente StudentInfoSection)
    const currentUser = { id: 'user-1', name: 'Ana Silva' };

    // Simulação de "banco de dados" de usuários para busca por RA
    const mockUserDatabase = [
        { id: 'user-2', name: 'Bruno Costa', ra: '123456' },
        { id: 'user-3', name: 'Carla Dias', ra: '789012' },
        { id: 'user-4', name: 'Mariana Lima', ra: '345678' },
    ];

    // Simulação de estado: 'no-group', 'has-group', 'invited'
    // O estado inicial é 'invited' para mostrar o fluxo de convite.
    const [userState, setUserState] = useState<'no-group' | 'has-group' | 'invited'>('invited');

    // --- Simulação de dados ---
    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
    const [invitation, setInvitation] = useState<Invitation | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);

    // Simula o carregamento dos dados iniciais
    useEffect(() => {
        if (userState === 'invited') {
            setInvitation({
                groupId: 'group-beta',
                groupName: 'Devs do Futuro',
                fromLeader: 'Mariana Lima'
            });
            setGroupInfo(null);
        } else if (userState === 'no-group') {
            setGroupInfo(null);
            setInvitation(null);
        }
    }, [userState]);


    // --- Handlers ---
    const handleCreateGroup = (name: string, memberRAs: string[]) => {
        console.log("Criando grupo:", name, "com RAs:", memberRAs);

        const newGroup: GroupInfo = {
            id: `group-${Date.now()}`,
            name: name,
            isLeader: true, // Quem cria é o líder
            users: [
                // O usuário atual, que é o líder
                { id: currentUser.id, name: currentUser.name, status: 'accepted' },
                // Os outros membros convidados
                ...memberRAs.map((ra, index) => {
                    const foundUser = mockUserDatabase.find(user => user.ra === ra);
                    return {
                        id: foundUser ? foundUser.id : `new-user-${index}-${Date.now()}`,
                        name: foundUser ? foundUser.name : `Aluno não encontrado (RA: ${ra})`,
                        ra: ra,
                        status: 'pending' // Novos membros entram como pendentes
                    };
                })
            ]
        };

        setGroupInfo(newGroup);
        setInvitation(null); // Limpa qualquer convite pendente
        setUserState('has-group');
    };

    const handleUpdateGroup = (id: string, name: string, membersToRemove: string[]) => {
        console.log("Atualizando grupo:", id, "novo nome:", name, "remover:", membersToRemove);
        // Lógica de API aqui...
        // Após sucesso, atualize o estado local:
        if (groupInfo) {
            setGroupInfo({
                ...groupInfo,
                name: name,
                users: groupInfo.users.filter(u => !membersToRemove.includes(u.id))
            });
        }
    };

    const handleAddMembers = (memberRAs: string[]) => {
        if (!groupInfo) return;
        console.log("Adicionando RAs ao grupo:", memberRAs);

        const newMembers = memberRAs.map((ra, index) => {
            const foundUser = mockUserDatabase.find(user => user.ra === ra);
            return {
                id: foundUser ? foundUser.id : `new-user-add-${index}-${Date.now()}`,
                name: foundUser ? foundUser.name : `Aluno não encontrado (RA: ${ra})`,
                ra: ra,
                status: 'pending' as const
            };
        });

        setGroupInfo({
            ...groupInfo,
            users: [...groupInfo.users, ...newMembers]
        });
    };

    const handleAcceptInvitation = () => {
        console.log("Convite aceito!");
        // Lógica de API para aceitar o convite e buscar os dados do grupo...

        // Simula os dados do grupo que o usuário acabou de entrar
        const joinedGroup: GroupInfo = {
            id: 'group-alpha',
            name: "Esquadrão Maratona",
            isLeader: false, // Não é o líder ao aceitar convite
            users: [
                { id: 'user-4', name: 'Mariana Lima', status: 'accepted' }, // Líder do grupo
                { id: currentUser.id, name: currentUser.name, status: 'accepted' },
                { id: 'user-3', name: 'Carla Dias', status: 'pending' },
            ],
        };

        setGroupInfo(joinedGroup);
        setInvitation(null);
        setUserState('has-group');
    }

    const handleDeclineInvitation = () => {
        console.log("Convite recusado!");
        // Lógica de API aqui...
        setUserState('no-group');
    }

    const handleLeaveGroup = () => {
        console.log("Saindo do grupo!");
        // Lógica de API para remover o usuário do grupo aqui...
        setUserState('no-group'); // Volta para o estado sem grupo
    }

    const renderContent = () => {
        if (invitation) {
            return <InvitationSection invitation={invitation} onAccept={handleAcceptInvitation} onDecline={handleDeclineInvitation} />;
        }
        if (groupInfo) {
            return <GroupInfoSection
                info={groupInfo}
                onEditClick={() => setEditModalOpen(true)}
                onAddMemberClick={() => setAddMemberModalOpen(true)}
                onLeaveClick={handleLeaveGroup}
            />;
        }
        return <NoGroupSection onCreateClick={() => setAddModalOpen(true)} />;
    };

    return (
        <>
            {renderContent()}

            {(isAddModalOpen) && (
                <AddGroupModal
                    onClose={() => setAddModalOpen(false)}
                />
            )}
            
            <EditGroupModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onUpdate={handleUpdateGroup}
                group={groupInfo}
            />
            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setAddMemberModalOpen(false)}
                onAdd={handleAddMembers}
                currentSize={groupInfo?.users.length || 0}
            />
        </>
    );
};

export default GroupManagement;

