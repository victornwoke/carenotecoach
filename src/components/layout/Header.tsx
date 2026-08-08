import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

import { ROUTES } from '@/app/routes';
import { siteConfig } from '@/config/site';

import { Logo } from './Logo';

const NAV = [
  { to: ROUTES.privacy, label: 'Privacy' },
  { to: ROUTES.terms, label: 'Terms' },
  { to: ROUTES.support, label: 'Support' },
  { to: ROUTES.accessibility, label: 'Accessibility' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm rule-bottom border-b border-rule no-print">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-3 group"
            aria-label={`${siteConfig.appName} home`}
          >
            <Logo size={34} />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              CareNote <span className="text-teal">Coach</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'text-sm font-medium transition-colors',
                        isActive ? 'text-teal' : 'text-ink-2 hover:text-ink',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-rule text-ink-2"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Primary, mobile" className="md:hidden pb-4">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        'block rounded-xl px-3 py-3 text-sm font-medium',
                        isActive ? 'bg-teal-light text-teal' : 'text-ink-2 hover:bg-surface-2',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
