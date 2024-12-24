import { useEffect, useMemo } from 'react';
import {
  type HotkeyItemOptions,
  getHotkeyHandler,
  getHotkeyMatcher,
} from './parseHotkey';

export type { HotkeyItemOptions };

export { getHotkeyHandler };

export type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];

function shouldFireEvent(
  event: KeyboardEvent,
  tagsToIgnore: string[],
  triggerOnContentEditable = false,
) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return (
      !event.target.isContentEditable &&
      !tagsToIgnore.includes(event.target.tagName)
    );
  }

  return true;
}

export default function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
  triggerOnContentEditable = false,
) {
  const keydownListener = useMemo(
    () => (event: KeyboardEvent) => {
      for (const [
        hotkey,
        handler,
        options = { preventDefault: true },
      ] of hotkeys) {
        if (
          getHotkeyMatcher(hotkey)(event) &&
          shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
        ) {
          if (options.preventDefault) {
            event.preventDefault();
          }

          handler(event);
        }
      }
    },
    [hotkeys, tagsToIgnore, triggerOnContentEditable],
  );

  useEffect(() => {
    document.documentElement.addEventListener('keydown', keydownListener);
    return () =>
      document.documentElement.removeEventListener('keydown', keydownListener);
  }, [keydownListener]);
}
