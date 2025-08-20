import React from "react";

export interface FadeTransitionProps {
  in: boolean;
  duration?: number;
  children: React.ReactNode;
  className?: string;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}