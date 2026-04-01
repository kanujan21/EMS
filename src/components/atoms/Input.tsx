import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import styles from './Input.module.css';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, fullWidth, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          styles.input,
          error && styles.error,
          fullWidth && styles.fullWidth,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
