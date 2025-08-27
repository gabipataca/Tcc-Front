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
    size = "default",
}: ButtonProps) => {
    if (type == "button") {
        return (
            <button
                className={`${styles.button}
                    ${styles[style]}
                    ${rounded ? styles.rounded : ""}
                    ${fullWidth ? styles.fullWidth : ""}
                    ${className ?? ""}
                    ${styles[size]}
                `}
                onClick={onClick}
                role={role}
            >
                {children}
            </button>
        );
    } else {
        return (
            <Link
                className={`${styles.button}
                    ${styles[style]}
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
