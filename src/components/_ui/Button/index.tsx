"use client";

import Link from "next/link";
import styles from "./Button.module.scss";
import { ButtonProps } from "./types";

const Button = ({
    className,
    children,
    onClick,
    role,
    type = "button",
    linkHref,
    variant = "primary",
    rounded,
    fullWidth,
    size = "default",
    disabled,
}: ButtonProps) => {
    if (type == "button") {
        return (
            <button
                className={`${styles.button}
                    ${styles[variant] ?? styles.primary}
                    ${rounded ? styles.rounded : ""}
                    ${fullWidth ? styles.fullWidth : ""}
                    ${styles[size]}
                    ${className ?? ""}
                `}
                onClick={onClick}
                role={role}
                disabled={disabled}
            >
                {children}
            </button>
        );
    } else {
        return (
            <Link
                className={`${styles.button}
                    ${styles[variant]}
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
