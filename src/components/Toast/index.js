import React from 'react';
import cn from 'classnames';

import { TOAST_TYPES } from '../../hooks/useToast';

export const Toast = ({ toastMessage, onClickClose, show, type }) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        'alert',
        { 'alert-success': type == TOAST_TYPES.success },
        { 'alert-danger': type == TOAST_TYPES.error }
      )}
      role='alert'
    >
      <button type='button' className='btn-close' onClick={onClickClose} />
      {toastMessage}
    </div>
  );
};
