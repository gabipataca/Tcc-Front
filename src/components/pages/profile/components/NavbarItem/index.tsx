import Link from "next/link";


/**
 * Props for the NavbarItem component.
 *
 */
interface NavbarItemProps {
    /**
     * The content to be rendered inside the NavbarItem component.
     * Typically, this will be text or other React elements representing the item.
     */
    children: React.ReactNode;

    /**
     * The destination URL or path that the NavbarItem should link to when clicked.
     */
    destinyHref: string;
}

/**
 * A navigation bar item component that wraps its children with a link.
 *
 */
const NavbarItem: React.FC<NavbarItemProps> = ({ children, destinyHref }) => {
    

    return(
        <Link className="hover:underline" href={destinyHref}>
            {children}
        </Link>
    );
}

export default NavbarItem;