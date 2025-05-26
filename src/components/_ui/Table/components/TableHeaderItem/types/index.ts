import React from "react";

export interface TableHeaderItem {
    content?: string | React.ReactNode;
    space: number;
}

export interface TableHeaderItemProps {
    item: TableHeaderItem;
}