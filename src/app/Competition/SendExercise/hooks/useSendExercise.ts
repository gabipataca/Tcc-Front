import { useState, useCallback } from "react";

const exercises = [..."ABCDEFGHIJ"];
const languages = ["C", "C++", "C#", "Java", "PHP", "Python"];

const useSendExercise = () => {
    const [selectedExercise, setSelectedExercise] = useState<string>(
        exercises[0]
    );
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        languages[0]
    );
    const [attachedFileName, setAttachedFileName] = useState<string | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleExerciseChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedExercise(event.target.value);
        },
        []
    );

    const handleLanguageChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedLanguage(event.target.value);
        },
        []
    );

    const handleAttachFile = useCallback(() => {
        const simulatedFileName = "codigo_submissao.cpp";
        setAttachedFileName(simulatedFileName);
        alert(`Arquivo "${simulatedFileName}" anexado com sucesso!`);
    }, []);

    const handleSubmitAnalysis = useCallback(async () => {
        if (!attachedFileName) {
            alert("Por favor, anexe um arquivo antes de enviar.");
            return;
        }

        setIsSubmitting(true);
        console.log("Submetendo análise:", {
            selectedExercise,
            selectedLanguage,
            attachedFileName,
        });

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Análise enviada com sucesso!");
            setAttachedFileName(null);
        } catch (error) {
            console.error("Erro ao submeter análise:", error);
            alert("Ocorreu um erro ao enviar a análise. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    }, [selectedExercise, selectedLanguage, attachedFileName]);

    return {
        selectedExercise,
        handleExerciseChange,
        selectedLanguage,
        handleLanguageChange,
        attachedFileName,
        handleAttachFile,
        handleSubmitAnalysis,
        isSubmitting,
        exercises,
        languages,
    };
};

export default useSendExercise;
