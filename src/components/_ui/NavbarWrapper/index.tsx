"use client";

import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";
import NavbarCompetition from "../NavbarCompetition";
import Navbar from "../Navbar";

const NavbarWrapper: FC = () => {
    const pathName = usePathname();

    const hideNavbar = useMemo(
        () => ["/login", "/register", "/forgot-password", "/"].includes(pathName),
        [pathName]
    );

    const navbarToRender = useMemo(() => {
        if (hideNavbar) {
            return null;
        }

        return pathName.includes("Competition") ? (
            <NavbarCompetition />
        ) : (
            <Navbar />
        );
    }, [hideNavbar, pathName]);

    return <>{navbarToRender}</>;
};

export default NavbarWrapper;
