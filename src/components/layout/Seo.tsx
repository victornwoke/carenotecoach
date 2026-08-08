import { useEffect } from 'react';

import { siteConfig } from '@/config/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** Legal drafts must not be indexed until they are signed off and published. */
  noIndex?: boolean;
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Per-page document head. Deliberately hand-rolled rather than pulling in a
 * helmet library: this site has nine static pages and no need for the weight.
 */
export function Seo({ title, description, path, noIndex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle =
      path === '/' ? title : `${title} | ${siteConfig.appName}`;
    document.title = fullTitle;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${siteConfig.siteUrl}${path}`);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');

    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow',
    );

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${siteConfig.siteUrl}${path}`;
  }, [title, description, path, noIndex]);

  return null;
}
