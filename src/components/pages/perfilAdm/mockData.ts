import type { ReactNode } from "react";
import {
    Search,
    Users,
    GraduationCap,
    UserCheck,
    Trash2,
    Download,
    Edit,
} from "lucide-react";

export interface Student {
    id: number;
    name: string;
    group: string;
    email: string;
    status: "active" | "inactive";
    joinDate: string;
}

export interface Professor {
    id: number;
    name: string;
    department: string;
    email: string;
    exercises: number;
}

export interface Group {
    id: number;
    name: string;
    members: number;
    status: "active" | "inactive";
    lastCompetition: string;
}

export const studentsData: Student[] = [
    {
        id: 123,
        name: "João Silva",
        group: "Bit Busters",
        email: "joao@email.com",
        status: "active",
        joinDate: "2024-01-15",
    },
    {
        id: 456,
        name: "Maria Souza",
        group: "Bug Hunters",
        email: "maria@email.com",
        status: "active",
        joinDate: "2024-01-20",
    },
    {
        id: 789,
        name: "Carlos Lima",
        group: "Error 404",
        email: "carlos@email.com",
        status: "inactive",
        joinDate: "2024-02-01",
    },
    {
        id: 101,
        name: "Ana Costa",
        group: "Code Warriors",
        email: "ana@email.com",
        status: "active",
        joinDate: "2024-02-10",
    },
    {
        id: 112,
        name: "Pedro Santos",
        group: "Bit Busters",
        email: "pedro@email.com",
        status: "active",
        joinDate: "2024-02-15",
    },
];

export const professorsData: Professor[] = [
    {
        id: 1,
        name: "Dr. Roberto Silva",
        department: "Ciência da Computação",
        email: "roberto@uni.edu",
        exercises: 25,
    },
    {
        id: 2,
        name: "Profa. Lucia Santos",
        department: "Engenharia de Software",
        email: "lucia@uni.edu",
        exercises: 18,
    },
    {
        id: 3,
        name: "Dr. Fernando Costa",
        department: "Sistemas de Informação",
        email: "fernando@uni.edu",
        exercises: 32,
    },
];

export const groupsData: Group[] = [
    {
        id: 1,
        name: "Bit Busters",
        members: 5,
        status: "active",
        lastCompetition: "2024-03-15",
    },
    {
        id: 2,
        name: "Bug Hunters",
        members: 4,
        status: "active",
        lastCompetition: "2024-03-10",
    },
    {
        id: 3,
        name: "Error 404",
        members: 3,
        status: "inactive",
        lastCompetition: "2024-02-28",
    },
    {
        id: 4,
        name: "Code Warriors",
        members: 6,
        status: "active",
        lastCompetition: "2024-03-20",
    },
];
