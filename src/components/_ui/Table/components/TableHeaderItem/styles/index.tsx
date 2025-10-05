"use client"

import { styled } from '@mui/material/styles';
import { TableCell } from "@mui/material";

interface StyledTableCellProps {
    space: number;
}

export const StyledTableCell = styled(TableCell)<StyledTableCellProps>`
    color: var(--primary-text-color) !important;
    text-align: center !important;
`;