"use client"

import React from "react";
import { StyledTableCell } from "./styles";
import { TableHeaderItemProps } from "./types";


import type { ForwardedRef } from "react";

const TableCell = React.forwardRef<HTMLTableCellElement, TableHeaderItemProps>(
    ({ item }, ref: ForwardedRef<HTMLTableCellElement>) => {
        return (
            <StyledTableCell ref={ref} space={item.space}>
                {item.content}
            </StyledTableCell>
        );
    }
);

TableCell.displayName = "TableHeaderItem";

export default TableCell;
