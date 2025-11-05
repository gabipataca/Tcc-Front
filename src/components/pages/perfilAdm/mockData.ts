export interface Student {
    id: number;
    name: string;
    ra: number;
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
        ra: 2101483,
        group: "Bit Busters",
        email: "joao@email.com",
        status: "active",
        joinDate: "14/01/2024",
    },
    {
        id: 456,
        name: "Maria Souza",
        ra: 2005321,
        group: "Bug Hunters",
        email: "maria@email.com",
        status: "active",
        joinDate: "19/01/2024",
    },
    {
        id: 789,
        name: "Carlos Lima",
        ra: 2203198,
        group: "Error 404",
        email: "carlos@email.com",
        status: "inactive",
        joinDate: "31/01/2024",
    },
    {
        id: 101,
        name: "Ana Costa",
        ra: 1908874,
        group: "Code Warriors",
        email: "ana@email.com",
        status: "active",
        joinDate: "09/02/2024",
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
        lastCompetition: "15/03/2024",
    },
    {
        id: 2,
        name: "Bug Hunters",
        members: 4,
        status: "active",
        lastCompetition: "10/03/2024",
    },
    {
        id: 3,
        name: "Error 404",
        members: 3,
        status: "inactive",
        lastCompetition: "28/02/2024",
    },
];
