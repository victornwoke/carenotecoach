import type { ReactNode } from 'react';
import { Printer } from 'lucide-react';

import { siteConfig } from '@/config/site';

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  notice?: ReactNode;
  children: ReactNode;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  notice,
  children,
}: LegalLayoutProps) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-16 print:py-2">
      <header className="mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-teal print:text-black">
          {eyebrow}
        </p>

        <div className="flex items-start justify-between gap-6">
          <h1 className="text-4xl font-black leading-[1.1] text-ink sm:text-5xl">{title}</h1>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print mt-2 hidden shrink-0 items-center gap-2 rounded-xl border border-rule px-3 py-2 text-xs font-semibold text-ink-3 transition-colors hover:border-teal hover:text-teal sm:inline-flex"
          >
            <Printer size={14} aria-hidden="true" /> Print
          </button>
        </div>

        <p className="mt-4 text-sm text-ink-3">
          {siteConfig.appName} &middot; Last updated{' '}
          <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>

        {intro ? (
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-2">{intro}</p>
        ) : null}
      </header>

      {notice ? <div className="mb-10">{notice}</div> : null}

      <div className="space-y-10">{children}</div>
    </article>
  );
}

export function LegalSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold text-ink">{heading}</h2>
      {/*
        Type scales with the column. At this width 16px prose runs past 100
        characters a line, which is past the comfortable reading range, so the
        body steps up to 17px with looser leading to bring it back.
      */}
      <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-ink-2 [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-4 [&_li]:leading-[1.7] [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
