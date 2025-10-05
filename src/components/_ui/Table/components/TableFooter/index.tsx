"use client"

import React from "react";
import { StyledTableFooter } from "./styles";

import type { ForwardedRef } from "react";
import { TableFooterProps } from "./types";

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children }, ref: ForwardedRef<HTMLTableSectionElement>) => {
        return (
            <StyledTableFooter ref={ref}>
                {children}
            </StyledTableFooter>
        );
    }
);

TableFooter.displayName = "TableFooter";

export default TableFooter;