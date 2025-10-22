import { useCallback, useState } from "react";

const useInvitationSection = (
    onAccept: (groupId: number) => Promise<void>,
) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAccept = useCallback(
        async (groupId: number) => {
            try {
                setIsLoading(true);
                await onAccept(groupId);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        },
        [onAccept]
    );

    return {
        handleAccept,
        isLoading,
    };
};

export default useInvitationSection;
