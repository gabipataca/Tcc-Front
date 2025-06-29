"use client"

import Link from "next/link";
import React from "react";
import { PageLinkProps } from "./types";
import styles from "./PageLink.module.scss";


const PageLink: React.FC<PageLinkProps> = ({ children, href }) => {
    

    return(
        <Link
            href={href}
            className={`${styles.link}`}
        >
            { children }
        </Link>
    );
}

export default PageLink;