"use client";

import Link from "next/link";
import styles from "./Button.module.scss";
import { ButtonProps } from "./types";
import { StyledButton } from "./styles";

const Button = ({
    className,
    children,
    onClick,
    role,
    type = "button",
    linkHref,
    style = "primary",
    rounded,
    fullWidth,
    primary = true,
}: ButtonProps) => {
    if (type == "button") {
        return (
            <StyledButton
                $secondary={!primary}
                $fullWidth={fullWidth}
                $rounded={rounded}
                className={`${className}`}
                onClick={onClick}
                role={role}
            >
                {children}
            </StyledButton>
        );
    } else {
        return (
            <Link
                className={`${styles.button}
                    ${style == "primary" ? styles.primary : styles.secondary}
                    ${rounded ? styles.rounded : ""}
                    ${fullWidth ? styles.fullWidth : ""}
                    ${className}
                `}
                role={"link"}
                href={linkHref!}
            >
                {children}
            </Link>
        );
    }
};

export default Button;
