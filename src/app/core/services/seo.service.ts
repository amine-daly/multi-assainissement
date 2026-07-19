import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_CONFIG } from '../config/site.config';
import { PAGE_SEO, SITE_URL, PageSeo } from '../seo/seo.config';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private initialized = false;

  /** Call once from the app shell to keep tags in sync with navigation / SSG. */
  init(): void {
    this.applyForUrl(this.router.url);

    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.applyForUrl(e.urlAfterRedirects));
  }

  applyForUrl(url: string): void {
    const path = this.normalizePath(url);
    const seo = PAGE_SEO[path] ?? PAGE_SEO['/404'];
    this.apply(seo);
  }

  private apply(seo: PageSeo): void {
    this.title.setTitle(seo.title);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({
      name: 'robots',
      content: seo.robots ?? 'index, follow, max-image-preview:large',
    });
    this.meta.updateTag({ name: 'author', content: SITE_CONFIG.name });
    this.meta.updateTag({
      name: 'geo.region',
      content: 'TN-23',
    });
    this.meta.updateTag({ name: 'geo.placename', content: 'Djerba' });

    const canonicalPath = seo.path === '/404' ? '/404' : seo.path;
    const canonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
    this.setCanonical(canonical);

    // Open Graph — marketing pages are websites, not blog articles
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'fr_TN' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.name });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });

    const ogImage = seo.ogImage
      ? `${SITE_URL}${seo.ogImage}`
      : `${SITE_URL}/assets/images/hero-djerba.png`;
    this.meta.updateTag({ property: 'og:image', content: ogImage });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
  }

  private normalizePath(url: string): string {
    const path = url.split('?')[0].split('#')[0];
    if (!path || path === '/') {
      return '/';
    }
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }
}
