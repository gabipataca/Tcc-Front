"use client";

import { DropdownOption } from "@/components/_ui/Dropdown/types";
import { useUser } from "@/contexts/UserContext";
import AuthService from "@/services/AuthService";
import { RegisterUserRequest } from "@/types/Auth/Requests";
import { RegisterUserResponse } from "@/types/Auth/Responses";
import { ServerSideResponse } from "@/types/Global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation"

const schema = z
    .object({
        name: z.string({ message: "Campo obrigatório" }),
        ra: z
            .string()
            .min(6, { message: "RA deve ter no mínimo 6 dígitos!" })
            .max(7, { message: "RA deve ter no máximo 7 dígitos!" }),
        email: z.string().email("Formato de e-mail inválido!"),
        password: z.string({ message: "Campo obrigatório" }),
        joinYear: z.coerce
            .number()
            .min(new Date().getFullYear() - 8, "Ano inválido!")
            .max(new Date().getFullYear(), "Ano inválido!")
            .nullable(),
        role: z.enum(["Student", "Teacher"]),
        accessCode: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.role === "Teacher" && data.accessCode === "") {
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
                message: "Ano inválido",
            });
        };

        if (data.role === "Student") {
            // @ts-expect-error : extra
            if (data.joinYear === "") {
                addInvalidJoinYear();
            } else if (
                !data.joinYear ||
                data.joinYear === 0 ||
                new Date().getFullYear() - data.joinYear > 8
            ) {
                addInvalidJoinYear();
            } else if (data.joinYear > new Date().getFullYear()) {
                addInvalidJoinYear();
            }
        }
    });

const useRegister = () => {
    const { setUser } = useUser();

    const {
        control,
        handleSubmit,
        setError,
        setValue,
        register,
        watch,
        formState: { isValid },
    } = useForm<RegisterUserRequest>({
        defaultValues: {
            name: "",
            ra: "",
            role: "Student",
            email: "",
            // @ts-expect-error : irrelevant
            joinYear: "",
            password: "",
            accessCode: "",
        },
        mode: "onBlur",
        resolver: zodResolver(schema),
    });

    const router = useRouter();

    const roleOptions: DropdownOption[] = [
        {
            label: "Estudante",
            value: "Student",
        },
        {
            label: "Professor",
            value: "Teacher",
        },
    ];

    const handleFormSubmit: SubmitHandler<RegisterUserRequest> = useCallback(
        async (data: RegisterUserRequest) => {
            if (!isValid) {
                return;
            }

            let res: ServerSideResponse<RegisterUserResponse> | null = null;

            try {
                res = await AuthService.registerUser(data);

                const resData = res.data!;

                if (res.status == 200) {
                    setUser({
                        id: resData.user.id,
                        ra: resData.user.ra,
                        name: resData.user.name,
                        email: resData.user.email,
                        role: resData.user.role,
                        groupId: resData.user.groupId,
                        joinYear: resData.user.joinYear,
                        token: resData.token,
                    });

                    setTimeout(() => {
                        router.push("/profile");
                    }, 600);
                }
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
        },
        [isValid, setError, setUser, setValue]
    );

    const formData = watch();

    return {
        control,
        handleSubmit,
        handleFormSubmit,
        register,
        formData,
        roleOptions,
    };
};

export default useRegister;
