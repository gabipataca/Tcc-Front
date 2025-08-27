import React from "react";
import { rows, TeamData } from "./teamData";
interface Column {
    id:
        | "teamName"
        | "ip"
        | "lastLogin"
        | "lastLogout"
        | "members"
        | "lastActionTime"
        | "lastAction";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
    { id: "teamName", label: "Team Name", minWidth: 150, align: "center" },
    { id: "ip", label: "IP", minWidth: 100, align: "center" },
    {
        id: "lastLogin",
        label: "Last Login",
        minWidth: 170,
        align: "center",
    },
    {
        id: "lastLogout",
        label: "Last Logout",
        minWidth: 170,
        align: "center",
    },
    {
        id: "lastActionTime",
        label: "Hora Última Ação",
        minWidth: 180,
        align: "center",
    },
    {
        id: "lastAction",
        label: "Última Ação",
        minWidth: 250,
        align: "center",
    },
    { id: "members", label: "Integrantes", minWidth: 170, align: "center" },
];

const useLogs = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        rows, // Agora 'rows' é importado!
        columns, // As colunas continuam aqui
    };
};

export default useLogs;
