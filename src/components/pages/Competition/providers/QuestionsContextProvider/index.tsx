"use client";

import { Question } from "@pages/Competition/pages/Questions/types";
import { FC, useCallback, useEffect, useState } from "react";
import { QuestionsContext } from "../../contexts/QuestionsContext";
import { QuestionsContextProviderProps } from "./types";

const allMockQuestions: Question[] = [
    {
        id: 1,
        title: "Problema ao compilar código",
        question:
            "Estou tendo um erro de sintaxe estranho ao compilar meu código C++ para o desafio de hoje. Poderiam me ajudar a depurar? O erro é 'undefined reference to main'.",
        askedBy: "Time Alfa",
        askedAt: "2025-06-20 16:30:00",
        status: "pending",
        language: "C++",
    },
    {
        id: 2,
        title: "Dúvida sobre complexidade de algoritmo",
        question:
            "Qual a complexidade de tempo do algoritmo de ordenação que usamos na aula 3? Não consegui entender completamente.",
        askedBy: "Time Beta",
        askedAt: "2025-06-19 10:15:00",
        status: "pending",
        language: "Python",
    },
    {
        id: 3,
        title: "Erro na submissão de arquivo",
        question:
            "Não consigo fazer upload do meu arquivo de solução. O sistema está dando um erro 500.",
        askedBy: "Time Gama",
        askedAt: "2025-06-18 14:00:00",
        status: "pending",
        language: "Java",
    },
    {
        id: 4,
        title: "Como funciona a penalidade?",
        question:
            "Gostaria de entender melhor como as penalidades são calculadas na maratona.",
        askedBy: "Time Delta",
        askedAt: "2025-06-17 09:45:00",
        status: "answered",
        answer: "A penalidade é de X minutos por submissão errada, somando ao tempo total.",
        answeredAt: "2025-06-17 10:00:00",
        language: "Geral",
    },
    {
        id: 5,
        title: "Qual a versão do Python?",
        question: "Que versão do Python será usada para os exercícios?",
        askedBy: "Time Épsilon",
        askedAt: "2025-06-16 11:30:00",
        status: "pending",
        language: "Python",
    },
    {
        id: 6,
        title: "Problema com entrada de dados",
        question:
            "Meu programa está lendo a entrada incorretamente, mesmo com `cin` e `getline`. Onde posso estar errando?",
        askedBy: "Time Zeta",
        askedAt: "2025-06-15 09:00:00",
        status: "pending",
        language: "C++",
    },
    {
        id: 7,
        title: "Tempo limite excedido em teste",
        question:
            "Minha solução passa nos testes de exemplo, mas recebe 'Time Limit Exceeded' nos testes ocultos. Alguma dica para otimização?",
        askedBy: "Time Eta",
        askedAt: "2025-06-14 14:45:00",
        status: "pending",
        language: "Java",
    },
    {
        id: 8,
        title: "Dúvida sobre estrutura de dados",
        question:
            "Em que situação seria mais vantajoso usar uma `std::map` ao invés de uma `std::unordered_map`?",
        askedBy: "Time Theta",
        askedAt: "2025-06-13 11:00:00",
        status: "pending",
        language: "C++",
    },
    {
        id: 9,
        title: "Como depurar com GDB?",
        question:
            "Nunca usei o GDB antes. Poderiam dar um mini-tutorial de como começar a depurar meu código com ele?",
        askedBy: "Time Iota",
        askedAt: "2025-06-12 17:00:00",
        status: "pending",
        language: "C",
    },
    {
        id: 10,
        title: "Questão de lógica booleana",
        question:
            "Existe uma maneira mais simples de expressar a condição `(!A || B) && (A || !B)` em lógica booleana?",
        askedBy: "Time Kappa",
        askedAt: "2025-06-11 10:30:00",
        status: "pending",
        language: "Geral",
    },
    {
        id: 11,
        title: "Qual o ambiente de desenvolvimento?",
        question:
            "Será que posso usar minha IDE favorita (VS Code) ou preciso usar alguma ferramenta específica para a maratona?",
        askedBy: "Time Lambda",
        askedAt: "2025-06-10 15:15:00",
        status: "pending",
        language: "Geral",
    },
    {
        id: 12,
        title: "Erro de arredondamento com floats",
        question:
            "Minha solução está falhando em testes que envolvem números decimais, provavelmente por erro de precisão. O que devo fazer?",
        askedBy: "Time Mu",
        askedAt: "2025-06-09 09:30:00",
        status: "pending",
        language: "C#",
    },
    {
        id: 13,
        title: "Uso de threads em C++",
        question:
            "É permitido usar `std::thread` para soluções que exigem concorrência? Se sim, há alguma restrição?",
        askedBy: "Time Nu",
        askedAt: "2025-06-08 12:00:00",
        status: "pending",
        language: "C++",
    },
    {
        id: 14,
        title: "Problema com strings grandes",
        question:
            "Minha função de manipulação de strings está muito lenta para entradas grandes. Qual a melhor abordagem para otimizar?",
        askedBy: "Time Xi",
        askedAt: "2025-06-07 18:00:00",
        status: "pending",
        language: "Python",
    },
    {
        id: 15,
        title: "Questão sobre padrões de projeto",
        question:
            "No contexto de algoritmos de grafos, qual padrão de projeto é mais comumente aplicado e por quê?",
        askedBy: "Time Omicron",
        askedAt: "2025-06-06 10:00:00",
        status: "pending",
        language: "Geral",
    },
    {
        id: 16,
        title: "Problema ao compilar código",
        question:
            "Estou tendo um erro de sintaxe estranho ao compilar meu código C++ para o desafio de hoje. Poderiam me ajudar a depurar? O erro é 'undefined reference to main'.",
        askedBy: "Time Alfa",
        askedAt: "2025-06-20 16:30:00",
        status: "answered",
        answer: "Verifique se a função `main` está corretamente definida com a assinatura `int main() { ... }` ou `int main(int argc, char* argv[]) { ... }`. O erro 'undefined reference to main' geralmente indica que o linker não conseguiu encontrar o ponto de entrada principal do seu programa.",
        answeredAt: "2025-06-20 17:00:00",
        language: "C++",
    },
    {
        id: 17,
        title: "Dúvida sobre complexidade de algoritmo",
        question:
            "Qual a complexidade de tempo do algoritmo de ordenação que usamos na aula 3? Não consegui entender completamente.",
        askedBy: "Time Beta",
        askedAt: "2025-06-19 10:15:00",
        status: "answered",
        answer: "A complexidade de tempo do algoritmo de ordenação que usamos na aula 3 é O(n log n), pois utilizamos o Merge Sort, que é eficiente para grandes conjuntos de dados. Para mais detalhes, revise a seção sobre 'Divisão e Conquista' nos materiais da aula.",
        answeredAt: "2025-06-19 11:00:00",
        language: "Python",
    },
    {
        id: 18,
        title: "Erro na submissão de arquivo",
        question:
            "Não consigo fazer upload do meu arquivo de solução. O sistema está dando um erro 500.",
        askedBy: "Time Gama",
        askedAt: "2025-06-18 14:00:00",
        status: "pending",
        language: "Java",
    },
];

const getQuestions = (): Question[] => {
    return [...allMockQuestions];
};

const QuestionsContextProvider: FC<QuestionsContextProviderProps> = ({
    children,
}) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    const loadQuestions = useCallback(() => {
        setQuestions(
            getQuestions().sort((a, b) => {
                return (
                    new Date(b.askedAt).getTime() -
                    new Date(a.askedAt).getTime()
                );
            })
        );
    }, []);

    const getQuestionById = useCallback(
        (id: number): Question | undefined => {
            return questions.find((q) => q.id === id);
        },
        [questions]
    );

    const editQuestion = (updatedQuestion: Question) => {
        //TODO Requisição para UPDATE

        
        setQuestions(prevQuestions =>
            prevQuestions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
    };

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

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    return (
        <QuestionsContext.Provider
            value={{
                questions,
                getQuestionById,
                updateQuestion,
                insertQuestion,
                deleteQuestion,
                editQuestion,
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
};

export default QuestionsContextProvider;
