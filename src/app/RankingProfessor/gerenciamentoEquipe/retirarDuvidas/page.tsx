'use client';

import React, { useState, useEffect } from 'react';
import NavRanking from '@/components/_ui/NavbarRankingAdm';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface Question {
  id: number;
  title: string;
  question: string;
  askedBy: string;
  askedAt: string;
  status: 'pending' | 'answered';
  answer?: string;
  answeredAt?: string;
  language?: string;
}

export const allMockQuestions: Question[] = [
  {
    id: 1,
    title: "Problema ao compilar código",
    question: "Estou tendo um erro de sintaxe estranho ao compilar meu código C++ para o desafio de hoje. Poderiam me ajudar a depurar? O erro é 'undefined reference to main'.",
    askedBy: "Time Alfa",
    askedAt: "2025-06-20 16:30:00",
    status: "pending",
    language: "C++",
  },
  {
    id: 2,
    title: "Dúvida sobre complexidade de algoritmo",
    question: "Qual a complexidade de tempo do algoritmo de ordenação que usamos na aula 3? Não consegui entender completamente.",
    askedBy: "Time Beta",
    askedAt: "2025-06-19 10:15:00",
    status: "pending",
    language: "Python",
  },
  {
    id: 3,
    title: "Erro na submissão de arquivo",
    question: "Não consigo fazer upload do meu arquivo de solução. O sistema está dando um erro 500.",
    askedBy: "Time Gama",
    askedAt: "2025-06-18 14:00:00",
    status: "pending",
    language: "Java",
  },
  {
    id: 4,
    title: "Como funciona a penalidade?",
    question: "Gostaria de entender melhor como as penalidades são calculadas na maratona.",
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
    question: "Meu programa está lendo a entrada incorretamente, mesmo com `cin` e `getline`. Onde posso estar errando?",
    askedBy: "Time Zeta",
    askedAt: "2025-06-15 09:00:00",
    status: "pending",
    language: "C++",
  },
  {
    id: 7,
    title: "Tempo limite excedido em teste",
    question: "Minha solução passa nos testes de exemplo, mas recebe 'Time Limit Exceeded' nos testes ocultos. Alguma dica para otimização?",
    askedBy: "Time Eta",
    askedAt: "2025-06-14 14:45:00",
    status: "pending",
    language: "Java",
  },
  {
    id: 8,
    title: "Dúvida sobre estrutura de dados",
    question: "Em que situação seria mais vantajoso usar uma `std::map` ao invés de uma `std::unordered_map`?",
    askedBy: "Time Theta",
    askedAt: "2025-06-13 11:00:00",
    status: "pending",
    language: "C++",
  },
  {
    id: 9,
    title: "Como depurar com GDB?",
    question: "Nunca usei o GDB antes. Poderiam dar um mini-tutorial de como começar a depurar meu código com ele?",
    askedBy: "Time Iota",
    askedAt: "2025-06-12 17:00:00",
    status: "pending",
    language: "C",
  },
  {
    id: 10,
    title: "Questão de lógica booleana",
    question: "Existe uma maneira mais simples de expressar a condição `(!A || B) && (A || !B)` em lógica booleana?",
    askedBy: "Time Kappa",
    askedAt: "2025-06-11 10:30:00",
    status: "pending",
    language: "Geral",
  },
  {
    id: 11,
    title: "Qual o ambiente de desenvolvimento?",
    question: "Será que posso usar minha IDE favorita (VS Code) ou preciso usar alguma ferramenta específica para a maratona?",
    askedBy: "Time Lambda",
    askedAt: "2025-06-10 15:15:00",
    status: "pending",
    language: "Geral",
  },
  {
    id: 12,
    title: "Erro de arredondamento com floats",
    question: "Minha solução está falhando em testes que envolvem números decimais, provavelmente por erro de precisão. O que devo fazer?",
    askedBy: "Time Mu",
    askedAt: "2025-06-09 09:30:00",
    status: "pending",
    language: "C#",
  },
  {
    id: 13,
    title: "Uso de threads em C++",
    question: "É permitido usar `std::thread` para soluções que exigem concorrência? Se sim, há alguma restrição?",
    askedBy: "Time Nu",
    askedAt: "2025-06-08 12:00:00",
    status: "pending",
    language: "C++",
  },
  {
    id: 14,
    title: "Problema com strings grandes",
    question: "Minha função de manipulação de strings está muito lenta para entradas grandes. Qual a melhor abordagem para otimizar?",
    askedBy: "Time Xi",
    askedAt: "2025-06-07 18:00:00",
    status: "pending",
    language: "Python",
  },
  {
    id: 15,
    title: "Questão sobre padrões de projeto",
    question: "No contexto de algoritmos de grafos, qual padrão de projeto é mais comumente aplicado e por quê?",
    askedBy: "Time Omicron",
    askedAt: "2025-06-06 10:00:00",
    status: "pending",
    language: "Geral",
  },
];

const getQuestions = (): Question[] => {
  return [...allMockQuestions];
};

const getQuestionById = (id: number): Question | undefined => {
  return allMockQuestions.find(q => q.id === id);
};

const updateQuestionMock = (id: number, newAnswer: string): Question | undefined => {
  const questionIndex = allMockQuestions.findIndex(q => q.id === id);
  if (questionIndex > -1) {
    allMockQuestions[questionIndex] = {
      ...allMockQuestions[questionIndex],
      status: 'answered',
      answer: newAnswer,
      answeredAt: new Date().toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    return allMockQuestions[questionIndex];
  }
  return undefined;
};


function QuestionRow(props: { initialQuestion: Question; onQuestionUpdate: (updatedQuestion: Question) => void }) {
  const { initialQuestion, onQuestionUpdate } = props;
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(initialQuestion);
  const [answerText, setAnswerText] = useState(initialQuestion.answer || '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setQuestion(initialQuestion);
    setAnswerText(initialQuestion.answer || '');
  }, [initialQuestion]);

  const handleSubmitAnswer = () => {
    if (!answerText.trim()) {
      alert('A resposta não pode estar vazia.');
      return;
    }

    setSubmitting(true);

    const updatedQuestion = updateQuestionMock(question.id, answerText);

    setTimeout(() => {
      if (updatedQuestion) {
        setQuestion(updatedQuestion);
        onQuestionUpdate(updatedQuestion);
        alert('Resposta enviada com sucesso!');
        setOpen(false);
      } else {
        alert('Erro ao enviar a resposta.');
      }
      setSubmitting(false);
    }, 1000);
  };

  const isAnswered = question.status === 'answered';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ textAlign: 'center' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: '18px', textAlign: 'center' }}>
          {question.id}
        </TableCell>
        <TableCell sx={{ fontSize: '18px', textAlign: 'center' }}>
          {question.title}
        </TableCell>
        <TableCell sx={{ fontSize: '18px', textAlign: 'center' }}>
          {question.askedBy}
        </TableCell>
        <TableCell sx={{ fontSize: '18px', textAlign: 'center' }}>
          {question.language || 'N/A'}
        </TableCell>
        <TableCell sx={{ fontSize: '18px', textAlign: 'center' }}>
          {new Date(question.askedAt).toLocaleString('pt-BR')}
        </TableCell>
        <TableCell sx={{ fontSize: '18px', textAlign: 'center' }}>
          <Box
            component="span"
            sx={{
              p: 0.5,
              borderRadius: 1,
              fontWeight: 'bold',
              backgroundColor:
                question.status === 'pending' ? '#ffeb3b' : '#c8e6c9',
              color:
                question.status === 'pending' ? '#333' : '#2e7d32',
            }}
          >
            {question.status === 'pending' ? 'Pendente' : 'Respondida'}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, p: 2 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#4F85A6', fontWeight: 'bold' }}>
                Detalhes da Dúvida:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, border: '1px solid #ccc', p: 2, borderRadius: 1, backgroundColor: '#f9f9f9' }}>
                {question.question}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1, color: '#4F85A6', fontWeight: 'bold' }}>
                Sua Resposta:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder={isAnswered ? "Esta dúvida já foi respondida." : "Digite sua resposta aqui..."}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                disabled={isAnswered || submitting}
                sx={{ mb: 2 }}
              />

              {isAnswered && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Respondida em {question.answeredAt || 'N/A'}.
                </Typography>
              )}
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': {
                    bgcolor: '#43A047',
                  },
                  width: '25%',
                  display: 'block',
                  margin: '0 auto',
                }}
                onClick={handleSubmitAnswer}
                disabled={isAnswered || submitting || !answerText.trim()}
              >
                {submitting ? <CircularProgress size={24} color="inherit" /> : 'Enviar Resposta'}
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const AdminQuestionsListPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchedQuestions = getQuestions();
    const sortedQuestions = [...fetchedQuestions].sort((a, b) => {
      return new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime();
    });
    setQuestions(sortedQuestions);
  }, []);

  const handleQuestionUpdate = (updatedQuestion: Question) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  return (
    <NavRanking>
      <Box
        sx={{
          bgcolor: '#f0f0f0',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 3, textAlign: 'center', color: '#4F85A6', fontWeight: 'bold', fontSize: '32px' }}
        >
          Caixa de Entrada de Dúvidas
        </Typography>

        <Paper sx={{ width: '100%', maxWidth: '1500px' }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
            <Table stickyHeader aria-label="collapsible questions table" sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#4F85A6' }} />
                  <TableCell style={{ width: '4%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '20px', textAlign: 'center' }}>ID</TableCell>
                  <TableCell style={{ width: '32%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '20px', textAlign: 'center' }}>Título</TableCell>
                  <TableCell style={{ width: '16%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '20px', textAlign: 'center' }}>Time</TableCell>
                  <TableCell style={{ width: '12%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '20px', textAlign: 'center' }}>Linguagem</TableCell>
                  <TableCell style={{ width: '22%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '20px', textAlign: 'center' }}>Data/Hora</TableCell>
                  <TableCell style={{ width: '14%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '20px', textAlign: 'center' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ fontSize: '18px', py: 3 }}>
                      Nenhuma dúvida encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  questions.map((question) => (
                    <QuestionRow
                      key={question.id}
                      initialQuestion={question}
                      onQuestionUpdate={handleQuestionUpdate}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </NavRanking>
  );
};

export default AdminQuestionsListPage;