import React from "react";

interface ProfileItemProps {
    children: React.ReactNode;
    size?: "default" | "large";
}

const ProfileItem: React.FC<ProfileItemProps> = ({
    children,
    size = "default",
}) => {
    return (
        <div
            className={`bg-white p-6 shadow-md rounded-lg w-full`}
            style={{
                flex: size == "default" ? 1 : size == "large" ? 2 : 3,
            }}
        >
            {children}
        </div>
    );
};

export default ProfileItem;
