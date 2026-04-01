import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import styles from './FormField.module.css';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, required, children, ...props }) => {
  return (
    <div className={styles.field}>
      <Label htmlFor={props.id} required={required}>
        {label}
      </Label>
      {children ? children : <Input {...props} error={!!error} fullWidth />}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default FormField;
