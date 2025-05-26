import styled from "styled-components";
import { Button } from "@mui/material";


export const StyledButton = styled(Button)<{ $secondary?: boolean, $fullWidth?: boolean, $rounded?: boolean }>`
    width: ${props => props.$fullWidth ? "100%" : "max-content"};

    color: ${props => props.$secondary ? "var(--secondary-text-color)" : "var(--primary-text-color)"};
    background-color: ${props => props.$secondary ? "var(--secondary-bg-color)" : "var(--primary-bg-color)"};

    border-radius: ${props => props.$rounded ? "0.5rem" : "0"};
    text-transform: none;

    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;

    &:hover {
        color: ${props => props.$secondary ? "var(--secondary-hover-text-color)" : "var(--primary-hover-text-color)"};
        background-color: ${props => props.$secondary ? "var(--secondary-hover-bg-color)" : "var(--primary-hover-bg-color)"};
    }
`;