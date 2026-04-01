import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import styles from './Label.module.css';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(styles.label, className)}
        {...props}
      >
        {children}
        {required && <span className={styles.required}>*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;
