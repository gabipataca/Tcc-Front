"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrivateTokenContext } from "../contexts/PrivateTokenContext"



const useAdminDashboard = () => {
    const {
        token,
        fetchToken,
    } = usePrivateTokenContext();

    const [showAccessCodeDialog, setShowAccessCodeDialog] = useState(false);

    const toggleShowAccessCodeDialog = useCallback(() => {
        setShowAccessCodeDialog((prev) => !prev);
    }, []);


    useEffect(() => {
        fetchToken();
    }, [fetchToken]);

    return {
        token,
        showAccessCodeDialog,
        toggleShowAccessCodeDialog,
    }
}

export default useAdminDashboard;