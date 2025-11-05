"use client"

import React from "react"
import { StyledTableContainer } from "./styles"



import type { ForwardedRef } from "react";
import { TableContainerProps } from "@mui/material";

const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
    ({ children, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
        return (
            <StyledTableContainer ref={ref} {...props}>
                {children}
            </StyledTableContainer>
        );
    }
);

TableContainer.displayName = "TableContainer";

export default TableContainer;