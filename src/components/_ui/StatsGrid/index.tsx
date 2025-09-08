"use client";

import { FC } from "react";
import { 
    Package,
    ClipboardPlus,
    Trophy,
    UserX,
} from "lucide-react";
import StatsCard from "../../pages/profile/components/StatsCard";

interface DataProps {
    id: number | string;
    status?: string;
}

interface StatsGridProps {
    studentsData: DataProps[];
    professorsData: DataProps[];
    groupsData: DataProps[];
    onCardClick: (tab: string) => void;
}

const StatsGrid: FC<StatsGridProps> = ({
    studentsData,
    professorsData,
    groupsData,
    onCardClick,
}) => {
    
    const stats = [
        {
            id: "exercises",
            title: "Exercícios",
            value: 20,
            description: "Exercícios disponíveis",
            icon: Package,
            action: () => onCardClick("Exercise"),
        },
        {
            id: "create_marathon_registration",
            title: "Criar Inscrição",
            value: "",
            description: "Abrir inscrições para maratona",
            icon: ClipboardPlus,
            action: () => onCardClick("create_subscription"),
        },
        {
            id: "create_marathon",
            title: "Criar Maratona",
            value: "",
            description: "Configurar uma nova maratona",
            icon: Trophy,
            action: () =>onCardClick("create_competition"),
        },
        {
            id: "inactive_students",
            title: "Alunos Inativos",
            value: 2, 
            description: "Não acessam há 30 dias",
            icon: UserX,
            action: () => {},
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.id}
                    onClick={stat.action}
                    className="cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                    <StatsCard
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                        icon={stat.icon}
                        className="h-full" 
                    />
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;