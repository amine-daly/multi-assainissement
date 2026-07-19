import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Upserts a JSON-LD script in document head.
   * Safe for SSG prerender and client hydrate (same id, no duplicate nodes).
   */
  set(id: string, data: Record<string, unknown>): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  /**
   * Removes a JSON-LD node on the client only.
   * Skipping removal during SSG keeps the script in the prerendered HTML.
   */
  remove(id: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.document.getElementById(id)?.remove();
  }
}
