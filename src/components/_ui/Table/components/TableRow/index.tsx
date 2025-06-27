"use client"

import React from "react";
import { StyledTableRow } from "./styles";
import { TableLineProps } from "./types";



const TableLine: React.FC<TableLineProps> = ({ children }) => {
    

    return(
        <StyledTableRow>
            {children}
        </StyledTableRow>
    )
}


export default TableLine;