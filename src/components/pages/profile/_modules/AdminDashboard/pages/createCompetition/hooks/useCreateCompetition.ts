"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useLoadExercises from "@/components/pages/profile/_modules/Shared/ExerciseManagement/hooks/useLoadExercises";
import { convertNumberToTimeSpan, parseDate } from "@/libs/utils";
import type { UpdateCompetitionRequest } from "@/types/Competition/Requests";
import { useSnackbar } from "notistack";
import useProfileMenu from "@/components/pages/profile/hooks/useProfileMenu";
import { useCompetition } from "@/contexts/CompetitionContext";
import type { Competition } from "@/types/Competition";

interface CompetitionFormInputs {
    competitionName: string;
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
        competitionName: z
            .string()
            .min(1, { message: "O nome da maratona é obrigatório." }),
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
        startDate: z.string(),
        startTime: z.string(),
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
            const today = new Date();
            today.setHours(0, 0, 0, 0);
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
                        message: "A data de início não pode ser no passado.",
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
    const [activeCompetition, setActiveCompetition] =
        useState<Competition | null>(null);
    const [showNoModelsModal, setShowNoModelsModal] = useState(false);

    const {
        addCompetitionModel,
        updateTemplateCompetition,
        competitionModels,
        loadTemplateCompetitions,
        isTemplateLoading,
    } = useCompetition();

    const { enqueueSnackbar } = useSnackbar();
    const { toggleMenu } = useProfileMenu();

    useEffect(() => {
        loadTemplateCompetitions();
    }, []);

    useEffect(() => {
        if (!isTemplateLoading && competitionModels.length === 0) {
            setShowNoModelsModal(true);
        }
    }, [isTemplateLoading, competitionModels.length]);

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
        resetPagination,
    } = useLoadExercises();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        trigger,
        watch,
        setValue,
        clearErrors,
    } = useForm<CompetitionFormInputs>({
        defaultValues: {
            competitionName: "",
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
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(schema),
    });

    const formValues = watch();

    const selectCompetition = useCallback(
        (competitionId: number) => {
            const competition =
                competitionModels.find((c) => c.id === competitionId) || null;

            if (competition == null) {
                return;
            }

            setValue("competitionName", competition.name, {
                shouldValidate: false,
                shouldDirty: false,
            });
            setValue("description", competition.description, {
                shouldValidate: false,
                shouldDirty: false,
            });
            setValue("duration", competition.duration ?? 90, {
                shouldValidate: false,
                shouldDirty: false,
            });
            setValue("maxFileSize", competition.maxSubmissionSize ?? 20, {
                shouldValidate: false,
                shouldDirty: false,
            });
            setValue("exerciseCount", competition.maxExercises ?? 4, {
                shouldValidate: false,
                shouldDirty: false,
            });
            setValue("penalty", competition.submissionPenalty ?? 30, {
                shouldValidate: false,
                shouldDirty: false,
            });
            
            // Extrair data e hora do objeto Date (já convertido em loadTemplateCompetitions)
            // Obter componentes da data local sem conversão UTC
            const year = competition.startTime.getFullYear();
            const month = String(competition.startTime.getMonth() + 1).padStart(2, '0');
            const day = String(competition.startTime.getDate()).padStart(2, '0');
            const hours = String(competition.startTime.getHours()).padStart(2, '0');
            const minutes = String(competition.startTime.getMinutes()).padStart(2, '0');
            
            setValue(
                "startDate",
                `${year}-${month}-${day}`, // "2025-11-26"
                {
                    shouldValidate: false,
                    shouldDirty: false,
                }
            );
            setValue(
                "startTime",
                `${hours}:${minutes}`, // "14:00"
                {
                    shouldValidate: false,
                    shouldDirty: false,
                }
            );
            setValue("stopAnswering", 85, {
                shouldValidate: false,
                shouldDirty: false,
            });
            setValue("stopScoreboard", 80, {
                shouldValidate: false,
                shouldDirty: false,
            });

            clearErrors();
            setActiveCompetition({ ...competition });
        },
        [competitionModels, setValue, clearErrors]
    );

    const handleNoModelsModalConfirm = useCallback(() => {
        setShowNoModelsModal(false);
        toggleMenu("CreateSubscription");
    }, [toggleMenu]);

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
            if (activeCompetition == null) {
                return;
            }

            setIsSubmitting(true);
            let errored = false;

            try {
                const payload: UpdateCompetitionRequest = {
                    id: activeCompetition.id,
                    name: activeCompetition.name,
                    description: data.description,
                    // Manter horário exato sem conversão de timezone
                    startTime: `${data.startDate}T${data.startTime.split(".")[0]}:00.000Z`,
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
                    startInscriptions:
                        activeCompetition.startInscriptions!.toISOString(),
                    endInscriptions:
                        activeCompetition.endInscriptions!.toISOString(),
                    maxMembers: activeCompetition.maxMembers!,
                };

                console.group("🔍 DEBUG - Criar Competição");
                console.log("📅 Dados do Formulário:");
                console.log(`   Data: ${data.startDate}`);
                console.log(`   Hora: ${data.startTime}`);
                console.log("\n📤 Enviando para Backend:");
                console.log(`   startTime: ${payload.startTime}`);
                console.log("\n⚠️  IMPORTANTE: Horário mantido sem conversão de timezone");
                console.groupEnd();

                await updateTemplateCompetition(payload);

                enqueueSnackbar({
                    message: "Competição criada com sucesso!",
                    variant: "success",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    autoHideDuration: 3000,
                });
            } catch (error) {
                errored = true;
            } finally {
                setTimeout(() => {
                    setIsSubmitting(false);
                }, 500);
                if (!errored) {
                    setTimeout(() => {
                        toggleMenu("Main");
                    }, 1500);
                }
            }
        },
        [
            activeCompetition,
            enqueueSnackbar,
            selectedExercises,
            toggleMenu,
            updateTemplateCompetition,
        ]
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
        isLoadingExercises: loadingExercises,
        isTemplateLoading,
        maxPages,
        nextPage,
        prevPage,
        pageSize: 4,
        search,
        setSearch,
        setValue,
        competitionModels,
        selectCompetition,
        activeCompetition,
        resetPagination,
        showNoModelsModal,
        handleNoModelsModalConfirm,
    };
};

export default useCreateCompetition;
