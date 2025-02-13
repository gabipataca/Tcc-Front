"use client"

import styles from "./Button.module.scss";

interface ButtonProps {
    children: React.ReactNode;
    rounded?: boolean;
    onClick: (e?: React.MouseEvent) => void;
}

const Button = ({ children, rounded, onClick }: ButtonProps) => {

    

    return(
        <button
            className={`
                w-full bg-red-600 text-white p-2 rounded hover:bg-blue-700
                ${(rounded == true) ? "rounded-2xl" : ""}
            `}
            onClick={onClick}
        >
            { children }
        </button>
    );
}

export default Button;