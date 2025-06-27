"use client"

import React from "react";
import { StyledTableHeaderItem } from "./styles";
import { TableHeaderItemProps } from "./types";

const TableHeaderItem: React.FC<TableHeaderItemProps> = ({ item }) => {
    return (
        <StyledTableHeaderItem space={item.space}>
            {item.content}
        </StyledTableHeaderItem>
    );
};

export default TableHeaderItem;
