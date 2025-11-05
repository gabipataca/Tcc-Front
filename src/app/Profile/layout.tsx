import SideMenu from "@/components/_ui/SideMenu";
import { PrivateTokenContextProvider } from "@/components/pages/profile/_modules/AdminDashboard/contexts/PrivateTokenContext";
import ProfileMenuContextProvider from "@/components/pages/profile/providers/ProfileMenuContextProvider"
import { ReactNode } from "react";



const ProfileLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ProfileMenuContextProvider>
            <PrivateTokenContextProvider>
                <div className="flex flex-1 bg-gradient-to-br from-slate-50 to-slate-100">
                    <SideMenu />

                    {children}
                </div>
            </PrivateTokenContextProvider>
        </ProfileMenuContextProvider>
    );
}

export default ProfileLayout;