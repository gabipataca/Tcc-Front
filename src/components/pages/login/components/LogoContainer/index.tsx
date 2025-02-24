import React from "react";



const LogoContainer: React.FC = () => {

    return(
		<div className="w-1/2 bg-[#4f85a0] flex flex-col justify-center items-center">
            <img src="/falcon.png" alt="Logo FHO" className="max-w-md object-contain mb-4" />
            <p className="text-white text-[60px] font-bold tracking-wider ml-10">FHO</p>
        </div>
    );
}


export default LogoContainer;