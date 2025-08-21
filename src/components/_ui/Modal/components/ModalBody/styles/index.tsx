import { styled } from "@mui/material";



export const ModalBodyScrollRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 3),
  flex: 1,
  overflowY: 'auto',
  maxHeight: '60vh',
}));