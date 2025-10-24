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
import { Edit, Plus, UserX } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState } from "react";

const EditGroupModal = ({
    onClose,
}: {
    onClose: () => void;
}) => {
    const { user, setUser } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const [groupName, setGroupName] = useState(user!.group!.name);
    const [membersToRemove, setMembersToRemove] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleRemove = (userId: string) => {
        setMembersToRemove((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await GroupService.UpdateGroup(user!.group!.id, {
                groupId: user!.group!.id,
                name: groupName,
                usersToRemove: membersToRemove,
            });
            
            if (membersToRemove.includes(user!.id)) {
                // Se SIM (líder ou membro saindo):
                // Define o grupo como nulo no contexto, fazendo a tela sumir.
                setUser((prev) => ({ ...prev!, group: null }));
                enqueueSnackbar("Você saiu do grupo.", {
                    variant: "info",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            } else {
                // Se NÃO (líder está apenas removendo outros):
                // Apenas atualiza a lista de membros do grupo.
                setUser((prev) => ({
                    ...prev!,
                    group: {
                        ...prev!.group!,
                        name: groupName,
                        users: prev!.group!.users.filter(
                            (u) => !membersToRemove.includes(u.id)
                        ),
                    },
                }));
                enqueueSnackbar("Grupo atualizado com sucesso!", {
                    variant: "success",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                });
            }

            onClose();

        } catch (error: any) {
            console.error("Erro ao editar grupo:", error);
            enqueueSnackbar(
                error.message || "Não foi possível atualizar o grupo.",
                {
                    variant: "error",
                    autoHideDuration: 3000,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                }
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Edit /> Editar Grupo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="editGroupName">Nome do Grupo</Label>
                            <Input
                                id="editGroupName"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Integrantes</Label>
                            <div className="space-y-2 rounded-md border p-2">
                                {user!.group!.users.map((member) => (
                                    <div
                                        key={member.id}
                                        className={`flex items-center justify-between p-2 rounded ${
                                            membersToRemove.includes(member.id)
                                                ? "bg-red-100"
                                                : ""
                                        }`}
                                    >
                                        <span
                                            className={`${
                                                membersToRemove.includes(
                                                    member.id
                                                )
                                                    ? "line-through text-slate-500"
                                                    : ""
                                            }`}
                                        >
                                            {member.name}{" "}
                                            {member.id === user!.id
                                                ? "(Você)"
                                                : ""}
                                            {/* Assumindo que a API informa quem é o líder */
                                            /* {member.isLeader ? " (Líder)" : ""} */
                                            }
                                        </span>
                                        {/* O botão aparece para todos, permitindo que você se remova */}
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant={
                                                membersToRemove.includes(
                                                    member.id
                                                )
                                                    ? "light-success"
                                                    : "outline"
                                            }
                                            onClick={() =>
                                                handleToggleRemove(member.id)
                                            }
                                            disabled={isLoading}
                                        >
                                            {membersToRemove.includes(
                                                member.id
                                            ) ? (
                                                <Plus className="h-4 w-4 mr-1" />
                                            ) : (
                                                <UserX className="h-4 w-4 mr-1" />
                                            )}
                                            {membersToRemove.includes(
                                                member.id
                                            )
                                                ? "Manter"
                                                : "Remover"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            Salvar Alterações
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default EditGroupModal;