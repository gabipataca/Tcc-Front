'use client';

import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaPaperPlane, FaQuestionCircle, FaUser } from "react-icons/fa";
import {
  Box,TextField,Autocomplete, Button as MuiButton,Typography,Paper, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,IconButton,Collapse,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import TitleIcon from '@mui/icons-material/Title';

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
}

const InputField = ({ label, placeholder, icon }: InputFieldProps) => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      variant="outlined"
      slotProps={{ inputLabel: { shrink: true } }}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : null,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          '&.Mui-focused fieldset': {
            borderColor: '#4F85A6',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#4F85A6',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#4F85A6',
        },
      }}
    />
  </Box>
);

const TextareaField = () => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      multiline
      rows={5}
      label="Escreva suas dúvidas:"
      placeholder="Digite aqui sua dúvida sobre o exercício..."
      variant="outlined"
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          '&.Mui-focused fieldset': {
            borderColor: '#4F85A6',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#4F85A6',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#4F85A6',
        },
      }}
    />
  </Box>
);

interface MuiSelectFieldProps {
  label: string;
  options: string[];
  placeholder?: string;
  icon?: React.ReactNode;
}

const MuiSelectField = ({ label, options, placeholder, icon }: MuiSelectFieldProps) => {
  return (
    <Box sx={{ mb: 4, width: '100%' }}>
      <Autocomplete
        disablePortal
        id={`autocomplete-${label.replace(/\s/g, '-')}`}
        options={options}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder || `Selecione ${label.toLowerCase()}`}
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            InputProps={{
              ...params.InputProps,
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : null,
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&.Mui-focused fieldset': {
                        borderColor: '#4F85A6',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#4F85A6',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#4F85A6',
                },
            }}
          />
        )}
      />
    </Box>
  );
};

const AskQuestionsContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 4,
        px: 2,
        width: '100%',
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: 4,
          width: '100%',
          maxWidth: '800px',
          textAlign: 'center',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            color: '#4F85A6',
            mb: 6,
            letterSpacing: '0.05em',
          }}
        >
          Retire suas dúvidas sobre o exercício
        </Typography>

        <MuiSelectField
          label="Escolha o exercício:"
          options={[...'ABCDEFGHIJ']}
          placeholder="Selecione o exercício"
          icon={<BookIcon sx={{ color: '#4F85A6' }} />}
        />

        <MuiSelectField
          label="Escolha a Linguagem:"
          options={["C", "C++", "C#", "Java", "PHP", "Python"]}
          placeholder="Selecione a linguagem"
          icon={<CodeIcon sx={{ color: '#4F85A6' }} />}
        />

        <InputField
          label="Título da Pergunta:"
          placeholder="Ex: Dúvida sobre o laço for no Exercício A"
          icon={<TitleIcon sx={{ color: '#4F85A6' }} />}
        />

        <TextareaField />

        <MuiButton
          variant="contained"
          endIcon={<FaPaperPlane />}
          sx={{
            bgcolor: '#4F85A6',
            color: '#fff',
            borderRadius: 8,
            px: 5,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            mt: 2,
            '&:hover': {
              bgcolor: '#3B6A82',
              transform: 'translateY(-2px)',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Enviar Pergunta
        </MuiButton>
      </Paper>
    </Box>
  );
};

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

const allMockQuestions: Question[] = [
  {
    id: 1,
    title: "Problema ao compilar código",
    question: "Estou tendo um erro de sintaxe estranho ao compilar meu código C++ para o desafio de hoje. Poderiam me ajudar a depurar? O erro é 'undefined reference to main'.",
    askedBy: "Time Alfa",
    askedAt: "2025-06-20 16:30:00",
    status: "answered",
    answer: "Verifique se a função `main` está corretamente definida com a assinatura `int main() { ... }` ou `int main(int argc, char* argv[]) { ... }`. O erro 'undefined reference to main' geralmente indica que o linker não conseguiu encontrar o ponto de entrada principal do seu programa.",
    answeredAt: "2025-06-20 17:00:00",
    language: "C++",
  },
  {
    id: 2,
    title: "Dúvida sobre complexidade de algoritmo",
    question: "Qual a complexidade de tempo do algoritmo de ordenação que usamos na aula 3? Não consegui entender completamente.",
    askedBy: "Time Beta",
    askedAt: "2025-06-19 10:15:00",
    status: "answered",
    answer: "A complexidade de tempo do algoritmo de ordenação que usamos na aula 3 é O(n log n), pois utilizamos o Merge Sort, que é eficiente para grandes conjuntos de dados. Para mais detalhes, revise a seção sobre 'Divisão e Conquista' nos materiais da aula.",
    answeredAt: "2025-06-19 11:00:00",
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
];

const getQuestionsForUser = (): Question[] => {
  return [...allMockQuestions];
};

function UserQuestionRow({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  const isAnswered = question.status === 'answered' && question.answer;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
          '&:hover': { backgroundColor: '#e0f2f7' },
          transition: 'background-color 0.3s ease-in-out',
        }}
      >
        <TableCell sx={{ textAlign: 'center' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: '#4F85A6' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: '16px', textAlign: 'center', color: '#555' }}>
          {question.id}
        </TableCell>
        <TableCell sx={{ fontSize: '16px', textAlign: 'center', color: '#555' }}>
          {question.title}
        </TableCell>
        <TableCell sx={{ fontSize: '16px', textAlign: 'center', color: '#555' }}>
          {question.language || 'N/A'}
        </TableCell>
        <TableCell sx={{ fontSize: '16px', textAlign: 'center', color: '#555' }}>
          {new Date(question.askedAt).toLocaleString('pt-BR')}
        </TableCell>
        <TableCell sx={{ fontSize: '16px', textAlign: 'center' }}>
          <Box
            component="span"
            sx={{
              p: 0.7,
              borderRadius: 2,
              fontWeight: 'bold',
              minWidth: '90px',
              display: 'inline-block',
              textAlign: 'center',
              backgroundColor: isAnswered ? '#e8f5e9' : '#fffde7',
              color: isAnswered ? '#2e7d32' : '#fbc02d',
              border: `1px solid ${isAnswered ? '#a5d6a7' : '#ffd54f'}`,
            }}
          >
            {isAnswered ? 'Respondida' : 'Pendente'}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 3, borderLeft: '5px solid #4F85A6', backgroundColor: '#f0f8fa', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: '#4F85A6', fontWeight: 'bold' }}>
                <FaQuestionCircle style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Sua Dúvida:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, p: 2, borderRadius: 1, backgroundColor: '#fff', boxShadow: '0px 2px 5px rgba(0,0,0,0.05)', lineHeight: 1.6 }}>
                {question.question}
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 1, color: '#4F85A6', fontWeight: 'bold' }}>
                <FaUser style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Resposta do Professor/ADM:
              </Typography>
              {isAnswered ? (
                <>
                  <Typography variant="body1" sx={{ mb: 2, p: 2, borderRadius: 1, backgroundColor: '#e8f5e9', boxShadow: '0px 2px 5px rgba(0,0,0,0.05)', lineHeight: 1.6 }}>
                    {question.answer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                    Respondida em {new Date(question.answeredAt || '').toLocaleString('pt-BR')}.
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: '#757575', p: 2, borderRadius: 1, backgroundColor: '#fff', boxShadow: '0px 2px 5px rgba(0,0,0,0.05)' }}>
                  Aguardando resposta do professor/administrador.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const UserQuestionsPageContent = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchedQuestions = getQuestionsForUser();
    const sortedQuestions = [...fetchedQuestions].sort((a, b) => {
      return new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime();
    });
    setQuestions(sortedQuestions);
  }, []);

  return (
    <Box
        sx={{
          bgcolor: 'transparent',
          minHeight: 'calc(100vh - 64px - 60px)',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          alignItems: 'center',
          width: '100%',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            color: '#4F85A6',
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '2.5rem' },
            letterSpacing: '0.05em',
          }}
        >
          Minhas Dúvidas
        </Typography>

        <Paper sx={{
          width: '100%',
          maxWidth: '1500px',
          borderRadius: 4,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
            <Table stickyHeader aria-label="collapsible user questions table" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#4F85A6', color: '#fff', fontSize: '1rem', fontWeight: 'bold' }} />
                  <TableCell style={{ width: '8%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>ID</TableCell>
                  <TableCell style={{ width: '35%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Título</TableCell>
                  <TableCell style={{ width: '15%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Linguagem</TableCell>
                  <TableCell style={{ width: '25%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Data/Hora Pergunta</TableCell>
                  <TableCell style={{ width: '17%', backgroundColor: '#4F85A6', color: '#fff', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Situação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ fontSize: '18px', py: 3, color: '#757575' }}>
                      Você ainda não fez nenhuma pergunta.
                    </TableCell>
                  </TableRow>
                ) : (
                  questions.map((question) => (
                    <UserQuestionRow
                      key={question.id}
                      question={question}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
  );
};

const Navbar = () => (
  <div className="bg-[#4F85A6] text-white mb-6 flex justify-between items-center p-4 px-6">
    <nav className="flex space-x-6 text-lg">
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white transition-colors duration-200">Home</a>
      <span>|</span>
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white transition-colors duration-200">Enviar Exercício</a>
      <span>|</span>
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white transition-colors duration-200">Ranking</a>
      <span>|</span>
      <a href="#" className="text-white no-underline hover:border-b-2 hover:border-white transition-colors duration-200">Dúvidas</a>
    </nav>
    <button className="text-white ml-auto">
      <FaSignOutAlt size={24} />
    </button>
  </div>
);

export default function CentralDeDuvidas() {
  const [visualizacaoAtiva, setVisualizacaoAtiva] = useState<'fazer' | 'minhas'>('fazer');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 4,
          mx: 'auto',
          maxWidth: 'fit-content',
          p: 1,
          borderRadius: 4,
          bgcolor: '#e0e0e0',
          boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <MuiButton
          variant={visualizacaoAtiva === 'fazer' ? 'contained' : 'text'}
          onClick={() => setVisualizacaoAtiva('fazer')}
          sx={{
            bgcolor: visualizacaoAtiva === 'fazer' ? '#4F85A6' : 'transparent',
            color: visualizacaoAtiva === 'fazer' ? '#fff' : '#4F85A6',
            fontWeight: 'bold',
            borderRadius: 3,
            px: 3,
            py: 1.2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              bgcolor: visualizacaoAtiva === 'fazer' ? '#3B6A82' : 'rgba(79, 133, 166, 0.1)',
              color: visualizacaoAtiva === 'fazer' ? '#fff' : '#3B6A82',
            },
          }}
        >
          Fazer Pergunta
        </MuiButton>
        <MuiButton
          variant={visualizacaoAtiva === 'minhas' ? 'contained' : 'text'}
          onClick={() => setVisualizacaoAtiva('minhas')}
          sx={{
            bgcolor: visualizacaoAtiva === 'minhas' ? '#4F85A6' : 'transparent',
            color: visualizacaoAtiva === 'minhas' ? '#fff' : '#4F85A6',
            fontWeight: 'bold',
            borderRadius: 3,
            px: 3,
            py: 1.2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              bgcolor: visualizacaoAtiva === 'minhas' ? '#3B6A82' : 'rgba(79, 133, 166, 0.1)',
              color: visualizacaoAtiva === 'minhas' ? '#fff' : '#3B6A82',
            },
          }}
        >
          Minhas Dúvidas
        </MuiButton>
      </Box>

      {visualizacaoAtiva === 'fazer' ? <AskQuestionsContent /> : <UserQuestionsPageContent />}
    </div>
  );
}