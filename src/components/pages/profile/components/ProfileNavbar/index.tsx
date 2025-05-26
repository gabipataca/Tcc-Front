import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

interface ProfileNavbarProps {
    children: React.ReactNode;
}

const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ children }) => {
    /* Navbar Superior */
    return (
        <div className="bg-[#4F85A6] text-white flex justify-between items-center p-3 px-6">
            <nav className="flex space-x-6 text-lg">{children}</nav>
            <button className="text-white ml-auto">
                <FaSignOutAlt size={24} />
            </button>
        </div>
    );
};

export default ProfileNavbar;
