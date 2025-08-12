import SideMenu from "@/components/_ui/SideMenu";
import ProfileMenuContextProvider from "@/components/pages/profile/providers/ProfileMenuContextProvider"
import { ReactNode } from "react";



const ProfileLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ProfileMenuContextProvider>
            <div className="flex bg-gradient-to-br from-slate-50 to-slate-100">
                <SideMenu />

                {children}
            </div>
        </ProfileMenuContextProvider>
    );
}

export default ProfileLayout;