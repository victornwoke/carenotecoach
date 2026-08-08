import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { siteConfig } from '@/config/site';

import { Logo } from './Logo';

const LEGAL_LINKS = [
  { to: ROUTES.privacy, label: 'Privacy Policy' },
  { to: ROUTES.terms, label: 'Terms of Use' },
  { to: ROUTES.subscriptionTerms, label: 'Subscription terms' },
  { to: ROUTES.accountDeletion, label: 'Delete your account' },
  { to: ROUTES.accessibility, label: 'Accessibility' },
  { to: ROUTES.support, label: 'Support' },
  { to: ROUTES.contact, label: 'Contact' },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface-2/60 no-print">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={30} />
              <span className="font-display text-base font-semibold text-ink">
                CareNote Coach
              </span>
            </div>
            <p className="measure mt-4 text-sm leading-relaxed text-ink-2">
              A UK care-documentation education app. It teaches documentation principles,
              lets you practise on fictional scenarios, and helps you structure facts you
              already know. It does not decide what happened, diagnose, or make
              safeguarding decisions.
            </p>
          </div>

          <nav aria-label="Legal and support">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ink-3">
              Legal and support
            </h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-2 underline decoration-rule underline-offset-4 hover:text-teal hover:decoration-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-rule pt-6 text-xs leading-relaxed text-ink-3">
          <p>
            {siteConfig.legalEntityName ? (
              <>
                &copy; {new Date().getFullYear()} {siteConfig.legalEntityName}.
              </>
            ) : (
              /* No entity is confirmed yet, so no copyright holder is asserted.
                 Claiming one would be inventing a legal fact. */
              <>&copy; {new Date().getFullYear()} CareNote Coach.</>
            )}{' '}
            CareNote Coach is not affiliated with, endorsed by, or approved by the CQC, NMC,
            NHS, Care Inspectorate, SSSC, Care Inspectorate Wales, Social Care Wales, RQIA or
            NISCC.
          </p>
        </div>
      </div>
    </footer>
  );
}
