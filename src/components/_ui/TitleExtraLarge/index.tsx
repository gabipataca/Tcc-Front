import styles from "./TitleExtraLarge.module.scss";
import { TitleExtraLargeProps } from "./types";


const TitleExtraLarge: React.FC<TitleExtraLargeProps> = ({ children, className, centered }) => {


    return(
        <h1
            className={`
                ${styles.titleExtraLarge}
                ${(centered) ? styles.centered : ""}
                ${className}
            `}
        >
            {children}
        </h1>
    );
}

export default TitleExtraLarge;