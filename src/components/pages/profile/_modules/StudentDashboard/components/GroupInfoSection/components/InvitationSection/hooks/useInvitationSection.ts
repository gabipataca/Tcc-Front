import { useUser } from "@/contexts/UserContext";
import GroupService from "@/services/GroupService";
import { useCallback, useState } from "react";

const useInvitationSection = (
    onAccept: () => void,
) => {
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useUser();

    const handleAcceptInvitation = useCallback(async (groupId: number) => {
        try {
            setIsLoading(true);
            const response = await GroupService.AcceptGroupInvitation(groupId);


            console.log(response);

            if(response.status == 200) {
                const data = response.data!
                
                setUser((prev) => ({
                    ...prev!,
                    groupId: data.groupId,
                    group: data.group
                }))

                setIsLoading(false);
                onAccept();
            }

        } catch(error) {
            console.error(error);
            setIsLoading(false);
        }
        
    }, []);

    return {
        handleAcceptInvitation,
        isLoading,
    };
};

export default useInvitationSection;
