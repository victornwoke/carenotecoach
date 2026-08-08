/**
 * Centralised, typed source of truth for every public-facing fact about
 * CareNote Coach.
 *
 * Nothing in this file may be invented. A fact that has not been confirmed
 * stays `null` rather than becoming a plausible-sounding guess, and the pages
 * that need it render a visible "not confirmed yet" notice instead of filling
 * the gap. This mirrors the No Invention rule the app itself is built around
 * (AGENTS.md §7) and the publication gate in the app repo's
 * docs/LEGAL_REVIEW_REGISTER.md.
 *
 * When a fact is confirmed, set it here once. Every page that mentions it
 * updates, and `npm run check:placeholders` stops failing for that field.
 */

export interface SiteConfig {
  /** Product name exactly as it appears on the store listing. */
  appName: string;
  /** The positioning line. Education first, never "AI note generator". */
  appTagline: string;
  /** Canonical production origin, no trailing slash. */
  siteUrl: string;
  /** iOS bundle identifier, quoted in support/troubleshooting copy. */
  bundleId: string;

  /** Registered legal entity name, e.g. "CareNote Coach Ltd". Null until incorporation is confirmed. */
  legalEntityName: string | null;
  /** e.g. "Private limited company", "Sole trader". Null until confirmed. */
  legalEntityType: string | null;
  /** Companies House number, or null if not incorporated / not yet confirmed. */
  companyNumber: string | null;
  /** Registered postal address. Null until confirmed. Never a placeholder street. */
  registeredAddress: string | null;

  /** General support inbox. Null until the mailbox exists and has been tested. */
  supportEmail: string | null;
  /** Privacy / data-rights inbox. Null until the mailbox exists and has been tested. */
  privacyEmail: string | null;
  /** Accessibility feedback inbox. Null until confirmed. */
  accessibilityEmail: string | null;
  /** Route for users who want deletion but cannot sign in. Null until confirmed. */
  assistedDeletionEmail: string | null;

  /** Governing law and courts. Null: a real decision given four-nation scope, not a default. */
  governingLaw: string | null;
  /** Hosting region for the backend, once confirmed and documented per SEC-008. */
  hostingRegion: string | null;
  /** Support response-time commitment. Null unless operationally committed to. */
  supportResponseTime: string | null;

  /** Live App Store listing. Null until the app is approved and listed. */
  appStoreUrl: string | null;
  /** Play Store listing. Null: no committed Android release. */
  playStoreUrl: string | null;

  /** ISO dates the documents were last substantively revised. */
  lastUpdated: {
    privacy: string;
    terms: string;
    support: string;
    accountDeletion: string;
    accessibility: string;
    subscriptionTerms: string;
  };
}

export const siteConfig: SiteConfig = {
  appName: 'CareNote Coach',
  appTagline: 'Learn to write professional care notes.',
  siteUrl: 'https://carenotecoach.pages.dev',
  bundleId: 'com.carenotecoach.app',

  // Blocker C4 in the app repo's docs/LAUNCH_RUNBOOK.md. Needs incorporation or a
  // confirmed sole-trader identity, then a solicitor's review.
  legalEntityName: null,
  legalEntityType: null,
  companyNumber: null,
  registeredAddress: null,

  // Blocker C3. Needs a real, tested inbox before any of these can publish.
  supportEmail: null,
  privacyEmail: null,
  accessibilityEmail: null,
  assistedDeletionEmail: null,

  // Deliberately null. CareNote Coach serves England, Scotland, Wales and Northern
  // Ireland as equal jurisdictions, so defaulting to England and Wales without legal
  // input would be a real error, not a harmless placeholder.
  governingLaw: null,
  // SEC-008 requires UK or ICO-adequate hosting with documented residency.
  hostingRegion: null,
  supportResponseTime: null,

  appStoreUrl: null,
  playStoreUrl: null,

  lastUpdated: {
    privacy: '2026-08-04',
    terms: '2026-08-04',
    support: '2026-08-04',
    accountDeletion: '2026-08-04',
    accessibility: '2026-08-04',
    subscriptionTerms: '2026-08-04',
  },
};

/** Fields that must be non-null before the site is fit to publish. */
export const REQUIRED_BEFORE_PUBLISH = [
  'legalEntityName',
  'legalEntityType',
  'registeredAddress',
  'supportEmail',
  'privacyEmail',
  'accessibilityEmail',
  'assistedDeletionEmail',
  'governingLaw',
  'hostingRegion',
] as const satisfies readonly (keyof SiteConfig)[];

export type RequiredBeforePublish = (typeof REQUIRED_BEFORE_PUBLISH)[number];

/** Human-readable label per outstanding field, for the on-page notice. */
export const FIELD_LABELS: Record<RequiredBeforePublish, string> = {
  legalEntityName: 'registered legal entity name',
  legalEntityType: 'legal entity type',
  registeredAddress: 'registered postal address',
  supportEmail: 'support email inbox',
  privacyEmail: 'privacy and data-rights inbox',
  accessibilityEmail: 'accessibility feedback inbox',
  assistedDeletionEmail: 'assisted account-deletion route',
  governingLaw: 'governing law and jurisdiction',
  hostingRegion: 'confirmed data hosting region',
};

/** Which outstanding fields each page depends on, so notices are page-specific. */
export const PAGE_DEPENDENCIES = {
  privacy: [
    'legalEntityName',
    'legalEntityType',
    'registeredAddress',
    'privacyEmail',
    'hostingRegion',
  ],
  terms: ['legalEntityName', 'legalEntityType', 'registeredAddress', 'governingLaw'],
  support: ['supportEmail'],
  accountDeletion: ['assistedDeletionEmail'],
  accessibility: ['accessibilityEmail'],
  subscriptionTerms: [],
} as const satisfies Record<string, readonly RequiredBeforePublish[]>;

export function missingFields(
  fields: readonly RequiredBeforePublish[],
): RequiredBeforePublish[] {
  return fields.filter((field) => siteConfig[field] === null);
}

/** True when every publish-blocking fact is confirmed. */
export function isReadyToPublish(): boolean {
  return missingFields(REQUIRED_BEFORE_PUBLISH).length === 0;
}
