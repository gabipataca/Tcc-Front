import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useLoadExercises from "../../../../Shared/ExerciseManagement/hooks/useLoadExercises";
import CompetitionService from "@/services/CompetitionService";
import {
    convertNumberToTimeSpan,
    convertTimeSpanToNumber,
    parseDate,
} from "@/libs/utils";
import {
    CreateCompetitionRequest,
    UpdateCompetitionRequest,
} from "@/types/Competition/Requests";
import { useSnackbar } from "notistack";
import useProfileMenu from "@/components/pages/profile/hooks/useProfileMenu";
import { useCompetition } from "@/contexts/CompetitionContext";
import { Competition } from "@/types/Competition";

interface CompetitionFormInputs {
    description: string;
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
        description: z
            .string()
            .min(3, {
                message:
                    "A descrição da maratona deve ter no mínimo 3 caracteres.",
            })
            .max(1200, {
                message:
                    "A descrição da maratona deve ter no máximo 1200 caracteres.",
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
    const [search, setSearch] = useState("");
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);

    const {
        addCompetitionModel,
        competitionModels,
        loadCompetitions,
        isLoading: isLoadingCompetitions,
    } = useCompetition();

    const { enqueueSnackbar } = useSnackbar();

    const { toggleMenu } = useProfileMenu();

    useEffect(() => {
        loadCompetitions();
    }, [loadCompetitions]);

    const {
        exercises,
        currentPage,
        addExercise,
        controllerSignal,
        exerciseTypeFilter,
        setControllerSignal,
        nextPage,
        prevPage,
        totalPages: maxPages,
        toggleExerciseTypeFilter,
        loadExercises,
        loadingExercises,
    } = useLoadExercises();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        trigger,
        watch,
        setValue,
    } = useForm<CompetitionFormInputs>({
        defaultValues: {
            description: "",
            startDate: "",
            startTime: "",
            duration: 90,
            stopAnswering: 85,
            stopScoreboard: 80,
            penalty: 30,
            maxFileSize: 20,
            exerciseCount: 2,
        },
        disabled: activeCompetition == null,
        mode: activeCompetition == null ? undefined : "onChange",
        
        resolver: zodResolver(schema),
    });

    const formValues = watch();

    const selectCompetition = useCallback((competitionId: number) => {
        const competition = competitionModels.find(c => c.id === competitionId) || null;

        if(competition == null) {
            return;
        }

        setValue("description", competition.description);
        setValue("duration", competition.duration ?? 90);
        setValue("maxFileSize", competition.maxSubmissionSize ?? 20);
        setValue("exerciseCount", competition.maxExercises ?? 4);
        setValue("penalty", competition.submissionPenalty ?? 30);
        setValue("startDate", competition.startTime.toISOString().split("T")[0]);
        setValue("startTime", competition.startTime.toISOString().split("T")[1].substring(0, 5));
        setValue("stopAnswering", 85);
        setValue("stopScoreboard", 80);
        trigger();

        setActiveCompetition({...competition});
    }, [competitionModels, setValue, trigger]);

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

    const onSubmit: SubmitHandler<CompetitionFormInputs> = useCallback(
        async (data) => {
            if(activeCompetition == null) {
                return;
            }

            setIsSubmitting(true);
            let errored = false;

            try {
                const payload: UpdateCompetitionRequest = {
                    name: activeCompetition.name,
                    description: data.description,
                    startTime: new Date(
                        `${data.startDate}T${data.startTime}:00`
                    ).toISOString(),
                    duration: convertNumberToTimeSpan(data.duration * 60),
                    blockSubmissions: convertNumberToTimeSpan(
                        data.stopAnswering * 60
                    ),
                    stopRanking: convertNumberToTimeSpan(
                        data.stopScoreboard * 60
                    ),
                    submissionPenalty: convertNumberToTimeSpan(
                        data.penalty * 60
                    ),
                    maxSubmissionSize: data.maxFileSize,
                    maxExercises: data.exerciseCount,
                    exerciseIds: selectedExercises,
                    startInscriptions: null,
                    endInscriptions: null,
                };

                const res = await CompetitionService.updateCompetition(payload);

                if (res.status == 200) {
                    addCompetitionModel({
                        id: res.data!.id,
                        blockSubmissions: res.data?.blockSubmissions
                            ? new Date(res.data!.blockSubmissions)
                            : null,
                        duration: res.data?.duration
                            ? new Date(
                                  convertTimeSpanToNumber(res.data!.duration)
                              )
                            : null,
                        endInscriptions: res.data?.endInscriptions
                            ? new Date(res.data!.endInscriptions)
                            : null,
                        endTime: res.data?.endTime
                            ? new Date(res.data!.endTime)
                            : null,
                        maxExercises: res.data!.maxExercises,
                        maxSubmissionSize: res.data!.maxSubmissionSize,
                        name: res.data!.name,
                        description: res.data?.description || "",
                        startInscriptions: res.data?.startInscriptions
                            ? new Date(
                                  convertTimeSpanToNumber(
                                      res.data!.startInscriptions
                                  )
                              )
                            : null,
                        startTime: new Date(res.data!.startTime),
                        status: res.data!.status,
                        stopRanking: res.data?.stopRanking
                            ? new Date(res.data!.stopRanking)
                            : null,
                        submissionPenalty: res.data?.submissionPenalty
                            ? convertTimeSpanToNumber(
                                  res.data!.submissionPenalty
                              )
                            : null,
                    });
                    enqueueSnackbar("Maratona criada com sucesso!", {
                        variant: "success",
                        autoHideDuration: 2500,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    });
                }
            } catch (error) {
                errored = true;
                enqueueSnackbar(
                    "Ocorreu um erro ao criar a maratona. Tente novamente.",
                    {
                        variant: "error",
                        autoHideDuration: 2500,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
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
        },
        [addCompetitionModel, enqueueSnackbar, selectedExercises, toggleMenu]
    );

    useEffect(() => {
        if (controllerSignal) {
            controllerSignal.abort();
            setControllerSignal(null);
        }

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        const controller = new AbortController();
        setControllerSignal(controller);

        searchTimeoutRef.current = setTimeout(() => {
            loadExercises(search, exerciseTypeFilter);
        }, 800);

        return () => {
            if (controllerSignal) {
                controllerSignal.abort();
                setControllerSignal(null);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

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
        isLoading: loadingExercises,
        maxPages,
        pageSize: 10,
        search,
        setSearch,
        setValue,
        competitionModels,
        selectCompetition,
        activeCompetition,
    };
};

export default useCreateCompetition;
