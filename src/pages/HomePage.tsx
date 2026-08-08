import { Link } from 'react-router';
import { BookOpen, ClipboardCheck, PenLine, ShieldCheck, Sparkles } from 'lucide-react';

import { ROUTES } from '@/app/routes';
import { Seo } from '@/components/layout/Seo';
import { siteConfig } from '@/config/site';

/**
 * The four modes, in the order AGENTS.md §1 fixes them: Learn, Practise, Write,
 * Check. The order is the product argument, so it is not rearranged for visual
 * balance.
 */
const MODES = [
  {
    icon: BookOpen,
    name: 'Learn',
    tier: 'Free forever',
    body: 'Documentation foundations: fact versus opinion, observed versus reported, person-centred language, consent and refusal, late entries, corrections, confidentiality.',
  },
  {
    icon: Sparkles,
    name: 'Practise',
    tier: 'Free forever',
    body: 'Apply the principles to fictional scenarios and get specific feedback. Nothing you practise on is a real person.',
  },
  {
    icon: PenLine,
    name: 'Write',
    tier: 'Free, with fair-use limits',
    body: 'Turn facts you already know into a structured draft. The app organises what you supply. It never supplies a fact you did not.',
  },
  {
    icon: ClipboardCheck,
    name: 'Check',
    tier: 'Free, with fair-use limits',
    body: 'Paste a note you have written and see where it is vague, judgemental, unsupported, or missing a time, an outcome or an escalation.',
  },
] as const;

const CARE = [
  { letter: 'C', word: 'Context', body: 'What was happening, when, and where.' },
  { letter: 'A', word: 'Action and observation', body: 'What you did and what you actually saw.' },
  { letter: 'R', word: 'Response and result', body: 'How the person responded and what followed.' },
  { letter: 'E', word: 'Escalation and next steps', body: 'Who you told, and what happens now.' },
] as const;

export function HomePage() {
  return (
    <>
      <Seo
        title="CareNote Coach: Learn to write professional care notes"
        description="CareNote Coach helps UK care workers learn, practise and apply better documentation. Core learning is free forever."
        path={ROUTES.home}
      />

      {/* Hero. Plain masthead, no gradient wash: this is a professional
          publication for care staff, not a consumer app landing page. */}
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:pt-28">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-teal">
          For UK care workers and nursing professionals
        </p>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.03] tracking-tight text-ink sm:text-7xl">
          Learn to write <span className="text-teal">professional</span> care notes.
        </h1>
        <p className="measure mt-7 text-lg leading-relaxed text-ink-2">
          CareNote Coach teaches the principles of clear, factual, person-centred
          documentation, lets you practise on fictional scenarios, then helps you apply
          what you learned to your own notes.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          {siteConfig.appStoreUrl ? (
            <a
              href={siteConfig.appStoreUrl}
              className="inline-flex h-12 items-center rounded-xl bg-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Download on the App Store
            </a>
          ) : (
            /* No store URL is asserted before the app is listed. Announcing a
               download that does not exist would be a false claim. */
            <span className="inline-flex h-12 items-center rounded-xl border border-rule bg-surface px-6 text-sm font-semibold text-ink-3">
              Coming to the App Store
            </span>
          )}
          <Link
            to={ROUTES.support}
            className="text-sm font-semibold text-teal underline underline-offset-4 hover:text-teal-dark"
          >
            Read the support pages
          </Link>
        </div>
      </section>

      {/* The free promise, stated as a commitment rather than a banner offer. */}
      <section className="border-y border-rule bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <ShieldCheck size={26} className="shrink-0 text-teal" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-bold text-ink">Core learning is free forever</h2>
              <p className="measure mt-3 leading-relaxed text-ink-2">
                Not a trial, and not a promotional offer that quietly changes later. The
                full learning curriculum, the knowledge checks, core practice scenarios and
                the safety controls that make Write and Check safe to use are permanently
                free. Pro adds convenience and higher limits on top of that, never by taking
                something away from it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four modes. */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Learn it. Practise it. Apply it.</h2>
        <p className="measure mt-4 leading-relaxed text-ink-2">
          The order matters. You learn the principle, rehearse it somewhere nothing is at
          stake, and only then apply it to your own work.
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
          {MODES.map((mode, index) => (
            <li key={mode.name} className="bg-surface p-7">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-ink-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <mode.icon size={18} className="text-teal" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-ink">{mode.name}</h3>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal">
                {mode.tier}
              </p>
              <p className="mt-3 leading-relaxed text-ink-2">{mode.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CARE framework, labelled honestly as the product's own teaching model. */}
      <section className="border-y border-rule bg-surface-2/50">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">The CARE framework</h2>
          <p className="measure mt-4 leading-relaxed text-ink-2">
            A four-part structure for thinking through what a note actually needs to say.
            CARE is CareNote Coach&rsquo;s own teaching framework. It is not a CQC, NMC, NHS,
            SSSC, Social Care Wales or NISCC framework, and we do not present it as one.
          </p>

          <dl className="mt-12 space-y-px overflow-hidden rounded-2xl border border-rule bg-rule">
            {CARE.map((item) => (
              <div key={item.letter} className="flex gap-5 bg-surface p-6 sm:gap-8 sm:p-7">
                <dt className="w-10 shrink-0">
                  <span className="font-display text-4xl font-black text-teal">
                    {item.letter}
                  </span>
                </dt>
                <dd>
                  <p className="font-display text-lg font-bold text-ink">{item.word}</p>
                  <p className="mt-1 leading-relaxed text-ink-2">{item.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The No Invention promise: the strongest genuine differentiator. */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          It never invents a fact you didn&rsquo;t give it
        </h2>
        <div className="measure mt-5 space-y-4 leading-relaxed text-ink-2">
          <p>
            Every factual sentence in a draft has to trace back to something you actually
            supplied: what you typed, what you dictated and confirmed, or an answer you
            chose. A sentence that cannot be traced is blocked, not shown.
          </p>
          <p>
            That means times, measurements, outcomes, quotes, symptoms, medication,
            escalations and consent are never filled in for you because they would sound
            plausible. If something is missing, the app asks or leaves it visibly blank.
          </p>
          <p className="font-semibold text-ink">
            &ldquo;Offered&rdquo; never silently becomes &ldquo;provided&rdquo;.
            &ldquo;Declined&rdquo; never becomes &ldquo;received&rdquo;.
          </p>
        </div>
      </section>

      {/* Boundary. Stated plainly rather than buried in the terms. */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="text-2xl font-bold text-ink">What CareNote Coach is not</h2>
          <p className="measure mt-4 leading-relaxed text-ink-2">
            It is not a care record, a care-planning system, or a medication administration
            record. It does not diagnose, prescribe, or decide whether something is a
            safeguarding matter or an emergency. It does not replace your employer&rsquo;s
            policies, your supervision, or your professional judgement, and it never claims
            a note is legally compliant.
          </p>
          <p className="mt-5">
            <Link
              to={ROUTES.terms}
              className="text-sm font-semibold text-teal underline underline-offset-4"
            >
              Read the full terms
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
