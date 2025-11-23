"use client";

import { FC, useMemo } from "react";
import { 
    Package,
    ClipboardPlus,
    Trophy,
    UserX,
} from "lucide-react";
import StatsCard from "../../pages/profile/components/StatsCard";
import { useProfileMenuContext } from "@/components/pages/profile/contexts/ProfileMenuContext";
import Loading from "../Loading";

interface StatsGridProps {
    /**
     * Número total de exercícios disponíveis
     */
    totalExercises?: number;
    
    /**
     * Número de usuários inativos (não acessam há 30 dias)
     */
    inactiveUsers?: number;
    
    /**
     * Indica se os dados estão sendo carregados
     */
    isLoading?: boolean;
}

const StatsGrid: FC<StatsGridProps> = ({
    totalExercises = 0,
    inactiveUsers = 0,
    isLoading = false,
}) => {

    const { toggleMenu } = useProfileMenuContext();
    
    const stats = useMemo(() => ([
        {
            id: "exercises",
            title: "Exercícios",
            value: totalExercises,
            description: "Exercícios disponíveis",
            icon: Package,
            action: () => toggleMenu("Exercise"),
        },
        {
            id: "create_marathon_registration",
            title: "Criar Inscrição",
            value: "",
            description: "Abrir inscrições para maratona",
            icon: ClipboardPlus,
            action: () => toggleMenu("CreateSubscription"),
        },
        {
            id: "create_marathon",
            title: "Criar Maratona",
            value: "",
            description: "Configurar uma nova maratona",
            icon: Trophy,
            action: () => toggleMenu("CreateCompetition"),
        },
        {
            id: "statistics",
            title: "Estatísticas",
            value: inactiveUsers, 
            description: "Não acessam há 30 dias",
            icon: UserX,
            action: () => {},
        },
    ]), [toggleMenu, totalExercises, inactiveUsers]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-white rounded-lg border border-[#e9edee] flex items-center justify-center">
                        <Loading variant="spinner" size="sm" />
                    </div>
                ))}
            </div>
        );
    }

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