import { useCallback, useState } from 'react';

/**
 * Custom hook for managing disclosure state.
 *
 * @param initialState - The initial state of the disclosure. Default is `false`.
 * @param callbacks - Optional callbacks for `onOpen` and `onClose` events.
 * @returns A tuple containing the current state of the disclosure and an object with functions to open, close, and toggle the disclosure.
 */
export default function useDisclosure(
  initialState = false,
  callbacks?: { onOpen?: () => void; onClose?: () => void },
) {
  const { onOpen, onClose } = callbacks || {};
  const [opened, setOpened] = useState(initialState);

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    opened ? close() : open();
  }, [close, open, opened]);

  return [opened, { open, close, toggle }] as const;
}
