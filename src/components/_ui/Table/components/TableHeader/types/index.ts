import React from "react";
import { TableHeadProps as TableHeadMui } from "@mui/material";

export interface TableHeaderProps extends TableHeadMui {
    children: React.ReactNode;
}