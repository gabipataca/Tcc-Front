import { useUser } from "@/contexts/UserContext";
import { LoginUserResponse, RegisterUserResponse } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface LoginInputs {
	ra: string;
	password: string;
}

const schema = z.object({
	ra: z.string().min(6, { message: "RA deve ter no mínimo 6 digitos!" }).max(7, { message: "RA deve ter no máximo 7 digitos!" }),
	password: z.string()
});

const useLogin = () => {

    const { setUser } = useUser();

    const {
		handleSubmit,
		control,
        setValue,
		formState: { errors },
        setError
	} = useForm<LoginInputs>({
		defaultValues: {
			ra: "",
			password: ""
		},
		mode: "onChange",
		resolver: zodResolver(schema)
	});

	const onSubmit: SubmitHandler<LoginInputs> = async (data) => {

        let res: Response | null = null;

        try {
            res = await fetch("/auth/login", {
                body: JSON.stringify({ ra: data.ra, password: data.password }),
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                next: { revalidate: false }
            });

            const body = await res!.json() as LoginUserResponse;

            setUser({
                id: body.user.id,
                email: body.user.email,
                ra: body.user.ra,
                joinYear: body.user.joinYear,
                username: body.user.username,
                token: body.token
            });

            
        }catch(err) {
            console.error(err);

            if(res!.status == 400) {
                const body = await res!.json() as Omit<RegisterUserResponse, "user" | "token">;

                const errors = body.errors!;

                for(let i = 0; i < errors.length; i++) {
                    setError(errors[i].target as "ra" | "password", {
                        type: "onBlur",
                        message: errors[i].message
                    });
                    setValue(errors[i].target as "ra" | "password", "");
                }
            }
        }
		
	}

    return {
        control,
        handleSubmit,
        onSubmit
    }
}

export default useLogin;