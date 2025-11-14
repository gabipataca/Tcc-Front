"use client"

import React from "react";
import { StyledTableCell } from "./styles";
import { TableCellProps } from "./types";




import type { ForwardedRef } from "react";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children }, ref: ForwardedRef<HTMLTableCellElement>) => {
        return (
            <StyledTableCell ref={ref}>
                {children}
            </StyledTableCell>
        );
    }
);

TableCell.displayName = "TableCell";

export default TableCell;