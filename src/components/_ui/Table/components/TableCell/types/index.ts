import React from "react";
import { TableCellProps as TableCellMui } from "@mui/material";
export interface TableCell {
    content: string | React.ReactNode;
    size: number;
}


export interface TableCellProps extends TableCellMui {
    children: React.ReactNode;
}