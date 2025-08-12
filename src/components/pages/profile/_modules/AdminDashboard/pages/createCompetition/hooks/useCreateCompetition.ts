import { useState, useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

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

const schema = z.object({
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
        message: "O tempo para parar respostas deve ser de no mínimo 1 minuto.",
    }),
    stopScoreboard: z.coerce.number().min(1, {
        message: "O tempo para parar o placar deve ser de no mínimo 1 minuto.",
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
});

const exercisesMock = [
    "Exercício 1 - Título exemplo",
    "Exercício 2 - Título exemplo",
    "Exercício 3 - Título exemplo",
    "Exercício 4 - Outro exemplo",
    "Exercício 5 - Mais um título",
    "Exercício 6 - Desafio de lógica",
    "Exercício 7 - Algoritmo complexo",
    "Exercício 8 - Estruturas de dados",
    "Exercício 9 - Programação dinâmica",
    "Exercício 10 - Grafos",
    "Exercício 11 - Backtracking",
    "Exercício 12 - Geometria computacional",
    "Exercício 13 - Teoria dos números",
    "Exercício 14 - Strings e regex",
    "Exercício 15 - Programação orientada a objetos",
];

const useCreateCompetition = () => {
    const [exerciseTitleFilter, setExerciseTitleFilter] = useState("");
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            maxFileSize: 100,
            exerciseCount: 2,
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const watchedExerciseCount = watch("exerciseCount");

    const toggleExercise = useCallback(
        (exercise: string) => {
            setSelectedExercises((prev) => {
                const newSelection = prev.includes(exercise)
                    ? prev.filter((e) => e !== exercise)
                    : [...prev, exercise];

                if (newSelection.length > watchedExerciseCount) {
                    return newSelection.slice(0, watchedExerciseCount);
                }
                return newSelection;
            });
        },
        [watchedExerciseCount]
    );

    const filteredExercises = useMemo(() => {
        return exercisesMock
            .filter((ex) =>
                ex.toLowerCase().includes(exerciseTitleFilter.toLowerCase())
            )
            .slice(0, watchedExerciseCount);
    }, [exerciseTitleFilter, watchedExerciseCount]);

    const isExerciseSelectionValid = useMemo(() => {
        return selectedExercises.length === watchedExerciseCount;
    }, [selectedExercises, watchedExerciseCount]);

    const isFormValid = useMemo(() => {
        return isValid && isExerciseSelectionValid;
    }, [isValid, isExerciseSelectionValid]);

    const onSubmit: SubmitHandler<CompetitionFormInputs> = async (data) => {
        setIsSubmitting(true);
        console.log("Configurações da Maratona:", {
            ...data,
            selectedExercises,
        });

        try {
            alert("Maratona configurada (verifique o console para os dados)!");
        } catch (error) {
            console.error("Erro ao criar competição:", error);
            alert("Ocorreu um erro ao criar a maratona. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        control,
        handleSubmit,
        onSubmit,
        errors,
        exerciseCount: watchedExerciseCount,
        setExerciseTitleFilter,
        exerciseTitleFilter,
        selectedExercises,
        toggleExercise,
        filteredExercises,
        isExerciseSelectionValid,
        isFormValid,
        isSubmitting,
        trigger,
    };
};

export default useCreateCompetition;
