import { useState, useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useLoadExercises from "./useLoadExercises";
import CompetitionService from "@/services/CompetitionService";
import { convertNumberToTimeSpan, parseDate } from "@/libs/utils";
import { CreateCompetitionRequest } from "@/types/Competition/Requests";
import { useSnackbar } from "notistack";
import useProfileMenu from "@/components/pages/profile/hooks/useProfileMenu";

interface CompetitionFormInputs {
    competitionName: string;
    startDate: string;
    startTime: string;
    duration: number;
    stopAnswering: number;
    stopScoreboard: number;
    penalty: number;
    maxFileSize: number;
    exerciseCount: number;
}

const schema = z
    .object({
        competitionName: z.string().min(3, {
            message: "O nome da maratona deve ter no mínimo 3 caracteres.",
        }),
        startDate: z
            .string()
            .min(1, { message: "A data de início é obrigatória." }),
        startTime: z
            .string()
            .min(1, { message: "A hora de início é obrigatória." }),
        duration: z.coerce
            .number()
            .min(1, { message: "A duração deve ser de no mínimo 1 minuto." }),
        stopAnswering: z.coerce.number().min(1, {
            message:
                "O tempo para parar respostas deve ser de no mínimo 1 minuto.",
        }),
        stopScoreboard: z.coerce.number().min(1, {
            message:
                "O tempo para parar o placar deve ser de no mínimo 1 minuto.",
        }),
        penalty: z.coerce
            .number()
            .min(0, { message: "A penalidade deve ser um número positivo." }),
        maxFileSize: z.coerce.number().min(1, {
            message: "O tamanho máximo do arquivo deve ser de no mínimo 1 KB.",
        }),
        exerciseCount: z.coerce
            .number()
            .min(2, { message: "Mínimo de 2 exercícios." })
            .max(15, { message: "Máximo de 15 exercícios." }),
    })
    .superRefine((data, ctx) => {
        if (Number.isNaN(data.exerciseCount)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "O número de exercícios deve ser um número válido.",
            });
        }

        if (data.startDate) {
            const today = new Date(Date.now());
            const startDateTime = parseDate(data.startDate);

            if (startDateTime == null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Data de início inválida.",
                    path: ["startDate"],
                });
            } else {
                if (startDateTime.getTime() < today.getTime()) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "A data de início deve ser no futuro.",
                        path: ["startDate"],
                    });
                }
            }
        }
    });

const useCreateCompetition = () => {
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { toggleMenu } = useProfileMenu();

    const {
        exercises,
        isLoading,
        maxPages,
        pageSize,
        currentPage,
        search,
        togglePage,
        loadExercises,
        setSearch,
        totalExercises,
    } = useLoadExercises();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        trigger,
        watch,
    } = useForm<CompetitionFormInputs>({
        defaultValues: {
            competitionName: "",
            startDate: "",
            startTime: "",
            duration: 90,
            stopAnswering: 85,
            stopScoreboard: 80,
            penalty: 30,
            maxFileSize: 20,
            exerciseCount: 2,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const formValues = watch();

    const toggleExercise = useCallback(
        (exerciseId: number) => {
            setSelectedExercises((prev) => {
                const newSelection = prev.includes(exerciseId)
                    ? prev.filter((e) => e !== exerciseId)
                    : [...prev, exerciseId];

                if (newSelection.length > formValues.exerciseCount) {
                    return newSelection.slice(0, formValues.exerciseCount);
                }
                return newSelection;
            });
        },
        [formValues.exerciseCount]
    );

    const isExerciseSelectionValid = useMemo(() => {
        return selectedExercises.length === formValues.exerciseCount;
    }, [selectedExercises, formValues.exerciseCount]);

    const isFormValid = useMemo(() => {
        return isValid && isExerciseSelectionValid;
    }, [isValid, isExerciseSelectionValid]);

    const onSubmit: SubmitHandler<CompetitionFormInputs> = async (data) => {
        setIsSubmitting(true);
        let errored = false;

        try {
            const payload: CreateCompetitionRequest = {
                name: data.competitionName,
                startTime: new Date(
                    `${data.startDate}T${data.startTime}:00`
                ).toISOString(),
                duration: convertNumberToTimeSpan(data.duration * 60),
                blockSubmissions: convertNumberToTimeSpan(
                    data.stopAnswering * 60
                ),
                stopRanking: convertNumberToTimeSpan(data.stopScoreboard * 60),
                submissionPenalty: convertNumberToTimeSpan(data.penalty * 60),
                maxSubmissionSize: data.maxFileSize,
                maxExercises: data.exerciseCount,
                exerciseIds: selectedExercises,
                startInscriptions: null,
                endInscriptions: null,
            };

            //const res = await CompetitionService.createCompetition(payload);

            //if(res.status == 201) {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            enqueueSnackbar("Maratona criada com sucesso!", {
                variant: "success",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            //}
        } catch (error) {
            errored = true;
            enqueueSnackbar(
                "Ocorreu um erro ao criar a maratona. Tente novamente.",
                {
                    variant: "error",
                    autoHideDuration: 2500,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                }
            );
        } finally {
            setIsSubmitting(false);
            if (!errored) {
                setTimeout(() => {
                    toggleMenu("Main");
                }, 1500);
            }
        }
    };

    return {
        control,
        formValues,
        exercises,
        handleSubmit,
        onSubmit,
        errors,
        exerciseCount: formValues.exerciseCount,
        selectedExercises,
        toggleExercise,
        isExerciseSelectionValid,
        isFormValid,
        isSubmitting,
        trigger,
        currentPage,
        isLoading,
        maxPages,
        pageSize,
        search,
        setSearch,
    };
};

export default useCreateCompetition;
