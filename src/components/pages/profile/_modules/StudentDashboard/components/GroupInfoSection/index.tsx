"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import AddGroupModal from "./components/AddGroupModal";
import EditGroupModal from "./components/EditGroupModal";
import AddMemberModal from "./components/AddMemberModal";
import { useUser } from "@/contexts/UserContext";
import GroupInfoSection from "./components/GroupInfoSection";
import InvitationSection from "./components/InvitationSection";
import GroupService from "@/services/GroupService";
import { useSnackbar } from "notistack";
import { GroupInvitation } from "@/types/Group";
import Loading from "@/components/_ui/Loading";
import NoGroupSection from "./components/NoGroupSection";

const GroupManagement = () => {
    const { user, setUser } = useUser();

    const { enqueueSnackbar } = useSnackbar();

    const [isLoadingGroupInfo, setIsLoadingGroupInfo] = useState(false);
    const [isLeavingGroup, setIsLeavingGroup] = useState(false);
    const [invitations, setInvitations] = useState<GroupInvitation[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const loadGroupInfo = useCallback(async () => {
        try {
            setIsLoadingGroupInfo(true);
            const [invitationsResponse, groupResponse] = await Promise.all([
                GroupService.GetGroupInvitations(),
                user!.group
                    ? GroupService.getGroupById(user!.group!.id)
                    : Promise.resolve({ status: 204, data: null }),
            ]);

            if (groupResponse.status == 200 || groupResponse.status != 500) {
                const data = groupResponse.data!;

                setUser((prev) => ({
                    ...prev!,
                    group:
                        groupResponse.status == 200 && groupResponse.data
                            ? {
                                  ...(prev!.group || {}),
                                  id: data.id,
                                  name: data.name,
                                  leaderId: data.leaderId,
                                  users: data.users,
                                  groupInvitations:
                                      prev!.group?.groupInvitations || [],
                              }
                            : null,
                    groupId:
                        groupResponse.status == 200 && groupResponse.data
                            ? data.id
                            : undefined,
                }));
            }

            if (invitationsResponse.status == 200) {
                if (invitationsResponse.data) {
                    setInvitations(invitationsResponse.data!);
                }
            }

            setIsLoadingGroupInfo(false);
        } catch (error) {
            console.error("Erro ao carregar convites:", error);

            enqueueSnackbar(
                "Não foi possível carregar as informações de grupo. Tente novamente mais tarde.",
                {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 3000,
                }
            );
        }

        setIsLoadingGroupInfo(false);
    }, [enqueueSnackbar, setUser, user]);

    const handleLeaveGroup = useCallback(
        async (groupId: number) => {
            try {
                setIsLeavingGroup(true);
                const res = await GroupService.removeUserFromGroup(
                    groupId,
                    user!.id
                );

                if (res.status === 200) {
                    setUser((prev) => ({
                        ...prev!,
                        groupId: undefined,
                        group: null,
                    }));

                    enqueueSnackbar("Você saiu do grupo com sucesso.", {
                        variant: "success",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                }

                if (res.status === 400) {
                    enqueueSnackbar(
                        "O grupo não existe ou você não pertence a ele.",
                        {
                            variant: "error",
                            autoHideDuration: 3000,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "right",
                            },
                        }
                    );
                }

                if (res.status === 403) {
                    enqueueSnackbar("Você não possui permissão.", {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                }

                setIsLeavingGroup(false);
            } catch (error) {
                console.error("Erro ao sair do grupo:", error);
                enqueueSnackbar(
                    "Não foi possível sair do grupo. Tente novamente.",
                    {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }
                );
                setIsLeavingGroup(false);
            }
        },
        [enqueueSnackbar, setUser, user]
    );

    const onAcceptInvitation = () => {
        setInvitations([]);
    };

    const renderContent = useMemo(() => {
        if (isLoadingGroupInfo) {
            return (
                <div className="relative flex flex-col gap-2 w-full h-full p-6">
                    <Loading size="md" variant="spinner" />
                </div>
            );
        }

        if (invitations.length > 0 && user?.group == null) {
            return (
                <div className="relative flex flex-col gap-2 w-full h-full p-6">
                    {invitations.map((invitation) => (
                        <InvitationSection
                            onAccept={onAcceptInvitation}
                            invitation={invitation}
                            key={`${invitation.id}-${invitation.userId}`}
                        />
                    ))}
                </div>
            );
        }
        if (user?.group) {
            return (
                <div className="relative flex flex-col gap-2 w-full h-full">
                    <GroupInfoSection
                        group={user.group}
                        onEditClick={() => setIsEditModalOpen(true)}
                        onAddMemberClick={() => setIsAddMemberModalOpen(true)}
                        onLeaveClick={handleLeaveGroup}
                        isLeavingGroup={isLeavingGroup}
                    />
                </div>
            );
        }
        return <NoGroupSection onCreateClick={() => setIsAddModalOpen(true)} />;
    }, [
        handleLeaveGroup,
        invitations,
        isLeavingGroup,
        isLoadingGroupInfo,
        user?.group,
    ]);

    const hasMember1 = (user?.group?.users.length || 0) > 1;
    const hasMember2 = (user?.group?.users.length || 0) > 2;

    useEffect(() => {
        loadGroupInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full bg-gradient-to-br from-white to-slate-50">
            {renderContent}

            {isAddModalOpen && !user?.group && (
                <AddGroupModal onClose={() => setIsAddModalOpen(false)} />
            )}

            {isEditModalOpen && user?.group && (
                <EditGroupModal onClose={() => setIsEditModalOpen(false)} />
            )}

            {isAddMemberModalOpen && user?.group && (
                <AddMemberModal
                    onClose={() => setIsAddMemberModalOpen(false)}
                    hasMember1={hasMember1}
                    hasMember2={hasMember2}
                    groupInvitations={invitations}
                />
            )}
        </div>
    );
};

export default GroupManagement;
