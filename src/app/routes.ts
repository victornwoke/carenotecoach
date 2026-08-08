/**
 * The route table. These paths are a contract with the app: they are the exact
 * values in the app repo's `src/config/legal-links.ts`, which ships them inside
 * the binary. Once a build is live, an old app keeps requesting these paths
 * until every user updates, so renaming one silently breaks installed apps.
 *
 * If a path must change, add a redirect from the old one in `public/_redirects`
 * and keep it there permanently.
 */
export const ROUTES = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  support: '/support',
  accountDeletion: '/account-deletion',
  accessibility: '/accessibility',
  subscriptionTerms: '/subscription-terms',
  contact: '/contact',
} as const;

export type RouteKey = keyof typeof ROUTES;

/** The six the app links to directly. Used by the route-coverage test. */
export const APP_LINKED_ROUTES = [
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.support,
  ROUTES.accountDeletion,
  ROUTES.accessibility,
  ROUTES.subscriptionTerms,
] as const;
