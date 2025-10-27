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
import { Edit, Plus, UserX } from "lucide-react";
import useEditGroup from "./hooks/useEditGroup";

const EditGroupModal = ({ onClose }: { onClose: () => void }) => {
    const {
        groupName,
        setGroupName,
        membersToRemove,
        handleToggleRemove,
        isLoading,
        handleSubmit,
    } = useEditGroup(onClose);

    const { user } = useUser();

    return (
        <div className="fixed h-full inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
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
                                type="text"
                                name="editGroupName"
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
                                            /* {member.isLeader ? " (Líder)" : ""} */}
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
                                            {membersToRemove.includes(member.id)
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
                            rounded
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                            loading={isLoading}
                            rounded
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
