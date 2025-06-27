"use client"

import React from "react";
import { TableHeaderProps } from "./types";
import { StyledTableHeader } from "./styles";



const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {


    return(
        <StyledTableHeader>
            {children}
        </StyledTableHeader>
    )
}


export default TableHeader;