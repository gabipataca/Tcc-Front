"use client"

import React from "react";
import { StyledTableBody } from "./styles";
import { TableBodyProps } from "./types";




import type { ForwardedRef } from "react";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children }, ref: ForwardedRef<HTMLTableSectionElement>) => {
        return (
            <StyledTableBody ref={ref}>
                {children}
            </StyledTableBody>
        );
    }
);

TableBody.displayName = "TableBody";

export default TableBody;