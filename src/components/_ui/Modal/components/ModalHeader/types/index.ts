import React from "react";
import { ModalStatus } from "../../../types";

export interface ModalHeaderProps {
  status?: ModalStatus;
  showCloseButton?: boolean;
  onClose?: () => void;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  headerIcon?: React.ReactNode;
}