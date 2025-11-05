import React from "react";
import { TableRowProps as TableRowPropsMui } from "@mui/material";

export interface TableRow {
    content: string | React.ReactNode;
}


export interface TableRowProps extends TableRowPropsMui {
    children: React.ReactNode;
}