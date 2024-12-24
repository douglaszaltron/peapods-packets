import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicEffect =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;

function useDocumentTitle(title: string) {
  useIsomorphicEffect(() => {
    if (typeof title === 'string' && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}

export default useDocumentTitle;
