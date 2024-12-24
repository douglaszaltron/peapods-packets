import * as React from 'react';
import ToastContext from './ToastContext';

interface ShowToastOptions {
  /**
   * The key to use for deduplication Toast. If not provided, a unique key will be generated.
   */
  key?: string;
  /**
   * The title of the Toast.
   */
  title?: string;
  /**
   * The severity of the Toast. When provided, the snackbar will show an alert with the
   * specified severity.
   */
  color?: 'error' | 'success' | 'info' | 'warning';
  /**
   * The duration in milliseconds after which the Toast will automatically close.
   */
  autoHideDuration?: number;
  /**
   * The text to display on the action button.
   */
  actionText?: string;
  /**
   * The callback to call when the action button is clicked.
   */
  onAction?: () => void;
  /**
   * Whether the Toast is loading.
   */
  loading?: boolean;
}

interface ShowToast {
  /**
   * Show a snackbar in the application.
   *
   * @param message The message to display in the snackbar.
   * @param options Options for the snackbar.
   * @returns The key that represents the Toast. Useful for programmatically
   * closing it.
   */

  // biome-ignore lint/style/useShorthandFunctionType: safe call signature
  (message: string, options?: ShowToastOptions): string;
}

interface CloseToast {
  /**
   * Close a snackbar in the application.
   *
   * @param key The key of the Toast to close.
   */

  // biome-ignore lint/style/useShorthandFunctionType: safe call signature
  (key: string): void;
}

interface UseToast {
  show: ShowToast;
  close: CloseToast;
}

const serverToast: UseToast = {
  show: () => {
    throw new Error('Not supported on server side');
  },
  close: () => {
    throw new Error('Not supported on server side');
  },
};

function useToast(): UseToast {
  const context = React.useContext(ToastContext);

  if (context) {
    return context;
  }

  return serverToast;
}

export default useToast;
export type { ShowToastOptions, ShowToast, CloseToast, UseToast };
