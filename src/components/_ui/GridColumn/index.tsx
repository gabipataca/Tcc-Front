import React from "react";
import { GridColumnProps } from "./types";




const GridColumn: React.FC<GridColumnProps> = ({ children }) => {
    return(
        <div className="grid grid-cols-2 gap-8 py-6 px-20 mt-6">
            {children}
        </div>
    );
}

export default GridColumn;