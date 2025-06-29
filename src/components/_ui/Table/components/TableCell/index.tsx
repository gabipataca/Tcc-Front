"use client"

import React from "react";
import { StyledTableCell } from "./styles";
import { TableCellProps } from "./types";



const TableCell: React.FC<TableCellProps> = ({ children }) => {
    

    return(
        <StyledTableCell>
            {children}
        </StyledTableCell>
    )
}


export default TableCell;