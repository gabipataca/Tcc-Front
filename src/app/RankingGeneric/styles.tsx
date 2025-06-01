import styled from "styled-components";

export const StyledRankingCellContainer = styled.div<{
    $fillColor: string;
    $size: number;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${({ $fillColor}) => $fillColor};
    font-weight: bold;
    font-size: 0.875rem;
    position: relative;

    & svg {
        width: ${({ $size }) => $size}px;
        height: auto;
        fill: ${({ $fillColor }) => $fillColor};
    }
`;
