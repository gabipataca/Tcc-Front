import Button from "@/components/_ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/_ui/Card";
import Input from "@/components/_ui/Input";
import Label from "@/components/_ui/Label";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

// --- Componente: Modal de Adicionar Integrante ---
const AddMemberModal = ({ isOpen, onClose, onAdd, currentSize }: { isOpen: boolean, onClose: () => void, onAdd: (members: string[]) => void, currentSize: number }) => {
    const [memberRA1, setMemberRA1] = useState("");
    const [memberRA2, setMemberRA2] = useState("");
    const slotsAvailable = 3 - currentSize;

    useEffect(() => {
        setMemberRA1("");
        setMemberRA2("");
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const membersToAdd = [memberRA1, memberRA2].filter(Boolean);
        if (membersToAdd.length > 0) {
            onAdd(membersToAdd);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus /> Adicionar Integrantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-slate-600">Você pode adicionar mais {slotsAvailable} integrante(s).</p>
                        {slotsAvailable >= 1 && (
                            <div className="space-y-2">
                                <Label htmlFor="newMember1">RA do Novo Integrante</Label>
                                <Input id="newMember1" type="text" placeholder="Ex: 987654" value={memberRA1} onChange={e => setMemberRA1(e.target.value)} required />
                            </div>
                        )}
                        {slotsAvailable >= 2 && (
                            <div className="space-y-2">
                                <Label htmlFor="newMember2">RA do Novo Integrante</Label>
                                <Input id="newMember2" type="text" placeholder="Ex: 543210" value={memberRA2} onChange={e => setMemberRA2(e.target.value)} />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="button" style="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" style="primary">Adicionar</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};


export default AddMemberModal;