import { createContext, FC, ReactNode, useCallback, useState } from "react";
import { QuestionsContextProps } from "./types";
import { Question } from "../../types";

export const QuestionsContext = createContext<QuestionsContextProps | null>(
    null
);

export const QuestionsContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    const getQuestionById = useCallback(
        (id: number): Question | undefined => {
            return questions.find((q) => q.id === id);
        },
        [questions]
    );

    const updateQuestion = useCallback(
        (id: number, newAnswer: string): Question | undefined => {
            const questionIndex = questions.findIndex((q) => q.id === id);
            if (questionIndex > -1) {
                questions[questionIndex] = {
                    ...questions[questionIndex],
                    status: "answered",
                    answer: newAnswer,
                    answeredAt: new Date().toLocaleString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                };
                return questions[questionIndex];
            }
            return undefined;
        },
        [questions]
    );

    const insertQuestion = useCallback((question: Question) => {
        //TODO Validation
        if (question == null) {
            return undefined;
        }

        setQuestions((prev) => [...prev, question]);

        return question;
    }, []);

    const deleteQuestion = useCallback((id: number) => {
        //TODO
    }, []);

    return (
        <QuestionsContext.Provider
            value={{
                questions,
                getQuestionById,
                updateQuestion,
                insertQuestion,
                deleteQuestion,
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
};
