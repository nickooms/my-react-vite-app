import * as React from 'react';
import { Label } from './LabelProps';
import { Text } from './TextProps';
import './Position.css';

export interface TextFieldProps {
  label?: string;
}

export function TextFieldFactory(onUpdateField: React.ChangeEventHandler<HTMLInputElement>): React.FC<TextFieldProps> {
  return ({ label, children }) => (
    <div className="formGroup">
      <Label>{label}</Label>
      <Text onChange={onUpdateField}>{children as string}</Text>
    </div>
  );
}
