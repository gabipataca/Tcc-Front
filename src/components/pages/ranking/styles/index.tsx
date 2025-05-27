import styled from "@emotion/styled";

interface StyledRankingCellContainerProps {
    $fillColor: string;
    $size: number;
}

export const StyledRankingCellContainer = styled.div<StyledRankingCellContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & svg {
        height: ${(props) => props.$size}px !important;
        width: auto !important;
        fill: ${(props) => props.$fillColor} !important;
    }
`;