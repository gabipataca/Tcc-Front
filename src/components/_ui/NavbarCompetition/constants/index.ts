import {
    BarChart3Icon,
    BookOpenIcon,
    CheckCircleIcon,
    FileTextIcon,
    HelpCircleIcon,
    HomeIcon,
    SettingsIcon,
    TrophyIcon,
    UploadIcon,
    UsersIcon,
    UsersRoundIcon,
} from "lucide-react";

import { NavbarLink } from "../types";

export const NavbarLinks: NavbarLink[] = [
    {
        label: "Home-Ranking",
        href: "/Competition",
        Icon: HomeIcon,
        roles: ["Admin", "Teacher", "Student"],
    },
    {
        label: "Relatório de Submissão",
        href: "/Competition/Submissions",
        Icon: UsersIcon,
        roles: ["Admin", "Teacher"],
    },
    {
        label: "Logs",
        href: "/Competition/Logs",
        Icon: FileTextIcon,
        roles: ["Admin"],
    },
    {
        label: "Gerenciar Equipes",
        href: "/Competition/ManageTeams",
        Icon: UsersRoundIcon,
        roles: ["Admin", "Teacher"],
    },
    {
        label: "Configurações",
        href: "/Competition/Settings",
        Icon: SettingsIcon,
        roles: ["Admin"],
    },
    {
        label: "Correção Manual",
        href: "/Competition/ManualCorrection",
        Icon: CheckCircleIcon,
        roles: ["Admin"],
    },
    {
        label: "Dúvidas",
        href: "/Competition/Questions",
        Icon: HelpCircleIcon,
        roles: ["Admin", "Teacher", "Student"],
    },
    {
        label: "Perfil do Administrador",
        href: "/Profile",
        Icon: UsersIcon,
        roles: ["Admin"],
    },
];
