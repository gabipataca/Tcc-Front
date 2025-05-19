"use client";

import Balao from "@/components/_ui/Balao";
import balaoVermelho from "../balaoList/balao-vermelho.svg";
import balaoLilas from "../balaoList/balao-lilas.svg";
import balaoVerde from "../balaoList/balao-verde.svg";
import balaoLaranja from "../balaoList/balao-laranja.svg";
import balaoRosa from "../balaoList/balao-rosa.svg";
import balaoCinza from "../balaoList/balao-cinza.svg";
import balaoVinho from "../balaoList/balao-vinho.svg";
import balaoVerdeAgua from "../balaoList/balao-verdeAgua.svg";
import balaoMarrom from "../balaoList/balao-marrom.svg";
import balaoPreto from "../balaoList/balao-preto.svg";
import React from "react";
import NavbarRanking from "@/components/_ui/NavbarRanking";
import Table from "@/components/_ui/Table";
import TableHeader from "@/components/_ui/Table/components/TableHeader";
import TableBody from "@/components/_ui/Table/components/TableBody";
import TableHeaderItem from "@/components/_ui/Table/components/TableHeaderItem";
import TableRow from "@/components/_ui/Table/components/TableRow";
import TableCell from "@/components/_ui/Table/components/TableCell";
import { TableContainer as TableContainerMui } from "@mui/material";
import TableContainer from "@/components/_ui/Table/components/TableContainer";

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const balaoPorLetra: Record<string, string> = {
    A: balaoVermelho,
    B: balaoLilas,
    C: balaoVerde,
    D: balaoLaranja,
    E: balaoMarrom,
    F: balaoRosa,
    G: balaoPreto,
    H: balaoCinza,
    I: balaoVerdeAgua,
    J: balaoVinho,
};

interface GroupRankingData {
    group: string;
    exercisesAccepteds: string[];
    times: { [key: string]: string };
    total: number;
}

const data: GroupRankingData[] = [
    {
        group: "Equipe 1",
        exercisesAccepteds: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        times: {
            A: "2/64",
            B: "1/16",
            C: "1/99",
            D: "2/80",
            E: "1/31",
            F: "1/7",
            G: "1/162",
            H: "3/120",
            I: "1/88",
            J: "2/47",
        },
        total: 100,
    },
    {
        group: "Equipe 2",
        exercisesAccepteds: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        times: {
            A: "1/152",
            B: "1/113",
            C: "2/91",
            D: "1/185",
            E: "1/89",
            F: "2/76",
            G: "1/90",
            H: "1/77",
            I: "1/54",
            J: "1/39",
        },
        total: 90,
    },
];

const tableHeaderColumns = ["Equipe", ...letras, "Total"];

const RankingPage: React.FC = () => {
    return (
        <TableContainerMui component={TableContainer}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableHeaderColumns.map((column, idx) => (
                            <TableHeaderItem
                                key={`${column}-${idx}`}
                                item={{ content: column, space: 1 }}
                            />
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((data, idx) => (
                        <TableRow key={`${data.group}-${idx}`}>
                            <TableCell>{data.group}</TableCell>

                            {letras.map((l, index) => (
                                <TableCell key={`${l}-${index}`}>
                                    {data.exercisesAccepteds.includes(l)
                                        ? `${data.exercisesAccepteds[index]} ${data.times[l]}`
                                        : "T"}
                                </TableCell>
                            ))}
                            <TableCell key={`${data.total}-${idx}`}>
                                {data.total}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainerMui>
    );
}

export default RankingPage;
