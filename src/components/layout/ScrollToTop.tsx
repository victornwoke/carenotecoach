import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Client-side navigation keeps the old scroll position, which lands a user
 * partway down a legal document they have not read. Reset on every path change,
 * but respect a reduced-motion preference by jumping rather than animating.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }, [pathname]);

  return null;
}
