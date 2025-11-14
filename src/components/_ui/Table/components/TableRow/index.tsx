"use client"

import React from "react";
import { StyledTableRow } from "./styles";
import { TableRowProps } from "./types";

import type { ForwardedRef } from "react";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, ...props }, ref: ForwardedRef<HTMLTableRowElement>) => {
        return (
            <StyledTableRow ref={ref} {...props}>
                {children}
            </StyledTableRow>
        );
    }
);

TableRow.displayName = "TableRow";

export default TableRow;