import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import styles from './Badge.module.css';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
}

const Badge: React.FC<BadgeProps> = ({ className, variant = 'primary', ...props }) => {
  return (
    <span
      className={cn(styles.badge, styles[variant], className)}
      {...props}
    />
  );
};

export default Badge;
