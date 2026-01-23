import React, { useEffect } from 'react';
import styles from './ErrorSnackbar.module.css';

interface ErrorSnackbarProps {
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

export const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ 
  message, 
  onClose, 
  autoHideDuration = 6000 
}) => {
  useEffect(() => {
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onClose]);

  if (!message) return null;

  return (
    <div className={styles.snackbar} role="alert">
      <span className={styles.message}>{message}</span>
      <button 
        onClick={onClose} 
        className={styles.closeButton} 
        aria-label="Close error message"
      >
        ✕
      </button>
    </div>
  );
};
