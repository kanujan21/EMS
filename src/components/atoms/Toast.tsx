import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 400); // Increased for smoother animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle2 size={22} className={styles.iconAnimate} />;
      case 'error': return <AlertCircle size={22} className={styles.iconAnimate} />;
      case 'info': return <Info size={22} className={styles.iconAnimate} />;
    }
  };

  return (
    <div className={`${styles.toast} ${isVisible ? styles.show : styles.hide} ${styles[type]} glass-card`}>
      <div className={`${styles.accent} ${styles[`accent-${type}`]}`} />
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.message}>{message}</div>
      <button className={styles.closeBtn} onClick={() => { setIsVisible(false); setTimeout(onClose, 400); }}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
