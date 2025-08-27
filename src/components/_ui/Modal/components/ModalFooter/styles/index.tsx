import { styled } from '@mui/material/styles';

export const ModalFooterRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));