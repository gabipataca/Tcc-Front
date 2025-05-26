import React from "react";

const ContentContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <div className="flex h-full mx-auto w-full">{children}</div>;
};

export default ContentContainer;
