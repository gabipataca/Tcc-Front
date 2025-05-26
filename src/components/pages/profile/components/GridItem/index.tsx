import React from "react";

interface GridItemProps {
    /**
     * The content to be rendered inside the GridItem component.
     * Typically, this will be text or other React elements representing the item.
     */
    children: React.ReactNode;
}



/**
 * Represents a grid item container with predefined styling.
 * 
 * @remarks
 * This component wraps its children in a styled `div` element, applying
 * background color, shadow, rounded corners, flex layout, and padding.
 */
const GridItem: React.FC<GridItemProps> = ({ children }) => {
    return(
        <div className="bg-white shadow-md rounded-lg flex flex-col relative p-4">
            {children}
        </div>
    );
}

export default GridItem;