import React from 'react';
import Modal from './Modal';
import Button from '../atoms/Button';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger': return <AlertTriangle size={48} color="var(--error)" />;
      case 'warning': return <AlertTriangle size={48} color="var(--warning)" />;
      case 'info': return <Info size={48} color="var(--primary)" />;
      case 'success': return <CheckCircle size={48} color="var(--success)" />;
      default: return null;
    }
  };

  const getButtonVariant = () => {
    if (variant === 'danger') return 'danger';
    if (variant === 'success') return 'success';
    return 'primary';
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      footer={
        <div className="flex gap-md w-full">
          <Button variant="outline" fullWidth onClick={onClose}>{cancelText}</Button>
          <Button variant={getButtonVariant()} fullWidth onClick={() => { onConfirm(); onClose(); }}>{confirmText}</Button>
        </div>
      }
    >
      <div className="flex-col items-center gap-md py-lg text-center">
        <div style={{ padding: '1.25rem', background: 'var(--surface-hover)', borderRadius: 'var(--radius-full)', marginBottom: '0.25rem' }}>
          {getIcon()}
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, padding: '0 1rem' }}>{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
