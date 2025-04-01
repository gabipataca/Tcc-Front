import Falcon from "@/components/_ui/icons/Falcon";
import React from "react";



const LogoContainer: React.FC = () => {

    return(
		<div className="w-1/2 bg-[#4f85a0] flex flex-col justify-center items-center">
            <Falcon className="max-w-md object-contain mb-4 w-80 h-auto" />
            <p className="text-white text-[60px] font-bold tracking-wider ml-10">FHO</p>
        </div>
    );
}


export default LogoContainer;