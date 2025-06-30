import {
    BarChart3Icon,
    BookOpenIcon,
    CheckCircleIcon,
    FileTextIcon,
    HelpCircleIcon,
    MedalIcon,
    TrophyIcon,
    UserPlusIcon,
    UsersRoundIcon,
} from "lucide-react";
import { NavbarLink } from "./types";

export const NavbarLinks: NavbarLink[] = [
    {
        label: "Ranking", // Aluno possui acesso
        href: "/competition/ranking",
        icon: MedalIcon,
    },
    {
        label: "Maratona",
        href: "/competition",
        icon: TrophyIcon,
    },
    // Apenas o ADM possui acesso:
    {
        label: "Logs",
        href: "/competition/logs",
        icon: FileTextIcon,
    },
    {
        label: "Criar Maratona",
        href: "/competition/new",
        icon: TrophyIcon,
    },
    {
        // Professor possui acesso
        label: "Gerenciar Equipes",
        href: "/competition/groups",
        icon: UsersRoundIcon,
    },
    {
        // Professor possui acesso
        label: "Dúvidas", // Aluno possui acesso
        href: "/competition/questions",
        icon: HelpCircleIcon,
    },
    {
        // Professor possui acesso
        label: "Exercícios",
        href: "/exercises",
        icon: BookOpenIcon,
    },
    {
        label: "Correção",
        href: "/competition/correction",
        icon: CheckCircleIcon,
    },
    {
        label: "Inscrições",
        href: "/competition/subscriptions",
        icon: UserPlusIcon,
    },
    {
        label: "Estatísticas",
        href: "/statistics",
        icon: BarChart3Icon,
    },
];
