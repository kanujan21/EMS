import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, variant = 'primary' }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.label}>{label}</span>
          <h3 className={styles.value}>{value}</h3>
          {trend && (
            <div className={`${styles.trend} ${trend.isUp ? styles.up : styles.down}`}>
              <span>{trend.isUp ? '↑' : '↓'} {trend.value}%</span>
              <span className={styles.trendText}>from last month</span>
            </div>
          )}
        </div>
        <div className={`${styles.iconWrapper} ${styles[variant]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
