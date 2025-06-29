"use client"

import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { defaultStyledOptions } from '@/utilities/styled';

interface StyledButtonProps {
    $secondary?: boolean;
    $fullWidth?: boolean;
    $rounded?: boolean;
}


export const StyledButton = styled(Button, {
    ...defaultStyledOptions
})<StyledButtonProps>`
    width: ${(props) => (props.$fullWidth ? "100%" : "max-content")};
    color: ${(props) => (props.$secondary ? "var(--secondary-text-color)" : "var(--primary-text-color)")};
    background-color: ${(props) => (props.$secondary ? "var(--secondary-bg-color)" : "var(--primary-bg-color)")};
    font-size: 1rem;
    border-radius: ${(props) => (props.$rounded ? "0.5rem" : "0")};

    &:hover {
        color: ${(props) => (props.$secondary ? "var(--secondary-hover-text-color)" : "var(--primary-hover-text-color)")};
        background-color: ${(props) => (props.$secondary ? "var(--secondary-hover-bg-color)" : "var(--primary-hover-bg-color)")};
    }
`;