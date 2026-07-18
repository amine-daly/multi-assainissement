import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Scroll to #lead-form on the current page, or navigate to /contact#lead-form first.
   */
  scrollToLeadForm(event?: Event): void {
    event?.preventDefault();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const existing = this.document.getElementById('lead-form');
    if (existing) {
      this.smoothScrollTo(existing);
      return;
    }

    void this.router
      .navigate(['/contact'], { fragment: 'lead-form' })
      .then(() => {
        // Wait for lazy route + template to mount
        window.setTimeout(() => {
          const target = this.document.getElementById('lead-form');
          if (target) {
            this.smoothScrollTo(target);
          }
        }, 80);
      });
  }

  private smoothScrollTo(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
