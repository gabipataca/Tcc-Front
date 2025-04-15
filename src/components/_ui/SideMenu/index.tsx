import Falcon from "@/components/_ui/icons/Falcon";
import React from "react"
import { FaUserCircle } from "react-icons/fa"



const SideMenu: React.FC = () => {

    return (
        <div className="w-[250px] bg-[#4F85A6] flex flex-col items-center py-8 relative">
        <div className="mt-[-30px] mb-2">
          <img src="/fhologo.png" alt="" className="h-20" />
        </div>
            <div className="mt-20 h-full top-24 flex flex-col items-center">
                <FaUserCircle size={140} className="text-white mb-4" />
                <h2 className="text-white text-2xl font-semibold mb-1">Perfil ADM</h2>
                <p className="text-white text-lg">E-mail Institucional</p>
                <div className="mt-auto mb-3">
                    <Falcon className="w-32 h-auto" />
                </div>
            </div>
        </div>
    );
}


export default SideMenu;