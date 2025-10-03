"use client";

import { useMemo } from "react";

type ErrorType =
    | "Compilation Error"
    | "Runtime Error"
    | "Resources Exceeded"
    | "Time-limit Exceeded"
    | "Presentation Error"
    | "Wrong Answer";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number | string) => string;
}

interface CorrectTeamData {
    time: string;
    points: number;
    exerciseDescription: string;
    teamName: string;
}

interface WrongTeamData {
    time: string;
    exerciseDescription: string;
    teamName: string;
    errorType: ErrorType;
}

const correctColumns: readonly Column[] = [
    { id: "time", label: "Tempo", minWidth: 300, align: "center" },
    { id: "points", label: "Pontos (min)", minWidth: 300, align: "center" },
    {
        id: "exerciseDescription",
        label: "Descrição",
        minWidth: 150,
        align: "center",
    },
    { id: "teamName", label: "Nome do Time", minWidth: 200, align: "center" },
];

const wrongColumns: readonly Column[] = [
    { id: "time", label: "Tempo", minWidth: 250, align: "center" },
    { id: "teamName", label: "Nome do Time", minWidth: 350, align: "center" },
    {
        id: "exerciseDescription",
        label: "Descrição do Erro",
        minWidth: 250,
        align: "center",
    },
    { id: "errorType", label: "Tipo de Erro", minWidth: 250, align: "center" },
];

const mockCorrectRows: CorrectTeamData[] = [
    {
        time: "2025-06-15 - 10:00:15",
        points: 90,
        exerciseDescription:
            "Bit By Bit recebeu o Balão A por acertar o exercício A",
        teamName: "Bit By Bit",
    },
    {
        time: "2025-06-15 - 10:05:30",
        points: 120,
        exerciseDescription:
            "Byte Me recebeu o Balão C por acertar o exercício C",
        teamName: "Byte Me",
    },
    {
        time: "2025-06-15 - 10:10:00",
        points: 75,
        exerciseDescription:
            "Code Blooded recebeu o Balão B por acertar o exercício B",
        teamName: "Code Blooded",
    },
    {
        time: "2025-06-15 - 10:12:45",
        points: 160,
        exerciseDescription:
            "Ctrl+Alt+Elite recebeu o Balão E por acertar o exercício E",
        teamName: "Ctrl+Alt+Elite",
    },
    {
        time: "2025-06-15 - 10:18:20",
        points: 110,
        exerciseDescription:
            "Infinite Loopers recebeu o Balão D por acertar o exercício D",
        teamName: "Infinite Loopers",
    },
    {
        time: "2025-06-15 - 10:22:05",
        points: 85,
        exerciseDescription:
            "Null Pointers recebeu o Balão F por acertar o exercício F",
        teamName: "Null Pointers",
    },
    {
        time: "2025-06-15 - 10:25:50",
        points: 140,
        exerciseDescription:
            "Segmentation Fault recebeu o Balão G por acertar o exercício G",
        teamName: "Segmentation Fault",
    },
    {
        time: "2025-06-15 - 10:30:10",
        points: 95,
        exerciseDescription:
            "Syntax Error Slayers recebeu o Balão H por acertar o exercício H",
        teamName: "Syntax Error Slayers",
    },
    {
        time: "2025-06-15 - 10:33:40",
        points: 105,
        exerciseDescription:
            "The Recursive Raccoons recebeu o Balão I por acertar o exercício I",
        teamName: "The Recursive Raccoons",
    },
    {
        time: "2025-06-15 - 10:37:15",
        points: 130,
        exerciseDescription:
            "Binary Brains recebeu o Balão J por acertar o exercício J",
        teamName: "Binary Brains",
    },
    {
        time: "2025-06-15 - 10:40:00",
        points: 92,
        exerciseDescription:
            "Logic Lords recebeu o Balão A por acertar o exercício A",
        teamName: "Logic Lords",
    },
    {
        time: "2025-06-15 - 10:44:25",
        points: 115,
        exerciseDescription:
            "Algorithmic Alchemists recebeu o Balão B por acertar o exercício B",
        teamName: "Algorithmic Alchemists",
    },
    {
        time: "2025-06-15 - 10:48:10",
        points: 80,
        exerciseDescription:
            "Data Dynamos recebeu o Balão C por acertar o exercício C",
        teamName: "Data Dynamos",
    },
    {
        time: "2025-06-15 - 10:51:55",
        points: 150,
        exerciseDescription:
            "Quantum Coders recebeu o Balão D por acertar o exercício D",
        teamName: "Quantum Coders",
    },
    {
        time: "2025-06-15 - 10:55:30",
        points: 100,
        exerciseDescription:
            "Hacker's Delight recebeu o Balão E por acertar o exercício E",
        teamName: "Hacker's Delight",
    },
    {
        time: "2025-06-15 - 10:59:00",
        points: 70,
        exerciseDescription:
            "Kernel Kombatants recebeu o Balão F por acertar o exercício F",
        teamName: "Kernel Kombatants",
    },
    {
        time: "2025-06-15 - 11:02:30",
        points: 135,
        exerciseDescription:
            "Motherboard Mafia recebeu o Balão G por acertar o exercício G",
        teamName: "Motherboard Mafia",
    },
    {
        time: "2025-06-15 - 11:06:00",
        points: 88,
        exerciseDescription:
            "The Script Kiddies recebeu o Balão H por acertar o exercício H",
        teamName: "The Script Kiddies",
    },
    {
        time: "2025-06-15 - 11:09:30",
        points: 125,
        exerciseDescription:
            "Compile Time Heroes recebeu o Balão I por acertar o exercício I",
        teamName: "Compile Time Heroes",
    },
    {
        time: "2025-06-15 - 11:13:00",
        points: 98,
        exerciseDescription:
            "Run-Time Errors recebeu o Balão J por acertar o exercício J",
        teamName: "Run-Time Errors",
    },
];

const mockWrongRows: WrongTeamData[] = [
    {
        time: "2025-06-15 - 10:01:00",
        exerciseDescription: "Code Blooded tentou o exercício A",
        teamName: "Code Blooded",
        errorType: "Compilation Error",
    },
    {
        time: "2025-06-15 - 10:06:10",
        exerciseDescription: "Bit By Bit tentou o exercício C",
        teamName: "Bit By Bit",
        errorType: "Wrong Answer",
    },
    {
        time: "2025-06-15 - 10:11:00",
        exerciseDescription: "Null Pointers tentou o exercício B",
        teamName: "Null Pointers",
        errorType: "Time-limit Exceeded",
    },
    {
        time: "2025-06-15 - 10:13:30",
        exerciseDescription: "Algorithmic Alchemists tentou o exercício E",
        teamName: "Algorithmic Alchemists",
        errorType: "Runtime Error",
    },
    {
        time: "2025-06-15 - 10:19:00",
        exerciseDescription: "Kernel Kombatants tentou o exercício D",
        teamName: "Kernel Kombatants",
        errorType: "Presentation Error",
    },
    {
        time: "2025-06-15 - 10:23:00",
        exerciseDescription: "Binary Brains tentou o exercício F",
        teamName: "Binary Brains",
        errorType: "Wrong Answer",
    },
    {
        time: "2025-06-15 - 10:26:40",
        exerciseDescription: "Run-Time Errors tentou o exercício G",
        teamName: "Run-Time Errors",
        errorType: "Resources Exceeded",
    },
    {
        time: "2025-06-15 - 10:31:00",
        exerciseDescription: "Logic Lords tentou o exercício H",
        teamName: "Logic Lords",
        errorType: "Compilation Error",
    },
    {
        time: "2025-06-15 - 10:34:30",
        exerciseDescription: "Infinite Loopers tentou o exercício I",
        teamName: "Infinite Loopers",
        errorType: "Time-limit Exceeded",
    },
    {
        time: "2025-06-15 - 10:38:00",
        exerciseDescription: "Byte Me tentou o exercício J",
        teamName: "Byte Me",
        errorType: "Wrong Answer",
    },
    {
        time: "2025-06-15 - 10:41:00",
        exerciseDescription: "Ctrl+Alt+Elite tentou o exercício A",
        teamName: "Ctrl+Alt+Elite",
        errorType: "Runtime Error",
    },
    {
        time: "2025-06-15 - 10:45:15",
        exerciseDescription: "Hacker's Delight tentou o exercício B",
        teamName: "Hacker's Delight",
        errorType: "Presentation Error",
    },
    {
        time: "2025-06-15 - 10:49:00",
        exerciseDescription: "Motherboard Mafia tentou o exercício C",
        teamName: "Motherboard Mafia",
        errorType: "Resources Exceeded",
    },
    {
        time: "2025-06-15 - 10:52:40",
        exerciseDescription: "The Script Kiddies tentou o exercício D",
        teamName: "The Script Kiddies",
        errorType: "Compilation Error",
    },
    {
        time: "2025-06-15 - 10:56:20",
        exerciseDescription: "Data Dynamos tentou o exercício E",
        teamName: "Data Dynamos",
        errorType: "Wrong Answer",
    },
    {
        time: "2025-06-15 - 11:00:00",
        exerciseDescription: "Quantum Coders tentou o exercício F",
        teamName: "Quantum Coders",
        errorType: "Time-limit Exceeded",
    },
    {
        time: "2025-06-15 - 11:03:40",
        exerciseDescription: "The Recursive Raccoons tentou o exercício G",
        teamName: "The Recursive Raccoons",
        errorType: "Runtime Error",
    },
    {
        time: "2025-06-15 - 11:07:00",
        exerciseDescription: "Syntax Error Slayers tentou o exercício H",
        teamName: "Syntax Error Slayers",
        errorType: "Presentation Error",
    },
    {
        time: "2025-06-15 - 11:10:20",
        exerciseDescription: "Null Pointers tentou o exercício I",
        teamName: "Null Pointers",
        errorType: "Wrong Answer",
    },
    {
        time: "2025-06-15 - 11:14:00",
        exerciseDescription: "Bit By Bit tentou o exercício J",
        teamName: "Bit By Bit",
        errorType: "Resources Exceeded",
    },
];

const useSubmissions = (currentTable: "correct" | "wrong") => {
    const rows = useMemo(() => {
        return currentTable === "correct" ? mockCorrectRows : mockWrongRows;
    }, [currentTable]);

    const displayedColumns = useMemo(() => {
        return currentTable === "correct" ? correctColumns : wrongColumns;
    }, [currentTable]);

    const title = useMemo(() => {
        return currentTable === "correct"
            ? "Relatório de Exercícios Corretos"
            : "Relatório de Exercícios Errados";
    }, [currentTable]);

    return {
        rows,
        displayedColumns,
        title,
    };
};

export default useSubmissions;
