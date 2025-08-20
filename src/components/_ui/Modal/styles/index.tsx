import { styled } from "@mui/material";
import { ModalSize } from "../types";

export const Backdrop = styled('div')<{
  center?: boolean;
}>(({ theme, center }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 10,
  display: 'flex',
  alignItems: center ? 'center' : 'flex-start',
  justifyContent: 'center',
  overflowY: 'auto',
  paddingTop: center ? 0 : theme.spacing(8),
  paddingBottom: center ? 0 : theme.spacing(8),
}));



export const sizeMap: Record<ModalSize, { minWidth: number; maxWidth: number }> = {
  sm: { minWidth: 280, maxWidth: 400 },
  md: { minWidth: 320, maxWidth: 600 },
  lg: { minWidth: 400, maxWidth: 900 },
  xl: { minWidth: 500, maxWidth: 1200 },
};

interface ModalContainerProps {
  size: ModalSize;
  width?: number | string;
}

export const ModalContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'width',
})<ModalContainerProps>(({ theme, size, width }) => ({
  background: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: theme.shadows[5],
  minWidth: width ? undefined : sizeMap[size].minWidth,
  maxWidth: width ? undefined : sizeMap[size].maxWidth,
  width: width || '100%',
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  padding: "1.5rem"
}));