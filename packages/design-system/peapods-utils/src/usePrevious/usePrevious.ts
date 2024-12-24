import { useEffect, useRef } from 'react';

/**
 * Get the previous value of a state variable
 * @param value The state variable
 * @returns The previous value of the state variable
 */
export default function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
