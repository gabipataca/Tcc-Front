import React from "react";
import styles from "./BodyLarge.module.scss";
import { BodyLargeProps } from "./types";



const BodyLarge: React.FC<BodyLargeProps> = ({ children, className, centered, white }) => {


    return(
        <p className={`
            ${styles.bodyLarge}
            ${(centered) ? styles.centered : ""}
            ${(white) ? styles.white : styles.slate}
            ${className}
        `}>
            {children}
        </p>
    );
}

export default BodyLarge;