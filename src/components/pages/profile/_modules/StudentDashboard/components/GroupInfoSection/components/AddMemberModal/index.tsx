import Button from "@/components/_ui/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import Label from "@/components/_ui/Label";
import { useUser } from "@/contexts/UserContext";
import GroupService from "@/services/GroupService";
import { ServerSideResponse } from "@/types/Global";
import { GroupInvitation } from "@/types/Group";
import { InviteUserToGroupResponse } from "@/types/Group/Responses";
import { Plus } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState } from "react";

// --- Componente: Modal de Adicionar Integrante ---
const AddMemberModal = ({
    groupInvitations,
    onClose,
}: {
    groupInvitations: GroupInvitation[];
    onClose: () => void;
    hasMember1?: boolean;
    hasMember2?: boolean;
}) => {
    const { user, setUser } = useUser();

    const [isLoading, setIsLoading] = useState(false);

    const [memberRA1, setMemberRA1] = useState("");
    const [memberRA2, setMemberRA2] = useState("");
    const slotsAvailable =
        3 - (user!.group!.users.length + groupInvitations.length);

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const membersToAdd = [memberRA1, memberRA2].filter(
                (m) => m.trim() !== ""
            );
            
            if (membersToAdd.length === 0) {
                enqueueSnackbar(
                    "Por favor, informe pelo menos um RA válido.",
                    {
                        variant: "warning",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }
                );
                setIsLoading(false);
                return;
            }

            if (membersToAdd.length > 0) {
                const responses: ServerSideResponse<InviteUserToGroupResponse>[] = [];
                const alreadyInvited: string[] = [];

                for (const ra of membersToAdd) {
                    // Verifica se já existe convite pendente
                    if(groupInvitations.some(x => x.user.ra === ra)) {
                        alreadyInvited.push(ra);
                        continue;
                    }

                    try {
                        const response =
                            await GroupService.SendGroupInvitationToUser({
                                groupId: user!.group!.id,
                                ra: ra,
                            });

                        responses.push(response);
                    } catch (error) {
                        console.error(`Erro ao convidar o RA ${ra}:`, error);
                        enqueueSnackbar(
                            `Erro ao convidar o RA ${ra}. Verifique se o RA está correto.`,
                            {
                                variant: "error",
                                autoHideDuration: 3000,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "right",
                                },
                            }
                        );
                    }
                }

                if (alreadyInvited.length > 0) {
                    enqueueSnackbar(
                        `O(s) seguinte(s) RA(s) já possuem convites pendentes: ${alreadyInvited.join(", ")}`,
                        {
                            variant: "info",
                            autoHideDuration: 4000,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "right",
                            },
                        }
                    );
                }

                const dataBodys: InviteUserToGroupResponse[] = [];
                const errors: string[] = [];

                for (const res of responses) {
                    if (res.status === 201) {
                        dataBodys.push(res.data!);
                    } else if (res.status === 400) {
                        const errorMsg = (res as any).message || "Erro ao enviar convite";
                        errors.push(errorMsg);
                    }
                }

                if (dataBodys.length > 0) {
                    const newInvitations: GroupInvitation[] = dataBodys.map(
                        (d) => {
                            return {
                                id: d.id,
                                accepted: d.accepted || false,
                                userId: d.userId,
                                groupId: d.groupId,
                                group: null,
                                user: d.user,
                            };
                        }
                    );

                    setUser((prev) => ({
                        ...prev!,
                        group: {
                            ...prev!.group!,
                            groupInvitations: [
                                ...(prev!.group?.groupInvitations || []),
                                ...newInvitations,
                            ],
                        },
                    }));

                    enqueueSnackbar(
                        `${dataBodys.length} convite(s) enviado(s) com sucesso!`,
                        {
                            variant: "success",
                            autoHideDuration: 3000,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "right",
                            },
                        }
                    );
                }

                if (errors.length > 0) {
                    errors.forEach(error => {
                        enqueueSnackbar(error, {
                            variant: "error",
                            autoHideDuration: 3000,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "right",
                            },
                        });
                    });
                }
            }

            setIsLoading(false);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar membros:", error);
            enqueueSnackbar(
                "Erro inesperado ao adicionar membros. Tente novamente.",
                {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                }
            );
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus /> Adicionar Integrantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-slate-600">
                            Você pode adicionar mais {slotsAvailable}{" "}
                            integrante(s).
                        </p>
                        {slotsAvailable >= 1 && (
                            <div className="space-y-2">
                                <Label htmlFor="newMember1">
                                    RA do Novo Integrante
                                </Label>
                                <Input
                                    id="newMember1"
                                    name="newMember1"
                                    type="text"
                                    placeholder="Ex: 987654"
                                    value={memberRA1}
                                    onChange={(e) =>
                                        setMemberRA1(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        )}
                        {slotsAvailable >= 2 && (
                            <div className="space-y-2">
                                <Label htmlFor="newMember2">
                                    RA do Novo Integrante
                                </Label>
                                <Input
                                    id="newMember2"
                                    name="newMember2"
                                    type="text"
                                    placeholder="Ex: 543210"
                                    value={memberRA2}
                                    onChange={(e) =>
                                        setMemberRA2(e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            rounded
                            disabled={isLoading}
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            rounded
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            Adicionar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddMemberModal;
