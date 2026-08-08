#!/usr/bin/env node
/**
 * Emits one real HTML file per known route, plus a 404.html.
 *
 * Why not the usual SPA catch-all (`/* /index.html 200`)? Because it makes every
 * path return HTTP 200, including paths that do not exist. On a site whose whole
 * job is serving an App Store privacy policy, that is dangerous: if a document
 * fails to deploy, its URL still answers 200 with the wrong page, so a broken
 * legal link looks healthy to every automated check and to App Review.
 *
 * Writing a file per route instead means Cloudflare Pages serves a real 200 for
 * a real route and falls through to 404.html for anything else. A green status
 * check then actually means the document is there.
 */
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '..', 'dist');
const routesFile = join(here, '..', 'src', 'app', 'routes.ts');

// Read the route table from source so this cannot drift from the app's contract.
const source = readFileSync(routesFile, 'utf8');
const block = source.match(/export const ROUTES = \{([\s\S]*?)\} as const;/);
if (!block) {
  console.error('prerender: could not parse ROUTES from src/app/routes.ts');
  process.exit(2);
}

const paths = [...block[1].matchAll(/:\s*'([^']+)'/g)]
  .map((m) => m[1])
  .filter((p) => p !== '/');

const indexHtml = join(dist, 'index.html');
readFileSync(indexHtml); // fail loudly if the build did not run

for (const path of paths) {
  const target = join(dist, `${path.replace(/^\//, '')}.html`);
  copyFileSync(indexHtml, target);
}

// Cloudflare Pages serves 404.html for unmatched paths, with a 404 status.
copyFileSync(indexHtml, join(dist, '404.html'));

writeFileSync(
  join(dist, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
  Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
`,
);

console.log(
  `prerender: wrote ${paths.length} route files + 404.html + _headers`,
);
