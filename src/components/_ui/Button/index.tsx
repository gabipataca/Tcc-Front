"use client"

import Link from "next/link";
import styles from "./Button.module.scss";
import { ButtonProps } from "./types";

const Button = ({ className, children, onClick, role, type = "button", linkHref, style = "primary", rounded, fullWidth }: ButtonProps) => {


    if (type == "button") {
        return (
            <button
                className={`${styles.button}
                    ${(style == "primary") ? styles.primary : styles.secondary}
                    ${(rounded) ? styles.rounded : ""}
                    ${(fullWidth) ? styles.fullWidth : ""}
                    ${className}
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
                    ${(style == "primary") ? styles.primary : styles.secondary}
                    ${(rounded) ? styles.rounded : ""}
                    ${(fullWidth) ? styles.fullWidth : ""}
                    ${className}
                `}
                role={"link"}
                href={linkHref!}
            >
                {children}
            </Link>
        );
    }
}

export default Button;