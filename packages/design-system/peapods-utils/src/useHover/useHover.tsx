import { useCallback, useRef, useState } from 'react';

function useHover<T extends HTMLElement = HTMLElement>(): [
  (node: T | null) => void,
  boolean,
] {
  const [hovered, setHovered] = useState(false);
  const previousNode = useRef<T | null>(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const customRef = useCallback(
    (node: T | null) => {
      if (previousNode.current) {
        previousNode.current.removeEventListener(
          'mouseenter',
          handleMouseEnter,
        );
        previousNode.current.removeEventListener(
          'mouseleave',
          handleMouseLeave,
        );
      }

      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }

      previousNode.current = node;
    },
    [handleMouseEnter, handleMouseLeave],
  );

  return [customRef, hovered];
}

export default useHover;
