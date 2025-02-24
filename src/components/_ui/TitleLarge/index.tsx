
import styles from "./TitleLarge.module.scss";
import React from "react";
import { TitleLargeProps } from "./types";



const TitleLarge: React.FC<TitleLargeProps> = ({ children, className }) => {

    return(
        <h1
            className={`
                ${styles.titleLarge}
                ${className ?? ""}
            `}
        >
            {children}
        </h1>
    );
}

export default TitleLarge;