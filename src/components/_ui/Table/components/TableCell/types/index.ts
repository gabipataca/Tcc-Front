import React from "react";

export interface TableCell {
    content: string | React.ReactNode;
    size: number;
}


export interface TableCellProps {
    children: React.ReactNode;
}