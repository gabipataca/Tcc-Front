import React from "react";
import { StyledTableBody } from "./styles";
import { TableBodyProps } from "./types";



const TableBody: React.FC<TableBodyProps> = ({ children }) => {

    return(
        <StyledTableBody>
            {children}
        </StyledTableBody>
    )
}


export default TableBody;