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

import { NavbarLink } from "./types";

// ADMINISTRADOR
export const NavbarLinksAdmin: NavbarLink[] = [
    {
        label: "Home-Ranking",
        href: "/Competition",
        Icon: HomeIcon,
    },
    {
        label: "Relatório de Submissão",
        href: "/Competition/Submissions",
        Icon: UsersIcon,
    },
    {
        label: "Logs",
        href: "/Competition/Logs",
        Icon: FileTextIcon,
    },
    {
        label: "Gerenciar Equipes",
        href: "/Competition/ManageTeams",
        Icon: UsersRoundIcon,
    },
    {
        label: "Configurações",
        href: "/Competition/Settings",
        Icon: SettingsIcon,
    },
    {
        label: "Correção Manual",
        href: "/Competition/ManualCorrection",
        Icon: CheckCircleIcon,
    },
    {
        label: "Perfil do Administrador",
        href: "/Profile",
        Icon: UsersIcon,
    },
];

// PROFESSOR
export const NavbarLinksProfessor: NavbarLink[] = [
    {
        label: "Home-Ranking",
        href: "/Competition",
        Icon: HomeIcon,
    },
    {
        label: "Relatório de Submissão",
        href: "/Competition/Submissions",
        Icon: UsersIcon,
    },
    {
        label: "Gerenciar Equipes",
        href: "/Competition/ManageTeams",
        Icon: UsersRoundIcon,
    },
    {
        label: "Configurações",
        href: "/Competition/Settings",
        Icon: SettingsIcon,
    },
    {
        label: "Dúvidas",
        href: "/Competition/Questions",
        Icon: HelpCircleIcon,
    },
    {
        label: "Perfil do Professor",
        href: "/Profile",
        Icon: UsersIcon,
    },
];

// ALUNO
export const NavbarLinksAluno: NavbarLink[] = [
    {
        label: "Home-Ranking",
        href: "/Competition",
        Icon: HomeIcon,
    },

    {
        label: "Dúvidas",
        href: "/Competition/Questions",
        Icon: HelpCircleIcon,
    },
    {
        label: "Perfil do Aluno",
        href: "/Profile",
        Icon: UsersIcon,
    },
];

// 🔹 Mapa por perfil
export const NavbarLinksByRole = {
    admin: NavbarLinksAdmin,
    professor: NavbarLinksProfessor,
    aluno: NavbarLinksAluno,
};
