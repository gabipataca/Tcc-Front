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

            if(response.status == 200 && response.data) {
                const data = response.data;
                
                setUser((prev) => {
                    if (!prev) return prev;
                    
                    return {
                        ...prev,
                        groupId: data.groupId,
                        group: {
                            id: data.group.id,
                            name: data.group.name,
                            leaderId: data.group.leaderId,
                            users: data.group.users,
                            groupInvitations: data.group.groupInvitations?.map(invite => ({
                                id: invite.id,
                                userId: invite.user?.id || "",
                                group: invite.group || null,
                                user: invite.user!,
                                accepted: invite.accepted,
                            })) || [],
                        },
                    };
                });

                setIsLoading(false);
                onAccept();
            }

        } catch(error) {
            console.error(error);
            setIsLoading(false);
        }
        
    }, [onAccept, setUser]);

    return {
        handleAcceptInvitation,
        isLoading,
    };
};

export default useInvitationSection;
