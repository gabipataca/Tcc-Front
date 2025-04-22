import { DropdownOption } from "@/components/_ui/Dropdown/types";
import { useUser } from "@/contexts/UserContext";
import { RegisterUserRequest, RegisterUserResponse } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


const schema = z.object({
    username: z.string({ message: "Campo obrigatório" }),
    ra: z.string().min(6, { message: "RA deve ter no mínimo 6 dígitos!" }).max(7, { message: "RA deve ter no máximo 7 dígitos!" }),
    email: z.string().email("Formato de e-mail inválido!"),
    password: z.string({ message: "Campo obrigatório" }),
    joinYear: z.coerce.number().min(new Date().getFullYear() - 8, "Ano inválido!").max(new Date().getFullYear(), "Ano inválido!").optional(),
    role: z.enum(["student", "teacher"]),
    accessCode: z.string().optional()
}).superRefine((data, ctx) => {
    if(data.role === "teacher" && data.accessCode === "") {
        ctx.addIssue({
            path: ["accessCode"],
            code: "custom",
            message: "É necessário o código de acesso!",
        });
    }

    const addInvalidJoinYear = () => {
        ctx.addIssue({
            path: ["joinYear"],
            code: "custom",
            message: "Ano inválido"
        });
    }

    if(data.role === "student") {
        if(data.joinYear === undefined) {
            addInvalidJoinYear();
        } else if(data.joinYear === "" || new Date().getFullYear() - data.joinYear > 8) {
            addInvalidJoinYear();
        } else if(data.joinYear > new Date().getFullYear()) {
            addInvalidJoinYear();
        }
    }
});



const useRegister = () => {
    const { setUser } = useUser();

    const { control, handleSubmit, setError, setValue, register, watch, formState: { isValid } } = useForm<RegisterUserRequest>({
        defaultValues: {
            username: "",
            ra: "",
            role: "student",
            email: "",
            joinYear: "",
            password: "",
            accessCode: ""
        },
        mode: "all",
        resolver: zodResolver(schema)
    });

    const roleOptions: DropdownOption[] = [
        {
            label: "Estudante",
            value: "student"
        },
        {
            label: "Professor",
            value: "teacher"
        }
    ];

    const handleFormSubmit = useCallback(async (data: RegisterUserRequest) => {
        console.log(isValid)
        if(isValid) {
            return;
        }

        let res;

        try {
            res = await fetch("/api/auth/register", {
                body: JSON.stringify(data),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            const resData = await res.json() as RegisterUserResponse;

            if(res.status == 201) {
                setUser({
                    id: resData.user.id,
                    ra: resData.user.ra,
                    username: resData.user.username,
                    email: resData.user.email,
                    joinYear: resData.user.joinYear,
                    token: resData.token
                });
            }

        } catch (err) {
            console.error(err);

            if (res!.status == 400) {
                const body = await res!.json() as Omit<RegisterUserResponse, "user" | "token">;

                const errors = body.errors!;

                for (let i = 0; i < errors.length; i++) {
                    setError(errors[i].target as "ra" | "password", {
                        type: "onBlur",
                        message: errors[i].message
                    });
                    setValue(errors[i].target as "ra" | "password", "");
                }
            }
        }



    }, [isValid, setError, setUser, setValue]);

    const formData = watch();



    return {
        control,
        handleSubmit,
        handleFormSubmit,
        register,
        formData,
        roleOptions
    }
}


export default useRegister;