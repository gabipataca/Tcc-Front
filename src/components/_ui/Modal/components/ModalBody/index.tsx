import React from 'react';
import { ModalBodyScrollProps } from './types';
import { ModalBodyScrollRoot } from './styles';



export const ModalBodyScroll: React.FC<ModalBodyScrollProps> = ({ children }) => (
  <ModalBodyScrollRoot>{children}</ModalBodyScrollRoot>
);
