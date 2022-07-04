import * as React from 'react';
import type { HTMLAttributes, ReactNode, FC } from 'react';
import './Position.css';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label: FC<LabelProps> = ({ children, ...props }) => (
  <label className="formLabel" {...props}>
    {children}
  </label>
);
