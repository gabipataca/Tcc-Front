import Button from "@/components/_ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import Label from "@/components/_ui/Label";
import { useEffect, useState } from "react";

// --- Componente: Modal de Editar Grupo ---
const EditGroupModal = ({ isOpen, onClose, onUpdate, group }: { isOpen: boolean, onClose: () => void, onUpdate: (id: string, name: string, membersToRemove: string[]) => void, group: GroupInfo | null }) => {
    const [groupName, setGroupName] = useState(group?.name || "");
    const [membersToRemove, setMembersToRemove] = useState<string[]>([]);

    useEffect(() => {
        if (group) {
            setGroupName(group.name);
            setMembersToRemove([]);
        }
    }, [group]);

    if (!isOpen || !group) return null;

    const handleToggleRemove = (userId: string) => {
        setMembersToRemove(prev =>
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(group.id, groupName, membersToRemove);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Edit /> Editar Grupo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="editGroupName">Nome do Grupo</Label>
                            <Input id="editGroupName" value={groupName} onChange={e => setGroupName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>Integrantes</Label>
                            <div className="space-y-2 rounded-md border p-2">
                                {group.users.map(user => (
                                    <div key={user.id} className={`flex items-center justify-between p-2 rounded ${membersToRemove.includes(user.id) ? 'bg-red-100' : ''}`}>
                                        <span className={`${membersToRemove.includes(user.id) ? 'line-through text-slate-500' : ''}`}>{user.name} {user.id === 'user-1' ? '(Líder)' : ''}</span>
                                        {user.id !== 'user-1' && ( // Não permite remover o líder
                                            <Button type="button" size="sm" style={membersToRemove.includes(user.id) ? 'light-success' : 'outline'} onClick={() => handleToggleRemove(user.id)}>
                                                {membersToRemove.includes(user.id) ? <Plus className="h-4 w-4 mr-1" /> : <UserX className="h-4 w-4 mr-1" />}
                                                {membersToRemove.includes(user.id) ? 'Manter' : 'Remover'}
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="button" style="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" style="primary">Salvar Alterações</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};


export default EditGroupModal;