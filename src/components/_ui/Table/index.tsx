"use client"

import React from "react";
import { StyledTable } from "./styles";
import { TableProps } from "./types";

const Table: React.FC<TableProps> = ({ children }) => {
    return (
        <StyledTable>
            {children}
        </StyledTable>
    );
};

export default Table;
