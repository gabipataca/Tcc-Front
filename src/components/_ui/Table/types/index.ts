import React from "react";
import { TableProps as TableMuiProps } from "@mui/material";


export interface TableProps extends TableMuiProps {
    children: React.ReactNode;
}