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

  /**
   * The name the business trades under and is legally identified by. For a sole
   * trader this is the individual's own name, optionally with a trading name,
   * e.g. "A Person trading as CareNote Coach". Null until confirmed.
   */
  legalEntityName: string | null;
  /** Confirmed 2026-08-08: operating as a sole trader, not an incorporated company. */
  legalEntityType: string;
  /** Companies House number. Always null for a sole trader; there isn't one. */
  companyNumber: string | null;
  /**
   * A geographic postal address for the business. A sole trader has no registered
   * office, but UK GDPR still requires a contactable controller address and
   * consumer law requires a trader's geographic address. Null until confirmed.
   */
  businessAddress: string | null;

  /**
   * The single inbox handling support, privacy and data rights, accessibility,
   * and assisted account deletion. One address was chosen deliberately on
   * 2026-08-08: four aliases nobody monitors is worse than one that is answered.
   * Split this back out only when there is a real reason to route separately.
   */
  contactEmail: string | null;

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

  // Blocker C4. The trading name and address are still outstanding.
  legalEntityName: null,
  legalEntityType: 'Sole trader',
  companyNumber: null, // Correct value for a sole trader. Not an outstanding blank.
  businessAddress: null,

  // Blocker C3. Needs a domain and a real, tested mailbox. Note that a
  // *.pages.dev subdomain cannot provide email, so this needs a bought domain.
  contactEmail: null,

  // Deliberately deferred on 2026-08-08: no solicitor engaged yet. CareNote Coach
  // serves England, Scotland, Wales and Northern Ireland as equal jurisdictions, so
  // defaulting to England and Wales without legal input would be a real error, not
  // a harmless placeholder. The site stays in honest-draft mode until this closes.
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
  'businessAddress',
  'contactEmail',
  'governingLaw',
  'hostingRegion',
] as const satisfies readonly (keyof SiteConfig)[];

export type RequiredBeforePublish = (typeof REQUIRED_BEFORE_PUBLISH)[number];

/** Human-readable label per outstanding field, for the on-page notice. */
export const FIELD_LABELS: Record<RequiredBeforePublish, string> = {
  legalEntityName: 'the name the business trades under',
  businessAddress: 'a business postal address',
  contactEmail: 'a working contact inbox',
  governingLaw: 'governing law and jurisdiction',
  hostingRegion: 'confirmed data hosting region',
};

/** Which outstanding fields each page depends on, so notices are page-specific. */
export const PAGE_DEPENDENCIES = {
  privacy: ['legalEntityName', 'businessAddress', 'contactEmail', 'hostingRegion'],
  terms: ['legalEntityName', 'businessAddress', 'governingLaw'],
  support: ['contactEmail'],
  accountDeletion: ['contactEmail'],
  accessibility: ['contactEmail'],
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
