import React from 'react';
import { ModalFooterRoot } from './styles';


export const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ModalFooterRoot>{children}</ModalFooterRoot>
);
