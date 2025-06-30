'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, TableCell, TableRow, Button, TextField, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Question } from "../../types";

const QuestionRow = (props: { initialQuestion: Question; onQuestionUpdate: (updatedQuestion: Question) => void }) => {
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

export default QuestionRow;