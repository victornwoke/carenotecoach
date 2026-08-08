#!/usr/bin/env node
/**
 * Release gate. Fails the build while any publish-blocking fact in
 * src/config/site.ts is still null.
 *
 * The point is that a draft can never be deployed as if it were final by
 * accident. `npm run build` still works, so the site can be previewed and
 * reviewed with its "not yet legally reviewed" notices visible. Only
 * `npm run build:strict` asserts the site is fit to publish, and that is what
 * the launch checklist should run.
 *
 * This mirrors the app repo's docs/LEGAL_REVIEW_REGISTER.md rule: nothing in
 * docs/legal/ may be shown to a real user or submitted to an app store until
 * sign-off is complete and every placeholder is resolved.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const configPath = join(here, '..', 'src', 'config', 'site.ts');
const source = readFileSync(configPath, 'utf8');

// Read the required-field list straight from the config so the two cannot drift.
const requiredBlock = source.match(
  /export const REQUIRED_BEFORE_PUBLISH = \[([\s\S]*?)\] as const/,
);
if (!requiredBlock) {
  console.error('check-placeholders: could not find REQUIRED_BEFORE_PUBLISH in site.ts');
  process.exit(2);
}

const required = [...requiredBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
if (required.length === 0) {
  console.error('check-placeholders: REQUIRED_BEFORE_PUBLISH is empty');
  process.exit(2);
}

const unresolved = required.filter((field) => {
  // Matches `field: null,` allowing for whitespace. A real value never matches.
  const pattern = new RegExp(`\\b${field}\\s*:\\s*null\\s*,`);
  return pattern.test(source);
});

if (unresolved.length > 0) {
  console.error('');
  console.error('  This site is NOT ready to publish.');
  console.error('');
  console.error(`  ${unresolved.length} required fact(s) are still null in src/config/site.ts:`);
  for (const field of unresolved) console.error(`    - ${field}`);
  console.error('');
  console.error('  Resolve them, or use `npm run build` for a preview build that keeps the');
  console.error('  "not yet legally reviewed" notices visible on each page.');
  console.error('');
  process.exit(1);
}

console.log(`check-placeholders: all ${required.length} required facts are set.`);
