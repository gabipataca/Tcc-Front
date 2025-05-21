import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

interface StyledTableHeaderItemProps {
    space: number;
}

export const StyledTableHeaderItem = styled(TableCell)<StyledTableHeaderItemProps>`
    color: var(--primary-text-color) !important;
    text-align: center !important;
`;