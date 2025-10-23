import { useUser } from "@/contexts/UserContext";
import UserService from "@/services/UserService";
import { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    joinYear: z
        .number({ invalid_type_error: "O ano de ingresso deve ser um número." })
        .min(1900, "O ano de ingresso deve ser maior ou igual a 1900.")
        .max(
            new Date().getFullYear(),
            `O ano de ingresso não pode ser no futuro.`
        ),
});

interface EditStudentInfoFormData {
    name: string;
    joinYear: number;
}

const useEditStudentInfoModal = (currentUser: User, onClose: () => void) => {
    const { setUser } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);

    const { control, reset, handleSubmit, watch, setError, setValue } =
        useForm<EditStudentInfoFormData>({
            defaultValues: {
                name: currentUser.name || "",
                joinYear: currentUser.joinYear || new Date().getFullYear(),
            },
            mode: "onBlur",
            resolver: zodResolver(schema),
        });

    const handleOnSubmit: SubmitHandler<EditStudentInfoFormData> = useCallback(
        async (data) => {
            try {
                setIsLoading(true);
                const response = await UserService.updateUser(currentUser.id, {
                    id: currentUser.id,
                    department: currentUser.department,
                    email: currentUser.email,
                    name: data.name,
                    joinYear: data.joinYear,
                    groupId: currentUser.groupId,
                    status: 1,
                });

                if (response.status == 200) {
                    setUser((prev) => ({
                        ...prev!,
                        name: data.name,
                        joinYear: data.joinYear,
                    }));
                    enqueueSnackbar("Informações atualizadas com sucesso!", {
                        variant: "success",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        disableWindowBlurListener: true
                    });
                    setIsLoading(false);
                    onClose();
                    return;
                }

                enqueueSnackbar(
                    "Ocorreu um erro ao atualizar as informações.",
                    {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }
                );
                setIsLoading(false);
            } catch (error) {
                console.error(
                    "Erro ao atualizar as informações do aluno:",
                    error
                );
                enqueueSnackbar(
                    "Ocorreu um erro ao atualizar as informações.",
                    {
                        variant: "error",
                        autoHideDuration: 3000,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }
                );
                setIsLoading(false);
            }
        },
        [
            currentUser.department,
            currentUser.email,
            currentUser.groupId,
            currentUser.id,
            enqueueSnackbar,
            onClose,
            setUser,
        ]
    );

    return {
        control,
        isLoading,
        handleSubmit: handleSubmit(handleOnSubmit),
        resetForm: () =>
            reset({
                name: currentUser.name || "",
                joinYear: currentUser.joinYear || new Date().getFullYear(),
            }),
        
    }
};

export default useEditStudentInfoModal;
