import { usePrivateTokenContext } from "../../../contexts/PrivateTokenContext";

const useAccessCodeDialog = () => {
    const { fetchToken, isLoading, refreshToken, token } = usePrivateTokenContext();

    return {
        token,
        isLoading,
        fetchToken,
        refreshToken,
    };
};

export default useAccessCodeDialog;
