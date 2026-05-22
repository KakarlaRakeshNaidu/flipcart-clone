import React from 'react';
import { useToast } from '../../context/ToastContext';

const Toast = () => {
  const { toast } = useToast();

  if (!toast) return null;

  const bgColor = toast.type === 'success' ? '#26a541' : '#323232';

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      background: bgColor,
      color: '#fff',
      borderRadius: 4,
      padding: '12px 24px',
      fontSize: 14,
      zIndex: 9999,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      animation: 'toastIn 0.25s ease-out',
    }}>
      {toast.message}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Toast;
