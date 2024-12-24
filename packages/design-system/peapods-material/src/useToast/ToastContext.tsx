import * as React from 'react';
import type { CloseToast, ShowToast } from './useToast';

interface ToastContextValue {
  show: ShowToast;
  close: CloseToast;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export default ToastContext;
export type { ToastContextValue };
