import React, { FC, useState } from "react";
import { Box, Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FaQuestionCircle, FaUser } from "react-icons/fa";
import { UserQuestionRowProps } from "./types";

const UserQuestionRow: FC<UserQuestionRowProps> = ({ question }) => {
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

export default UserQuestionRow;