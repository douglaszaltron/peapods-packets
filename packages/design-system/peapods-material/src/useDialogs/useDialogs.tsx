import Dialog from '@mui/material/Dialog';
import { useNonNullableContext } from '@peapods/utils';
import * as React from 'react';
import LoadingButton from '../LoadingButton';
import { DialogBody, DialogFooter, DialogHeader } from './DialogsComponent';
import DialogsContext from './DialogsContext';

export interface OpenDialogOptions<R> {
  /**
   * A function that is called before closing the dialog closes. The dialog
   * stays open as long as the returned promise is not resolved. Use this if
   * you want to perform an async action on close and show a loading state.
   *
   * @param result The result that the dialog will return after closing.
   * @returns A promise that resolves when the dialog can be closed.
   */
  onClose?: (result: R) => Promise<void>;
}

export interface AlertOptions extends OpenDialogOptions<boolean> {
  /**
   * A title for the dialog. Defaults to `'Alerta'`.
   */
  title?: React.ReactNode;
  /**
   * The text to show in the "Ok" button. Defaults to `'Ok'`.
   */
  okText?: React.ReactNode;
}

export interface ConfirmOptions extends OpenDialogOptions<boolean> {
  /**
   * A title for the dialog. Defaults to `'Tem certeza que deseja continuar?'`.
   */
  title?: React.ReactNode;
  /**
   * The text to show in the "Ok" button. Defaults to `'Confirmar'`.
   */
  okText?: React.ReactNode;
  /**
   * Denotes the purpose of the dialog. This will affect the color of the
   * "Ok" button. Defaults to `undefined`.
   */
  severity?: 'error' | 'info' | 'success' | 'warning';
  /**
   * The text to show in the "Cancel" button. Defaults to `'Cancelar'`.
   */
  cancelText?: React.ReactNode;
}

/**
 * The props that are passed to a dialog component.
 */
export interface DialogProps<P = undefined, R = void> {
  /**
   * The payload that was passed when the dialog was opened.
   */
  payload: P;
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * A function to call when the dialog should be closed. If the dialog has a return
   * value, it should be passed as an argument to this function. You should use the promise
   * that is returned to show a loading state while the dialog is performing async actions
   * on close.
   * @param result The result to return from the dialog.
   * @returns A promise that resolves when the dialog can be fully closed.
   */
  onClose: (result: R) => Promise<void>;
}

export interface OpenAlertDialog {
  /**
   * Open an alert dialog. Returns a promise that resolves when the user
   * closes the dialog.
   *
   * @param msg The message to show in the dialog.
   * @param options Additional options for the dialog.
   * @returns A promise that resolves to true if the user confirms, false if the user cancels.
   */

  // biome-ignore lint/style/useShorthandFunctionType: safe
  (msg: React.ReactNode, options?: AlertOptions): Promise<boolean>;
}

export interface OpenConfirmDialog {
  /**
   * Open a confirmation dialog. Returns a promise that resolves to true if
   * the user confirms, false if the user cancels.
   *
   * @param msg The message to show in the dialog.
   * @param options Additional options for the dialog.
   * @returns A promise that resolves to true if the user confirms, false if the user cancels.
   */

  // biome-ignore lint/style/useShorthandFunctionType: safe
  (msg: React.ReactNode, options?: ConfirmOptions): Promise<boolean>;
}

export type DialogComponent<P, R> = React.ComponentType<DialogProps<P, R>>;

export interface OpenDialog {
  /**
   * Open a dialog without payload.
   * @param Component The dialog component to open.
   * @param options Additional options for the dialog.
   */
  <P extends undefined, R>(
    Component: DialogComponent<P, R>,
    payload?: P,
    options?: OpenDialogOptions<R>,
  ): Promise<R>;
  /**
   * Open a dialog and pass a payload.
   * @param Component The dialog component to open.
   * @param payload The payload to pass to the dialog.
   * @param options Additional options for the dialog.
   */
  <P, R>(
    Component: DialogComponent<P, R>,
    payload: P,
    options?: OpenDialogOptions<R>,
  ): Promise<R>;
}

export interface CloseDialog {
  /**
   * Close a dialog and return a result.
   * @param dialog The dialog to close. The promise returned by `open`.
   * @param result The result to return from the dialog.
   * @returns A promise that resolves when the dialog is fully closed.
   */

  // biome-ignore lint/style/useShorthandFunctionType: safe
  <R>(dialog: Promise<R>, result: R): Promise<R>;
}

export interface DialogHook {
  alert: OpenAlertDialog;
  confirm: OpenConfirmDialog;
  open: OpenDialog;
  close: CloseDialog;
}

export function useDialogLoadingButton(onClose: () => Promise<void>) {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClose();
    } finally {
      setLoading(false);
    }
  };
  return {
    onClick: handleClick,
    loading,
  };
}

export interface AlertDialogPayload extends AlertOptions {
  msg: React.ReactNode;
}

export interface AlertDialogProps
  extends DialogProps<AlertDialogPayload, boolean> {}

export function AlertDialog({ open, payload, onClose }: AlertDialogProps) {
  const okButtonProps = useDialogLoadingButton(() => onClose(true));
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={() => onClose(false)}>
      <DialogHeader onClose={() => onClose(false)}>
        {payload.title ?? 'Alerta'}
      </DialogHeader>
      <DialogBody>{payload.msg}</DialogBody>
      <DialogFooter>
        <LoadingButton variant="contained" disabled={!open} {...okButtonProps}>
          {payload.okText ?? 'Ok'}
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
}

export interface ConfirmDialogPayload extends ConfirmOptions {
  msg: React.ReactNode;
}

export interface ConfirmDialogProps
  extends DialogProps<ConfirmDialogPayload, boolean> {}

export function ConfirmDialog({ open, payload, onClose }: ConfirmDialogProps) {
  const cancelButtonProps = useDialogLoadingButton(() => onClose(false));
  const okButtonProps = useDialogLoadingButton(() => onClose(true));
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={() => onClose(false)}>
      <DialogHeader onClose={() => onClose(false)}>
        {payload.title ?? 'Tem certeza que deseja continuar?'}
      </DialogHeader>
      <DialogBody>{payload.msg}</DialogBody>
      <DialogFooter>
        <LoadingButton disabled={!open} {...cancelButtonProps}>
          {payload.cancelText ?? 'Cancelar'}
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color={payload.severity}
          disabled={!open}
          {...okButtonProps}
        >
          {payload.okText ?? 'Confirmar'}
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
}

function useDialogs(): DialogHook {
  const { open, close } = useNonNullableContext(DialogsContext);

  const alert = React.useCallback<OpenAlertDialog>(
    async (msg, { onClose, ...options } = {}) =>
      open(AlertDialog, { ...options, msg }, { onClose }),
    [open],
  );

  const confirm = React.useCallback<OpenConfirmDialog>(
    async (msg, { onClose, ...options } = {}) =>
      open(ConfirmDialog, { ...options, msg }, { onClose }),
    [open],
  );

  return React.useMemo(
    () => ({
      alert,
      confirm,
      open,
      close,
    }),
    [alert, close, confirm, open],
  );
}

export default useDialogs;
