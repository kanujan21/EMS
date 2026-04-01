import React from 'react';
import clsx from 'clsx';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'secondary';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary', 
  className 
}) => {
  return (
    <div 
      className={clsx(
        styles.spinner, 
        styles[size], 
        styles[color], 
        className
      )} 
    />
  );
};

export default Spinner;
