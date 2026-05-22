import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // { message: '', type: 'success' | 'info' | 'error' }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    // Auto dismiss after 2.5 seconds
    setTimeout(() => {
      setToast(null);
    }, 2500);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
