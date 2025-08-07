import useProfile from "@/components/pages/profile/hooks/useProfile";
import { FC, Suspense } from "react";




const Profile: FC = () => {
    const { ProfileToRender } = useProfile();

    return(
        <Suspense>
            {(ProfileToRender) && <ProfileToRender />}
        </Suspense>
    );
}


export default Profile;