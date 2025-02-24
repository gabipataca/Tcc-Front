"use client"

import styles from "./ScreenContainer.module.scss";
import { ScreenContainerProps } from "./types";


/**
 * ScreenContainer component that wraps its children within a styled div.
 *
 * @component
 * @param {ScreenContainerProps} props - The props for the ScreenContainer component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the container.
 * @returns {JSX.Element} The rendered ScreenContainer component.
 */
const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {

    return(
        <div className={styles.screenContainer}>
            {children}
        </div>
    );
}

export default ScreenContainer;