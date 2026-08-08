import type { ReactNode } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

import {
  FIELD_LABELS,
  missingFields,
  PAGE_DEPENDENCIES,
  siteConfig,
  type RequiredBeforePublish,
} from '@/config/site';

/**
 * Renders nothing once every fact a page depends on is confirmed in
 * `config/site.ts`. Until then it states plainly that the page is not ready,
 * and names exactly what is missing.
 *
 * This exists so a draft is never mistaken for a signed policy. The app repo's
 * docs/LEGAL_REVIEW_REGISTER.md forbids treating any of these documents as
 * final before sign-off, and a silent placeholder would do exactly that.
 */
export function PendingNotice({ page }: { page: keyof typeof PAGE_DEPENDENCIES }) {
  const missing = missingFields(PAGE_DEPENDENCIES[page]);

  return (
    <div
      role="note"
      className="rounded-2xl border border-ochre/30 bg-ochre-light p-5 print:border-black"
    >
      <div className="flex gap-3">
        <AlertTriangle
          size={18}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-ochre"
        />
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-bold">Draft. Not yet legally reviewed.</p>
          <p className="mt-1 text-ink-2">
            This document has been written but has not been signed off by a solicitor, and
            CareNote Coach has not launched. Do not rely on it as a binding policy yet.
          </p>

          {missing.length > 0 && (
            <>
              <p className="mt-3 text-ink-2">
                The following {missing.length === 1 ? 'fact is' : 'facts are'} still
                unconfirmed and deliberately left blank rather than guessed:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
                {missing.map((field) => (
                  <li key={field}>{FIELD_LABELS[field]}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * An inline gap where a specific unconfirmed fact belongs. Renders the
 * confirmed value once `config/site.ts` has one, and an explicit marker until
 * then. It never substitutes a plausible-looking stand-in, which is the same
 * rule the app applies to generated care-note text.
 */
export function Fact({
  field,
  children,
}: {
  field: RequiredBeforePublish;
  children?: (value: string) => ReactNode;
}) {
  const value = siteConfig[field];

  if (value === null) {
    return (
      <span className="inline-flex items-baseline gap-1.5 rounded-md bg-ochre-light px-2 py-0.5 text-[0.9em] font-medium text-ochre ring-1 ring-ochre/20">
        <Info size={12} aria-hidden="true" className="translate-y-[2px]" />
        {FIELD_LABELS[field]} not confirmed
      </span>
    );
  }

  return <>{children ? children(value) : value}</>;
}
