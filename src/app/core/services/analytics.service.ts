import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  private isInitialized = false;
  private readonly trackingId = environment.googleAnalyticsId?.trim();

  /**
   * Initializes Google Analytics 4 (gtag.js) in the browser.
   * Safe for SSR and prerendering.
   */
  init(): void {
    if (this.isInitialized || !isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.trackingId || this.trackingId === 'G-XXXXXXXXXX') {
      if (!environment.production) {
        console.info(
          '[AnalyticsService] Google Analytics 4 disabled: configure a valid googleAnalyticsId (G-XXXXXXXXXX) in environment.ts or environment.prod.ts.',
        );
      }
      return;
    }

    // If script isn't in index.html already, dynamically load and init
    if (!window.gtag) {
      this.loadGtagScript(this.trackingId);
      this.initGtag(this.trackingId);
    }

    this.listenToRouteChanges();
    this.listenToLanguageChanges();
    this.listenToOutboundInteractions();
    this.isInitialized = true;
  }

  /**
   * Loads the official Google Tag Manager gtag.js script tag asynchronously.
   */
  private loadGtagScript(trackingId: string): void {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(trackingId)}`;
    this.document.head.appendChild(script);
  }

  /**
   * Configures dataLayer and the gtag function with the required JS Arguments object.
   */
  private initGtag(trackingId: string): void {
    const win = window;
    win.dataLayer = win.dataLayer || [];
    win.gtag = function gtag(): void {
      // Google Analytics strictly expects the array-like `arguments` object
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer?.push(arguments);
    };

    win.gtag('js', new Date());
    win.gtag('config', trackingId);
  }

  /**
   * Subscribes to Angular Router events to track page views on client-side navigation.
   */
  private listenToRouteChanges(): void {
    let isInitialNavigation = true;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        // Skip the very first navigation event because gtag('config') in index.html already recorded it
        if (isInitialNavigation) {
          isInitialNavigation = false;
          return;
        }
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  /**
   * Listens to language switches and logs them to GA4.
   */
  private listenToLanguageChanges(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.trackEvent('change_language', {
        language: event.lang,
      });
    });
  }

  /**
   * Tracks an explicit page view in GA4.
   */
  trackPageView(url: string, title?: string): void {
    if (!isPlatformBrowser(this.platformId) || !window.gtag || !this.trackingId) {
      return;
    }

    window.gtag('event', 'page_view', {
      page_title: title || this.document.title,
      page_location: window.location.href,
      page_path: url,
    });
  }

  /**
   * Custom event tracking method.
   */
  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.gtag) {
      window.gtag('event', eventName, params);
    } else if (!environment.production) {
      console.debug(`[AnalyticsService Event: ${eventName}]`, params);
    }
  }

  /**
   * Tracks lead generation (form submits, quote requests).
   */
  trackLead(formName: string, additionalParams?: Record<string, unknown>): void {
    this.trackEvent('generate_lead', {
      form_name: formName,
      ...additionalParams,
    });
  }

  /**
   * Tracks contact interactions (phone call, whatsapp, email).
   */
  trackContact(
    method: 'phone' | 'whatsapp' | 'email',
    details?: { destination?: string; label?: string },
  ): void {
    this.trackEvent('contact', {
      method,
      destination: details?.destination,
      label: details?.label,
    });
  }

  /**
   * Global event delegation listener to capture phone calls, WhatsApp chats, and email clicks
   * across all buttons and links in the app.
   */
  private listenToOutboundInteractions(): void {
    this.document.addEventListener('click', (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a');
      if (!target || !target.href) {
        return;
      }

      const href = target.href;
      if (href.startsWith('tel:')) {
        this.trackContact('phone', {
          destination: href.replace('tel:', ''),
          label: target.innerText?.trim() || 'Call Button',
        });
      } else if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
        this.trackContact('whatsapp', {
          destination: href,
          label: target.innerText?.trim() || 'WhatsApp Button',
        });
      } else if (href.startsWith('mailto:')) {
        this.trackContact('email', {
          destination: href.replace('mailto:', ''),
          label: target.innerText?.trim() || 'Email Button',
        });
      }
    });
  }
}
