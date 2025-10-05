import React from "react";
import { TableFooterProps as TableFooterMuiProps } from "@mui/material";

export interface TableFooter {
    content: string | React.ReactNode;
    size: number;
}


export interface TableFooterProps extends TableFooterMuiProps {
    children: React.ReactNode;
}