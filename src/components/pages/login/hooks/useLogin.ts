import { useUser } from "@/contexts/UserContext";
import AuthService from "@/services/AuthService";
import {
    LoginUserResponse,
} from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface LoginInputs {
    ra: string;
    password: string;
}

const schema = z.object({
    ra: z
        .string()
        .min(6, { message: "RA deve ter no mínimo 6 digitos!" })
        .max(7, { message: "RA deve ter no máximo 7 digitos!" }),
    password: z.string(),
});

const useLogin = () => {
    const { setUser } = useUser();

    const router = useRouter();
    
    const [formError, setFormError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        setError,
    } = useForm<LoginInputs>({
        defaultValues: {
            ra: "",
            password: "",
        },
        mode: "onBlur",
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        let res: ServerSideResponse<LoginUserResponse> | null = null;

        try {
            setFormError(null);
            setIsLoading(true);
            res = await AuthService.loginUser(data);

            if(res.status != 200) {
                if(res.data?.errors) {
                    const errors = res.data.errors;

                    for (let i = 0; i < errors.length; i++) {
                        if(errors[i].target == "form") {
                            setFormError(errors[i].error);
                            continue;
                        }

                        setError(errors[i].target as "ra" | "password", {
                            type: "onBlur",
                            message: errors[i].error,
                        });
                        setValue(errors[i].target as "ra" | "password", "");
                    }
                }

                setIsLoading(false);
                return;
            }

            if(!res.data) {
                console.log(res);
                return;
            }

            const body = res.data;

            setUser({
                id: body.user.id,
                email: body.user.email,
                ra: body.user.ra,
                joinYear: body.user.joinYear,
                name: body.user.name,
                role: body.user.role,
                groupId: body.user.groupId,
                token: body.token,
                department: body.user.department,
                group: {
                    ...body.user.group,
                    groupInvitations: body.user.groupInvitations
                },
            });

            setTimeout(() => {
                router.push("/Profile");
            }, 100);
        } catch (err) {
            console.error(err);

            if (res!.status == 400) {
                const body = res!.data!;

                const errors = body.errors!;

                for (let i = 0; i < errors.length; i++) {
                    if(errors[i].target == "form") {
                            setFormError(errors[i].error);
                            continue;
                    }

                    setError(errors[i].target as "ra" | "password", {
                        type: "onBlur",
                        message: errors[i].error,
                    });
                    setValue(errors[i].target as "ra" | "password", "");
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        control,
        handleSubmit,
        onSubmit,
        formError,
        isLoading,
    };
};

export default useLogin;
