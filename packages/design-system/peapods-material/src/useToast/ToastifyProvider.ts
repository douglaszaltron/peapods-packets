import { warnOnce } from '@peapods/utils';
import { useCallback, useEffect, useMemo } from 'react';
import type { ShowToastOptions } from './useToast';
import useToast from './useToast';

interface ToastHandler {
  show: (message: string, options: ShowToastOptions) => void;
  close: (key: string) => void;
}

class ToastManager {
  private static instance: ToastManager;

  private constructor() {}

  private handlers: ToastHandler[] = [];

  private readonly maxHandlers = 10;

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }

    return ToastManager.instance;
  }

  public show(message: string, options: ShowToastOptions): void {
    if (!message.trim()) {
      warnOnce('Attempt to show toast with empty message');
      return;
    }

    for (const handler of this.handlers) {
      handler.show(message, options);
    }
  }

  public close(key: string): void {
    for (const handler of this.handlers) {
      handler.close(key);
    }
  }

  public subscribe(
    show: (message: string, options: ShowToastOptions) => void,
    close: (key: string) => void,
  ): () => void {
    if (this.handlers.length >= this.maxHandlers) {
      warnOnce('Maximum number of handlers reached');
      return () => {};
    }
    const handler = { show, close };
    this.handlers.push(handler);
    return () => {
      this.handlers = this.handlers.filter((h) => h !== handler);
    };
  }
}

export const toastify = ToastManager.getInstance();

export const ToastifyProvider = () => {
  const context = useToast();

  const showToast = useCallback(
    (message: string, options: ShowToastOptions) => {
      context.show(message, options);
    },
    [context],
  );

  const closeToast = useCallback(
    (key: string) => {
      context.close(key);
    },
    [context],
  );

  const handlers = useMemo(
    () => ({
      showToast,
      closeToast,
    }),
    [showToast, closeToast],
  );

  useEffect(() => {
    const unsubscribe = toastify.subscribe(
      handlers.showToast,
      handlers.closeToast,
    );

    return unsubscribe;
  }, [handlers]);

  return null;
};
