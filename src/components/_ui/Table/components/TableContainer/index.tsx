import React from "react"
import { StyledTableContainer } from "./styles"




const TableContainer: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => {


    return(
        <StyledTableContainer {...props}>
            {children}
        </StyledTableContainer>
    )
}

export default TableContainer;