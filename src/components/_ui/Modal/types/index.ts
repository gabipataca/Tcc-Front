import React from "react";

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type ModalStatus = 'success' | 'error' | 'warning' | 'info' | undefined;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  bodyContent: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  headerIcon?: React.ReactNode;
  size?: ModalSize;
  width?: number | string;
  loading?: boolean;
  showCloseButton?: boolean;
  status?: ModalStatus;
  center?: boolean; // centralização vertical/horizontal
  hasConfirmButton?: boolean;
  hasCancelButton?: boolean;
  confirmButtonContent?: string | React.ReactNode;
  cancelButtonContent?: string | React.ReactNode;
  growFooterButtons?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}