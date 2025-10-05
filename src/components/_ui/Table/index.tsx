"use client"

import React from "react";
import { StyledTable } from "./styles";
import { TableProps } from "./types";


import type { ForwardedRef } from "react";

const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ children }, ref: ForwardedRef<HTMLTableElement>) => {
        return (
            <StyledTable ref={ref}>
                {children}
            </StyledTable>
        );
    }
);

Table.displayName = "Table";

export default Table;
