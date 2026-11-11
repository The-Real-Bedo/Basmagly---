import { useEffect, useState } from 'react';

/**
 * Reactive CSS media-query flag (window.matchMedia + change listener).
 * Shared twin of the local hook in VacuumWorld3DLab — keep both in sync.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export default useMediaQuery;
