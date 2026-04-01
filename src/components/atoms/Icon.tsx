import React from 'react';
import { type LucideIcon, type LucideProps } from 'lucide-react';
import clsx from 'clsx';

interface IconProps extends LucideProps {
  icon: LucideIcon;
  size?: number | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ 
  icon: IconComponent, 
  size = 20, 
  className, 
  ...props 
}) => {
  return (
    <IconComponent 
      size={size} 
      className={clsx('icon', className)} 
      {...props} 
    />
  );
};

export default Icon;
