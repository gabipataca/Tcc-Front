"use client";

import React from "react";

interface Team {
    id: number;
    teamName: string;
    members: string;
    status: "active" | "blocked";
}

interface Column {
    id: "teamName" | "members" | "status" | "actions";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
}

const columns: readonly Column[] = [
    { id: "teamName", label: "Nome da Equipe", minWidth: 170, align: "center" },
    { id: "members", label: "Integrantes", minWidth: 250, align: "center" },
    { id: "status", label: "Status", minWidth: 100, align: "center" },
    { id: "actions", label: "Ações", minWidth: 170, align: "center" },
];

const initialRows: Team[] = [
    {
        id: 1,
        teamName: "CyberKnights",
        members: "João, Maria, Pedro",
        status: "active",
    },
    {
        id: 2,
        teamName: "CodeMasters",
        members: "Ana, Carlos",
        status: "blocked",
    },
    {
        id: 3,
        teamName: "BinaryBlazers",
        members: "Sofia, Lucas, Beatriz, Rafael",
        status: "active",
    },
    {
        id: 4,
        teamName: "AlgorithmicAvengers",
        members: "Fernando",
        status: "blocked",
    },
    {
        id: 5,
        teamName: "SyntaxSyndicate",
        members: "Clara, Diego",
        status: "active",
    },
    {
        id: 6,
        teamName: "The Debuggers",
        members: "Mariana, Gustavo",
        status: "blocked",
    },
    {
        id: 7,
        teamName: "BitBusters",
        members: "Paula, Ricardo, Camila",
        status: "active",
    },
    { id: 8, teamName: "PixelPirates", members: "Daniela", status: "blocked" },
    {
        id: 9,
        teamName: "The Byte Meisters",
        members: "Gabriel, Laura, Bruno",
        status: "active",
    },
    {
        id: 10,
        teamName: "Ctrl+Alt+Defeat",
        members: "Carolina, Felipe",
        status: "blocked",
    },
    {
        id: 11,
        teamName: "The Glitch Mob",
        members: "Alex, Brenda, Cesar",
        status: "active",
    },
    {
        id: 12,
        teamName: "LevelUp",
        members: "Diana, Eduardo",
        status: "blocked",
    },
    {
        id: 13,
        teamName: "GameChangers",
        members: "Fabiana, Guilherme, Helena",
        status: "active",
    },
    {
        id: 14,
        teamName: "The Console Cowboys",
        members: "Igor",
        status: "blocked",
    },
    {
        id: 15,
        teamName: "The Pixel Pushers",
        members: "Julia, Kevin",
        status: "active",
    },
    {
        id: 16,
        teamName: "CyberKnights 2",
        members: "Larissa, Marcelo, Nathalia",
        status: "blocked",
    },
    {
        id: 17,
        teamName: "CodeMasters 2",
        members: "Otavio, Patricia",
        status: "active",
    },
    {
        id: 18,
        teamName: "BinaryBlazers 2",
        members: "Quiteria, Roberto, Simone",
        status: "blocked",
    },
    {
        id: 19,
        teamName: "AlgorithmicAvengers 2",
        members: "Thiago, Ursula",
        status: "active",
    },
    {
        id: 20,
        teamName: "SyntaxSyndicate 2",
        members: "Victor, Wanessa, Xavier",
        status: "blocked",
    },
    {
        id: 21,
        teamName: "The Debuggers 2",
        members: "Yasmin, Zeca",
        status: "active",
    },
    {
        id: 22,
        teamName: "BitBusters 2",
        members: "Alice, Bruno",
        status: "blocked",
    },
    {
        id: 23,
        teamName: "PixelPirates 2",
        members: "Carla, Davi, Erica",
        status: "active",
    },
    {
        id: 24,
        teamName: "The Byte Meisters 2",
        members: "Fabio, Gisele",
        status: "blocked",
    },
    {
        id: 25,
        teamName: "Ctrl+Alt+Defeat 2",
        members: "Hugo, Isabela, Jorge",
        status: "active",
    },
    {
        id: 26,
        teamName: "The Glitch Mob 2",
        members: "Karen, Leo",
        status: "blocked",
    },
    {
        id: 27,
        teamName: "LevelUp 2",
        members: "Monica, Nelson, Olivia",
        status: "active",
    },
    {
        id: 28,
        teamName: "GameChangers 2",
        members: "Paulo, Quezia",
        status: "blocked",
    },
    {
        id: 29,
        teamName: "The Console Cowboys 2",
        members: "Renato, Sandra",
        status: "active",
    },
    {
        id: 30,
        teamName: "The Pixel Pushers 2",
        members: "Tatiane, Ubiratan",
        status: "blocked",
    },
];

const useManageTeams = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [teams, setTeams] = React.useState<Team[]>(initialRows);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleToggleStatus = (id: number) => {
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === id
                    ? {
                          ...team,
                          status:
                              team.status === "active" ? "blocked" : "active",
                      }
                    : team
            )
        );
    };

    const handleDeleteTeam = (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esta equipe?")) {
            setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id));
        }
    };

    return {
        page,
        rowsPerPage,
        teams,
        columns,
        handleChangePage,
        handleChangeRowsPerPage,
        handleToggleStatus,
        handleDeleteTeam,
    };
};

export default useManageTeams;
