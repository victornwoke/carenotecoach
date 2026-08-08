# carenotecoach.com

The public website for CareNote Coach: the marketing page and the legal and
support documents the app links to.

Deployed to Cloudflare Pages at `https://carenotecoach.pages.dev`.

## Why this repo is separate

The app repo (`UKCareNote-Coach`) is a React Native / Expo project. This is a
static web build. Keeping them apart means the website can be redeployed without
touching a shipped mobile binary, and vice versa.

The two are coupled in exactly one place: the route paths.

## The route contract

These paths are shipped **inside the app binary**, in the app repo's
`src/config/legal-links.ts`. Once a build is live, an old installed app keeps
requesting these paths until every user updates.

| Path                   | Why it exists                                                          |
| ---------------------- | ---------------------------------------------------------------------- |
| `/privacy`             | App Store Review Guideline 5.1.1(i) requires it in-app and in metadata |
| `/terms`               | Required alongside privacy for auto-renewable subscriptions            |
| `/support`             | App Store Connect support URL                                          |
| `/account-deletion`    | Account deletion disclosure                                            |
| `/accessibility`       | Accessibility statement                                                |
| `/subscription-terms`  | Plain-English subscription summary                                     |

**Never rename one of these.** If a path must change, add a permanent redirect
from the old path and keep it forever. `src/app/routes.ts` is the single source
of truth and the prerender script reads it directly.

## Not ready to publish yet

Every legal document here is a **draft**. None has been signed off by a
solicitor, and nine required facts (legal entity, registered address, contact
inboxes, governing law, hosting region) are still unconfirmed.

The site handles this deliberately rather than papering over it:

- Unconfirmed facts stay `null` in `src/config/site.ts`. They are **never**
  replaced with a plausible-looking guess. This is the same No Invention rule the
  app itself is built around.
- Each page renders a visible "Draft. Not yet legally reviewed" notice naming
  exactly which facts are outstanding.
- Every legal page carries `noindex`, and `robots.txt` disallows them.
- `pnpm build:strict` **fails** while any required fact is null.

To go live: fill in `src/config/site.ts`, remove the `noIndex` prop from each
page, drop the `Disallow` lines from `public/robots.txt`, and confirm
`pnpm build:strict` passes.

## Commands

```bash
pnpm install
pnpm dev                  # local dev server
pnpm build                # typecheck, build, prerender routes
pnpm build:strict         # same, but fails unless every required fact is set
pnpm check:placeholders   # just the release gate
pnpm typecheck
pnpm preview              # serve the production build locally
```

Use **pnpm**, not npm. npm 11.17 on Node 26 crashes with an arborist dedupe bug
(`Cannot read properties of null (reading 'matches')`) on this dependency tree.

## Why there is no SPA catch-all

The usual Vite-on-Pages setup adds `/* /index.html 200`, which makes **every**
path return HTTP 200, including paths that do not exist. On a site whose job is
serving an App Store privacy policy, that is actively dangerous: if a document
fails to deploy, its URL still answers 200 with the wrong page, so a broken legal
link looks healthy to every automated check and to App Review.

Instead, `scripts/prerender-routes.mjs` writes one real HTML file per known
route plus a `404.html`. Cloudflare Pages then serves a genuine 200 for a real
route and a genuine 404 for anything else, so a green status check means
something.

Verify after any deploy:

```bash
for p in /privacy /terms /support /account-deletion /accessibility /subscription-terms; do
  printf "%-22s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "https://carenotecoach.pages.dev$p")"
done
# and confirm an unknown path 404s rather than returning 200:
curl -s -o /dev/null -w '%{http_code}\n' https://carenotecoach.pages.dev/does-not-exist
```

## Known limitation: client-side rendering

Pages render client-side, so the HTML shell is empty until JavaScript runs. This
matches the Fridlio site and is fine for App Review, which uses a real browser.

It is not ideal for a legal document that should be readable under any
conditions. If that matters later, add static generation (`vite-react-ssg` or
similar) so each route ships pre-rendered HTML. The route-per-file structure
already in place makes that a drop-in change.

## Deploying

**Preferred: connect the Git repo in the Cloudflare Pages dashboard.** Set the
build command to `pnpm build`, output directory to `dist`. Every push then
deploys, and previews come free.

**Manual:**

```bash
pnpm build
npx wrangler@latest pages deploy dist --project-name=carenotecoach
```

Wrangler is deliberately not a dependency: its tree is what triggers the npm bug
above, and the dashboard Git integration is the better path anyway.

## Structure

```
src/
  app/routes.ts        Route contract with the app. Read by the prerender script.
  config/site.ts       Every public fact. null means "not confirmed", never a guess.
  components/
    layout/            Header, Footer, Seo, RootLayout, ScrollToTop, Logo
    legal/             LegalLayout, LegalSection, PendingNotice, Fact
  pages/               One component per route
scripts/
  check-placeholders.mjs   Release gate
  prerender-routes.mjs     One HTML file per route + 404 + security headers
```

## Design

Palette and type are lifted from the app's own design tokens
(`src/constants/theme.ts` in the app repo) so the site and product read as one
thing: deep teal `#1A5F6E` on warm paper `#FAF8F5`, Fraunces for display and
Outfit for text.
