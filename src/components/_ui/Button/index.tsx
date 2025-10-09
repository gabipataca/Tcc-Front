"use client";

import Link from "next/link";
import styles from "./Button.module.scss";
import { ButtonProps } from "./types";
import Loading from "../Loading";

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
    loading,
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
                {loading && (
                    <div className="relative w-4 h-auto flex justify-center items-center">
                        <Loading colorClass="fill-slate-100" variant="spinner" size="md" />
                    </div>
                )}
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
