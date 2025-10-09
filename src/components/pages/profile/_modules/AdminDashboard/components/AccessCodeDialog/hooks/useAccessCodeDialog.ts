import TokenService from "@/services/TokenService";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

const useAccessCodeDialog = () => {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    const getCurrentCode = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await TokenService.getCurrentToken();

            if (res.status == 200) {
                setCode(res.data!.currentToken!);
            } else {
                throw new Error("Not possible to get current token");
            }
        } catch (error) {
            console.error("Erro ao buscar o código de acesso:", error);
            enqueueSnackbar("Erro ao buscar o código de acesso.", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar]);


    const updateCurrentCode = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await TokenService.updateCurrentToken();

            if (res.status == 200) {
                setCode(res.data!.newToken);
            } else {
                throw new Error("Not possible to update current token");
            }
        } catch (error) {
            console.error("Erro ao atualizar o código de acesso:", error);
            enqueueSnackbar("Erro ao atualizar o código de acesso.", {
                variant: "error",
                autoHideDuration: 3000,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
        } finally {
            setIsLoading(false);
        }
    }, [enqueueSnackbar]);

    return {
        code,
        isLoading,
        getCurrentCode,
        updateCurrentCode,
    };
};

export default useAccessCodeDialog;
