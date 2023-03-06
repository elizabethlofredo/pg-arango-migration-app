import React, { useState, createContext, useContext } from 'react';
import { oneOfType, func, node } from 'prop-types';

import { Toast } from '../components/Toast';

const initialContext = {
  showToast: () => {},
  clearToast: () => {},
};

export const TOAST_TYPES = {
  success: 'success',
  error: 'error',
};

export const ToastContext = createContext(initialContext);

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState('');
  const [type, setType] = useState('');

  const showToast = ({ message, type = TOAST_TYPES.success }) => {
    setToast(message);
    setType(type);
  };

  const clearToast = () => setToast('');

  return (
    <ToastContext.Provider value={{ showToast, clearToast }}>
      {children}
      <Toast
        show={!!toast}
        toastMessage={toast}
        type={type}
        onClickClose={clearToast}
      />
    </ToastContext.Provider>
  );
};

ToastContextProvider.propTypes = {
  children: oneOfType([func, node]),
};

export const useToast = () => useContext(ToastContext);
