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

export const NavbarLinks: NavbarLink[] = [
    {
        label: "Criar Maratona",
        href: "/Competition/Create",
        Icon: TrophyIcon,
    },
    {
        // Professor possui acesso
        label: "Exercícios",
        href: "/Exercises",
        Icon: BookOpenIcon,
    },
    {
        label: "Estatísticas",
        href: "/Statistics",
        Icon: BarChart3Icon,
    },
    {
        href: "/Competition",
        label: "Home-Ranking",
        Icon: HomeIcon,
    },
    {
        href: "/Competition/Submissions",
        label: "Relatório de Submissão",
        Icon: UsersIcon,
    },
    {
        href: "/Competition/Logs",
        label: "Logs",
        Icon: FileTextIcon,
    },
    /*
    {
        // Professor possui acesso
        href: "/Competition/ManageTeams",
        label: "Gerenciar Equipes",
        Icon: UsersRoundIcon,
    },
    {
        href: "/Competition/Settings",
        label: "Configurações",
        Icon: SettingsIcon,
    },
    {
        // Professor possui acesso
        href: "/Competition/Questions", // Aluno possui acesso
        label: "Dúvidas",
        Icon: HelpCircleIcon,
    },
    {
        href: "/Competition/ManualCorrection",
        label: "Correção",
        Icon: CheckCircleIcon,
    },
    /////////////////////////////////////
    {
        href: "/Competition/SendExercise",
        label: "Enviar Exercício",
        Icon: UploadIcon,
    },
    {
        //Perfil aluno
        href: "/Profile/PerfilAluno",
        label: "Perfil do Aluno",
        Icon: UsersIcon,
    },

    {
        //Perfil aluno - Inscrição
        href: "/Profile/Subscription",
        label: "Inscrição",
        Icon: UsersIcon,
    },

    {
        //Perfil Professor
        href: "/Profile/PerfilProfessor",
        label: "Perfil do Professor",
        Icon: UsersIcon,
    },

    {
        //Perfil Professor e ADM criam exercícios
        href: "/Profile/CreateExercise",
        label: "Montar Exercícios",
        Icon: UsersIcon,
    },

    {
        //Perfil Adm
        href: "/Profile/PerfilAdm",
        label: "Perfil do Administrador",
        Icon: UsersIcon,
    },

    {
        //Perfil Adm - Criar Formulários para inscrição maratona
        href: "/Profile/CreateSubscription",
        label: "Liberar Inscrições",
        Icon: UsersIcon,
    },
    */
];
