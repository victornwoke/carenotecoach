import { Link } from 'react-router';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';

const LINKS = [
  { to: ROUTES.privacy, label: 'Privacy Policy' },
  { to: ROUTES.terms, label: 'Terms of Use' },
  { to: ROUTES.support, label: 'Support' },
  { to: ROUTES.accountDeletion, label: 'Delete your account' },
] as const;

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist."
        path="/404"
        noIndex
      />
      <div className="mx-auto max-w-2xl px-5 py-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal">404</p>
        <h1 className="text-4xl font-black text-ink sm:text-5xl">Page not found</h1>
        <p className="measure mt-5 leading-relaxed text-ink-2">
          That address doesn&rsquo;t exist here. If you followed a link from inside the app,
          the page you want is probably one of these.
        </p>
        <ul className="mt-8 space-y-2.5">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-teal underline decoration-rule underline-offset-4 hover:decoration-teal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
