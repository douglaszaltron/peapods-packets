import { useCallback, useRef, useState } from 'react';

function useInViewport<T extends HTMLElement>() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [inViewport, setInViewport] = useState(false);

  const ref = useCallback((node: T | null) => {
    if (typeof IntersectionObserver !== 'undefined') {
      if (node && !observer.current) {
        observer.current = new IntersectionObserver(([entry]) => {
          if (entry) {
            setInViewport(entry.isIntersecting);
          }
        });
      } else {
        observer.current?.disconnect();
      }

      if (node) {
        observer.current?.observe(node);
      } else {
        setInViewport(false);
      }
    }
  }, []);

  return { ref, inViewport };
}

export default useInViewport;
