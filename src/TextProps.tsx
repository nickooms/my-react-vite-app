import * as React from 'react';
import './Position.css';

interface TextProps extends React.HTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}
export const Text: React.FC<TextProps> = ({ children, ...props }) => (
  <input
    className="formField"
    type="text"
    aria-label="Latitude field"
    name="latitude"
    value={String(children)}
    {...props}
  />
);
