"use client"

import React from "react";
import { TableHeaderProps } from "./types";
import { StyledTableHead } from "./styles";




import type { ForwardedRef } from "react";

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ children }, ref: ForwardedRef<HTMLTableSectionElement>) => {
        return (
            <StyledTableHead ref={ref}>
                {children}
            </StyledTableHead>
        );
    }
);

TableHead.displayName = "TableHeader";

export default TableHead;