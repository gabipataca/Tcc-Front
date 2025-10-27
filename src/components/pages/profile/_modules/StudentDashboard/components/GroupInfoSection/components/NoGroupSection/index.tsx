import Button from "@/components/_ui/Button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/_ui/Card";
import { Plus, Users } from "lucide-react";

const NoGroupSection = ({ onCreateClick }: { onCreateClick: () => void }) => (
    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
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
            <Button variant="primary" rounded onClick={onCreateClick}>
                <Plus className="h-4 w-4 mr-2" />
                Criar um Grupo
            </Button>
        </CardContent>
    </Card>
);

export default NoGroupSection;
