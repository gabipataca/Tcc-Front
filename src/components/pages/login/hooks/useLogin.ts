import { useUser } from "@/contexts/UserContext";
import AuthService from "@/services/AuthService";
import {
    LoginUserResponse,
} from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { zodResolver } from "@hookform/resolvers/zod";
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
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        let res: ServerSideResponse<LoginUserResponse> | null = null;

        try {
            res = await AuthService.loginUser(data);

            const body = res!.data!;

            setUser({
                id: body.user.id,
                email: body.user.email,
                ra: body.user.ra,
                joinYear: body.user.joinYear,
                username: body.user.username,
                role: body.user.role,
                groupId: body.user.groupId,
                token: body.token,
            });
        } catch (err) {
            console.error(err);

            if (res!.status == 400) {
                const body = res!.data!;

                const errors = body.errors!;

                for (let i = 0; i < errors.length; i++) {
                    setError(errors[i].target as "ra" | "password", {
                        type: "onBlur",
                        message: errors[i].message,
                    });
                    setValue(errors[i].target as "ra" | "password", "");
                }
            }
        }
    };

    return {
        control,
        handleSubmit,
        onSubmit,
    };
};

export default useLogin;
