import { Seo } from '@/components/layout/Seo';
import { ROUTES } from '@/app/routes';
import { LegalLayout, LegalSection } from '@/components/legal/LegalLayout';
import { Fact, PendingNotice } from '@/components/legal/PendingNotice';
import { siteConfig } from '@/config/site';

const DONE = [
  [
    'Colour contrast',
    'Two design colours used across the app, secondary text and the PRO accent, were re-checked using computed contrast ratios and darkened where they fell short of 4.5:1.',
  ],
  [
    'Screen-reader labels and roles',
    'The header bar, lesson and scenario cards, quiz options, expandable sections and main action buttons expose proper accessible names, roles and state, not just a visual style change.',
  ],
  [
    'Form labels',
    'Every text-entry field, including the Check-mode note field, has an explicit accessible label, not a placeholder that disappears once you type.',
  ],
  [
    'Error and status announcements',
    'Identifier warnings, sync errors and purchase failures are announced via live-region semantics rather than shown as silent text.',
  ],
  [
    'Non-colour status',
    'Every visual status pairs colour with an icon, label or text change, so colour is never the only signal.',
  ],
  ['Headings', 'Screen titles are exposed as headings, so you can navigate by jumping between them.'],
  [
    'Confirmation dialogs',
    'Delete draft, delete account and similar use the operating system’s own native dialogs, which carry correct accessibility behaviour.',
  ],
  [
    'Reduced motion',
    'The app has no custom animation, so there is nothing that could ignore your device’s reduced-motion setting.',
  ],
  [
    'Touch targets',
    'Controls are generally built to clear the 44pt iOS and 48dp Android convention. Two smaller controls sit slightly below that convention but still clear WCAG 2.2’s actual minimum.',
  ],
] as const;

const OUTSTANDING = [
  'A live VoiceOver walkthrough on an iOS device.',
  'A live TalkBack walkthrough on an Android device.',
  'Visual testing at the largest Dynamic Type and font-scale settings.',
  'External-keyboard navigation testing on a real tablet.',
  'An automated accessibility check wired into the build pipeline.',
] as const;

export function AccessibilityPage() {
  return (
    <>
      <Seo
        title="Accessibility"
        description="What has been checked in CareNote Coach against WCAG 2.2 AA, and what has not been verified yet."
        path={ROUTES.accessibility}
        noIndex
      />

      <LegalLayout
        eyebrow="Accessibility"
        title="Accessibility statement"
        lastUpdated={siteConfig.lastUpdated.accessibility}
        notice={<PendingNotice page="accessibility" />}
      >
        <LegalSection heading="Our target">
          <p>
            We are building CareNote Coach to meet WCAG 2.2 AA. That is our target, and this
            statement describes what has actually been checked so far, not a claim that the
            target has been reached. We do not mark an accessibility item as passed without
            evidence, so this page will keep changing as real verification happens.
          </p>
          <p>
            <strong>We do not currently claim certified WCAG 2.2 AA conformance.</strong>{' '}
            Independent, device-based verification has not happened yet.
          </p>
        </LegalSection>

        <LegalSection heading="What's been done">
          <p>
            A full static code audit was carried out against every screen and shared
            component. Fixes already made and shipped as a result:
          </p>
          <dl className="space-y-4">
            {DONE.map(([title, body]) => (
              <div key={title}>
                <dt className="font-semibold text-ink">{title}</dt>
                <dd className="mt-1">{body}</dd>
              </div>
            ))}
          </dl>
        </LegalSection>

        <LegalSection heading="What hasn't been verified yet">
          <p>This was a static code review, not a device test. These remain outstanding:</p>
          <ul>
            {OUTSTANDING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Until these run, treat everything above as fixed in code, awaiting device
            verification.
          </p>
        </LegalSection>

        <LegalSection heading="Known, accepted gaps">
          <ul>
            <li>
              A &ldquo;Download learning report&rdquo; button exists but the underlying export
              feature is not built, so it is disabled with a &ldquo;coming soon&rdquo; label
              rather than doing nothing silently.
            </li>
          </ul>
        </LegalSection>

        <LegalSection heading="Reporting an accessibility problem">
          <p>
            If something in CareNote Coach is hard or impossible to use with assistive
            technology:{' '}
            <Fact field="accessibilityEmail">
              {(email) => (
                <a href={`mailto:${email}`} className="font-medium">
                  {email}
                </a>
              )}
            </Fact>
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
