import Badge from '@mui/material/Badge';
import Snackbar, { type SnackbarProps } from '@mui/material/Snackbar';
import useSlotProps from '@mui/utils/useSlotProps';
import { useNonNullableContext } from '@peapods/utils';
import * as React from 'react';
import type { CloseReason, ToastCloseReason } from '../Toast';
import ToastComponent from '../Toast';
import ToastContext from './ToastContext';
import type { CloseToast, ShowToast, ShowToastOptions } from './useToast';

interface ToastProviderSlotProps {
  snackbar: SnackbarProps;
}

interface ToastProviderSlots {
  /**
   * The component that renders the snackbar.
   * @default Snackbar
   */
  snackbar: React.ElementType;
}

const RootPropsContext = React.createContext<ToastProviderProps | null>(null);

interface ToastProps {
  toastifyKey: string;
  badge: string | null;
  open: boolean;
  message: string;
  options: ShowToastOptions;
}

interface ToastQueueEntry {
  toastifyKey: string;
  options: ShowToastOptions;
  open: boolean;
  message: string;
}

interface ToastState {
  queue: ToastQueueEntry[];
}

interface ToastifyProps {
  state: ToastState;
}

interface ToastProviderProps {
  children?: React.ReactNode;
  slots?: Partial<ToastProviderSlots>;
  slotProps?: Partial<ToastProviderSlotProps>;
}

function Toast({ toastifyKey, open, message, options, badge }: ToastProps) {
  const { close } = useNonNullableContext(ToastContext);

  const {
    color,
    title,
    actionText,
    onAction,
    loading = false,
    autoHideDuration = 3000,
  } = options;

  const handleClose = React.useCallback(
    (_event: unknown, reason?: CloseReason | ToastCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
      close(toastifyKey);
    },
    [toastifyKey, close],
  );

  const anchorOrigin = { vertical: 'top', horizontal: 'center' };

  const props = React.useContext(RootPropsContext);

  const SnackbarComponent = props?.slots?.snackbar ?? Snackbar;

  const snackbarSlotProps = useSlotProps({
    elementType: SnackbarComponent,
    ownerState: props,
    externalSlotProps: props?.slotProps?.snackbar,
    additionalProps: {
      anchorOrigin,
      open,
      autoHideDuration: loading ? undefined : autoHideDuration,
      onClose: handleClose,
    },
  });

  return (
    <SnackbarComponent key={toastifyKey} {...snackbarSlotProps}>
      <Badge badgeContent={badge} color="primary" sx={{ width: '100%' }}>
        <ToastComponent
          title={title}
          message={message}
          color={color}
          actionText={actionText}
          loading={loading}
          onAction={onAction}
          onClose={handleClose}
        />
      </Badge>
    </SnackbarComponent>
  );
}

function Toastify({ state }: ToastifyProps) {
  const currentToast = state.queue[0] ?? null;

  return currentToast ? (
    <Toast
      {...currentToast}
      badge={state.queue.length > 1 ? String(state.queue.length) : null}
    />
  ) : null;
}

let nextId = 0;
const generateId = () => {
  const id = nextId;
  nextId += 1;
  return id;
};

/**
 * Provider for toast. The subtree of this component can use the `useToast` hook to
 * access the toast API. The Toasts are shown in the same order they are requested.
 */
function ToastProvider(props: ToastProviderProps) {
  const { children } = props;
  const [state, setState] = React.useState<ToastState>({ queue: [] });

  const show = React.useCallback<ShowToast>((message, options = {}) => {
    const toastifyKey = options.key ?? `toastify::${generateId()}`;
    setState((prev) => {
      if (prev.queue.some((n) => n.toastifyKey === toastifyKey)) {
        return prev;
      }
      return {
        ...prev,
        queue: [...prev.queue, { message, options, toastifyKey, open: true }],
      };
    });
    return toastifyKey;
  }, []);

  const close = React.useCallback<CloseToast>((key) => {
    setState((prev) => ({
      ...prev,
      queue: prev.queue.filter((n) => n.toastifyKey !== key),
    }));
  }, []);

  const contextValue = React.useMemo(() => ({ show, close }), [show, close]);

  return (
    <RootPropsContext.Provider value={props}>
      <ToastContext.Provider value={contextValue}>
        {children}
        <Toastify state={state} />
      </ToastContext.Provider>
    </RootPropsContext.Provider>
  );
}

export default ToastProvider;
export type { ToastProviderProps, ToastProviderSlotProps, ToastProviderSlots };
