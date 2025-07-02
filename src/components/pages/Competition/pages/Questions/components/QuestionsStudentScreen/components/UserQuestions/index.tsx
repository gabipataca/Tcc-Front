import { useQuestions } from "@/components/pages/Competition/contexts/QuestionsContext";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import UserQuestionRow from "../UserQuestionRow";
import { FC } from "react";

const UserQuestions: FC = () => {
    const { questions } = useQuestions();

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
        <TableContainer sx={{ maxHeight: 'auto', overflowY: 'auto' }}>
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

export default UserQuestions;