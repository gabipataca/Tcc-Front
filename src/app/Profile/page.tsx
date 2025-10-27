"use client";

import Loading from "@/components/_ui/Loading";
import useProfile from "@/components/pages/profile/hooks/useProfile";
import { FC, Suspense } from "react";

const Profile: FC = () => {
    const { ProfileToRender } = useProfile();

    return (
        <Suspense fallback={<Loading variant="spinner" size="lg" />}>
            {ProfileToRender && <ProfileToRender />}
        </Suspense>
    );
};

export default Profile;
